import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Fetch media asset directly from Supabase / Server Database without IndexedDB or browser cache.
 */
export async function getMediaItem(key: string): Promise<string | null> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('cms_media')
        .select('url')
        .or(`id.eq.${key},name.eq.${key}`)
        .single();
      
      if (!error && data?.url) {
        return data.url;
      }
    }

    // Direct REST API database fetch
    const response = await fetch(`/api/media/${key}`);
    if (response.ok) {
      const resData = await response.json();
      if (resData && resData.success && resData.value) {
        return resData.value;
      }
    }

    return null;
  } catch (e) {
    console.error('[Database Media] getMediaItem Error:', e);
    return null;
  }
}

/**
 * Save media asset directly to Supabase / Server Database without IndexedDB.
 */
export async function setMediaItem(key: string, value: string): Promise<void> {
  try {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('cms_media').upsert({
        id: key,
        url: value,
        name: key,
        type: value.startsWith('data:image') ? 'image/png' : 'image/jpeg',
        size: `${Math.round(value.length / 1024)} KB`,
      }, { onConflict: 'id' });
    }

    // Direct REST API database persist
    await fetch('/api/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, value }),
    });
  } catch (e) {
    console.error('[Database Media] setMediaItem Error:', e);
  }
}

/**
 * Remove media asset from Supabase / Server Database.
 */
export async function removeMediaItem(key: string): Promise<void> {
  try {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('cms_media').delete().eq('id', key);
    }

    await fetch(`/api/cms/media/${key}`, { method: 'DELETE' });
  } catch (e) {
    console.error('[Database Media] removeMediaItem Error:', e);
  }
}
