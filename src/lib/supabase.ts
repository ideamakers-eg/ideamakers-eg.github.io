import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read Supabase credentials from client-side environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-supabase-project'));

// Initialize Supabase Client if credentials are provided
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

/**
 * Fetch all dynamic CMS content key-values directly from Supabase PostgreSQL (or REST server fallback).
 */
export async function fetchCmsContentFromSupabase(): Promise<Record<string, string> | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('cms_content').select('key, value');
      if (!error && data) {
        const result: Record<string, string> = {};
        data.forEach((row: { key: string; value: string }) => {
          result[row.key] = row.value;
        });
        return result;
      }
    } catch (e) {
      console.warn('[Supabase] Failed to fetch CMS content, falling back:', e);
    }
  }

  // Fallback to Express backend /api/cms/content
  try {
    const res = await fetch('/api/cms/content');
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[Backend] API fetch failed:', err);
  }
  return null;
}

/**
 * Save batch of CMS configuration keys to Supabase PostgreSQL and broadcast Realtime event across all clients.
 */
export async function saveCmsContentBatchToSupabase(payload: Record<string, any>): Promise<boolean> {
  let success = false;

  if (supabase) {
    try {
      const rows = Object.entries(payload).map(([key, val]) => ({
        key,
        value: typeof val === 'object' ? JSON.stringify(val) : String(val),
        updated_at: new Date().toISOString(),
      }));

      // 1. Update Supabase PostgreSQL Database Table
      const { error } = await supabase.from('cms_content').upsert(rows, { onConflict: 'key' });
      if (!error) {
        success = true;
      } else {
        console.error('[Supabase] Upsert error:', error);
      }

      // 2. Broadcast Realtime Message across all connected Supabase WebSocket clients
      try {
        const realtimeChannel = supabase.channel('hybrid-cms-realtime');
        await realtimeChannel.send({
          type: 'broadcast',
          event: 'cms_content_batch_update',
          payload,
        });
      } catch (bcErr) {
        console.warn('[Supabase Realtime Broadcast warning]:', bcErr);
      }
    } catch (e) {
      console.error('[Supabase] Batch save error:', e);
    }
  }

  // 3. Local BroadcastChannel for instant multi-window / multi-tab cross-device sync
  if (typeof window !== 'undefined') {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hybrid-cms-broadcast');
        bc.postMessage({ type: 'cms_content_batch_update', payload });
        bc.close();
      }
    } catch (e) {}

    // Dispatch local DOM window event
    window.dispatchEvent(new CustomEvent('cms-content-changed', { detail: payload }));
  }

  // 4. Dual-write backup sync with Express backend REST API
  try {
    const res = await fetch('/api/cms/content/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      success = true;
    }
  } catch (err) {
    console.warn('[Backend] Batch sync error:', err);
  }

  return success;
}

/**
 * Subscribe to Supabase Realtime changes (Postgres CDC + Realtime Broadcast) for instant live updates across all devices & browsers.
 * No polling, no page reloads, no rebuilds required.
 */
export function subscribeToSupabaseRealtime(onContentUpdate: (key: string, value: string) => void): () => void {
  const unsubscribers: (() => void)[] = [];

  const handleUpdateKeyVal = (key: string, value: string) => {
    if (!key) return;
    onContentUpdate(key, value);
  };

  const handleBatchPayload = (batchPayload: Record<string, any>) => {
    if (!batchPayload || typeof batchPayload !== 'object') return;
    Object.entries(batchPayload).forEach(([k, v]) => {
      const valStr = typeof v === 'object' ? JSON.stringify(v) : String(v);
      handleUpdateKeyVal(k, valStr);
    });
  };

  // 1. Supabase WebSocket & Postgres CDC Subscriptions
  if (supabase) {
    const channelName = `hybrid-cms-realtime-${Math.random().toString(36).substring(2, 9)}`;
    const channel = supabase
      .channel(channelName)
      // Postgres Change Data Capture (CDC) on 'cms_content' table
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cms_content' },
        (payload) => {
          if (payload.new && (payload.new as any).key) {
            const newRow = payload.new as { key: string; value: string };
            handleUpdateKeyVal(newRow.key, newRow.value);
          }
        }
      )
      // Direct Realtime Broadcast handler
      .on(
        'broadcast',
        { event: 'cms_content_batch_update' },
        (response) => {
          if (response.payload) {
            handleBatchPayload(response.payload);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[Supabase Realtime] Subscribed successfully to live updates channel.');
        }
      });

    unsubscribers.push(() => {
      supabase.removeChannel(channel);
    });
  }

  // 2. BroadcastChannel API for multi-tab/iframe/window instant sync
  if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
    try {
      const bc = new BroadcastChannel('hybrid-cms-broadcast');
      const handleBcMessage = (evt: MessageEvent) => {
        if (evt.data && evt.data.type === 'cms_content_batch_update' && evt.data.payload) {
          handleBatchPayload(evt.data.payload);
        }
      };
      bc.addEventListener('message', handleBcMessage);
      unsubscribers.push(() => {
        bc.removeEventListener('message', handleBcMessage);
        bc.close();
      });
    } catch (e) {}
  }

  // 3. Local CustomEvent listener
  if (typeof window !== 'undefined') {
    const handleCustomEvent = (evt: Event) => {
      const customEvt = evt as CustomEvent;
      if (customEvt.detail) {
        if (typeof customEvt.detail === 'object') {
          handleBatchPayload(customEvt.detail);
        }
      }
    };
    window.addEventListener('cms-content-changed', handleCustomEvent);
    unsubscribers.push(() => {
      window.removeEventListener('cms-content-changed', handleCustomEvent);
    });
  }

  return () => {
    unsubscribers.forEach(fn => fn());
  };
}

/**
 * Subscribe to Supabase Realtime changes for 'cms_media' table.
 */
export function subscribeToMediaRealtime(onMediaChange: () => void): () => void {
  if (!supabase) return () => {};

  const channelName = `media-realtime-${Math.random().toString(36).substring(2, 9)}`;
  const channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'cms_media' },
      () => {
        onMediaChange();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Interface for Supabase Storage Media Items
 */
export interface SupabaseMediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  folder?: string;
  resolution?: string;
  optimized?: boolean;
  compressionRatio?: string;
  created_at?: string;
  path?: string;
}

/**
 * Fetch all Media items from Supabase PostgreSQL table 'cms_media' or REST fallback.
 */
export async function fetchSupabaseMediaItems(): Promise<SupabaseMediaItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('cms_media')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((row) => ({
          id: row.id || `med-${Date.now()}`,
          name: row.name || 'مفرد ميديا',
          url: row.url || '',
          type: row.type || 'image/jpeg',
          size: row.size || '100 KB',
          folder: row.folder || 'عام',
          resolution: row.resolution || '1080p',
          optimized: row.optimized ?? true,
          compressionRatio: row.compression_ratio || '75%',
          created_at: row.created_at || new Date().toISOString(),
          path: row.path || '',
        }));
      }
    } catch (e) {
      console.warn('[Supabase Storage] Failed to fetch media items from DB:', e);
    }
  }

  // REST Fallback
  try {
    const res = await fetch('/api/cms/media');
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[Backend] API fetch media failed:', err);
  }

  return [];
}

/**
 * Upload Media Asset to Supabase Storage Bucket ('cms-media') with Folder, Optimization & Resolution tags.
 */
export async function uploadMediaToSupabaseStorage(
  file: File | Blob,
  fileName: string,
  options?: {
    folder?: string;
    resolution?: string;
    optimized?: boolean;
    compressionRatio?: string;
  }
): Promise<SupabaseMediaItem | null> {
  const folder = options?.folder || 'general';
  const cleanFileName = `${folder}/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  if (supabase) {
    try {
      const { data, error } = await supabase.storage.from('cms-media').upload(cleanFileName, file, {
        cacheControl: '31536000', // 1 year CDN cache
        upsert: true,
      });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from('cms-media').getPublicUrl(data.path);
        const publicUrl = publicUrlData.publicUrl;
        const mediaId = `med-${Date.now()}`;
        const mediaKey = `media_file_${mediaId}`;

        const mediaRecord: SupabaseMediaItem = {
          id: mediaKey,
          name: fileName,
          url: publicUrl,
          type: file.type || (fileName.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg'),
          size: `${Math.round(file.size / 1024)} KB`,
          folder,
          resolution: options?.resolution || 'HD',
          optimized: options?.optimized ?? true,
          compressionRatio: options?.compressionRatio || 'WebP 75%',
          created_at: new Date().toISOString(),
          path: data.path,
        };

        // Save reference in cms_media table
        await supabase.from('cms_media').upsert({
          id: mediaRecord.id,
          name: mediaRecord.name,
          url: mediaRecord.url,
          type: mediaRecord.type,
          size: mediaRecord.size,
          folder: mediaRecord.folder,
          resolution: mediaRecord.resolution,
          optimized: mediaRecord.optimized,
          compression_ratio: mediaRecord.compressionRatio,
          path: mediaRecord.path,
          updated_at: new Date().toISOString(),
        });

        return mediaRecord;
      } else if (error) {
        console.error('[Supabase Storage Upload Error]:', error);
      }
    } catch (e) {
      console.warn('[Supabase Storage] Upload error:', e);
    }
  }

  // Fallback REST endpoint
  try {
    const formData = new FormData();
    formData.append('file', file, fileName);
    formData.append('folder', folder);

    const res = await fetch('/api/cms/media/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[Backend] API upload failed:', err);
  }

  return null;
}

/**
 * Delete Media Asset permanently from Supabase Storage and database table.
 */
export async function deleteMediaFromSupabaseStorage(mediaItem: SupabaseMediaItem): Promise<boolean> {
  let deleted = false;

  if (supabase) {
    try {
      // Delete from storage if path exists
      if (mediaItem.path) {
        await supabase.storage.from('cms-media').remove([mediaItem.path]);
      }
      
      // Delete record from database
      const { error } = await supabase.from('cms_media').delete().eq('id', mediaItem.id);
      if (!error) {
        deleted = true;
      }
    } catch (e) {
      console.error('[Supabase Storage Delete Error]:', e);
    }
  }

  // REST API dual-delete
  try {
    const res = await fetch(`/api/cms/media/${mediaItem.id}`, { method: 'DELETE' });
    if (res.ok) {
      deleted = true;
    }
  } catch (err) {
    console.warn('[Backend Delete Error]:', err);
  }

  return deleted;
}

/**
 * Replace Media Asset in Supabase Storage.
 */
export async function replaceMediaInSupabaseStorage(
  existingItem: SupabaseMediaItem,
  newFile: File | Blob,
  newFileName: string,
  options?: { folder?: string; resolution?: string; optimized?: boolean; compressionRatio?: string }
): Promise<SupabaseMediaItem | null> {
  // Delete old asset first
  await deleteMediaFromSupabaseStorage(existingItem);
  
  // Upload new asset
  return await uploadMediaToSupabaseStorage(newFile, newFileName, options);
}

