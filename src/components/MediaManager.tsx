import React, { useState, useEffect } from 'react';
import { 
  Upload, Search, Folder, Trash2, RefreshCw, Copy, Check, Eye, Film, Image as ImageIcon, 
  FolderPlus, Filter, Sparkles, Layers, FileCode, CheckCircle2, Video, Globe, Zap, ExternalLink, Sliders
} from 'lucide-react';
import { 
  fetchSupabaseMediaItems, 
  uploadMediaToSupabaseStorage, 
  deleteMediaFromSupabaseStorage, 
  replaceMediaInSupabaseStorage, 
  subscribeToMediaRealtime,
  SupabaseMediaItem 
} from '../lib/supabase';
import { MediaRenderer } from './MediaRenderer';

interface MediaManagerProps {
  cmsData?: Record<string, any>;
  updateCmsField?: (key: string, value: any) => void;
  onSelectMedia?: (url: string) => void;
}

export const MediaManager: React.FC<MediaManagerProps> = ({
  cmsData = {},
  updateCmsField,
  onSelectMedia,
}) => {
  const [mediaList, setMediaList] = useState<SupabaseMediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dragActive, setDragActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Selected Upload Folder
  const [selectedUploadFolder, setSelectedUploadFolder] = useState('general');

  // Preview Modal
  const [previewItem, setPreviewItem] = useState<SupabaseMediaItem | null>(null);

  // Replace Item Modal / State
  const [replacingItem, setReplacingItem] = useState<SupabaseMediaItem | null>(null);

  // Folders list
  const folders = [
    { id: 'all', name: 'جميع الميديا (All)', icon: '📁' },
    { id: 'general', name: 'عام (General)', icon: '🖼️' },
    { id: 'banners', name: 'الهيرو والبنرات (Banners)', icon: '🚀' },
    { id: 'videos', name: 'الفيديوهات والشروحات (Videos)', icon: '🎬' },
    { id: 'logos', name: 'الشعارات والشركاء (Logos)', icon: '✨' },
    { id: 'blog', name: 'مقالات المدونة (Blog)', icon: '📝' },
    { id: 'certificates', name: 'الشهادات والتوثيق (Certs)', icon: '🛡️' },
  ];

  // Load Media from Supabase Storage & DB
  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const items = await fetchSupabaseMediaItems();
      setMediaList(items);
    } catch (e) {
      console.error('[MediaManager] Failed to load media items:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
    const unsubscribeMedia = subscribeToMediaRealtime(() => {
      loadMedia();
    });
    return () => {
      unsubscribeMedia();
    };
  }, []);

  // Handle Client-Side Image Compression before uploading to Supabase Storage
  const compressImage = (file: File, quality = 0.8): Promise<{ blob: Blob; resolution: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                resolve({
                  blob: blob || file,
                  resolution: `${Math.round(width)}x${Math.round(height)}`,
                });
              },
              'image/webp',
              quality
            );
          } else {
            resolve({ blob: file, resolution: `${img.width}x${img.height}` });
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Upload handler for Supabase Storage
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadProgress(20);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4');

      try {
        let processedBlob: Blob = file;
        let resolution = 'Original';
        let compressionRatio = 'Supabase CDN';

        if (!isVideo && file.type.startsWith('image/')) {
          setUploadProgress(40);
          const compressed = await compressImage(file, 0.82);
          processedBlob = compressed.blob;
          resolution = compressed.resolution;
          compressionRatio = `WebP (${Math.round(((file.size - processedBlob.size) / file.size) * 100)}% ضغط)`;
        } else if (isVideo) {
          resolution = '1080p MP4';
          compressionRatio = 'Streamable CDN';
        }

        setUploadProgress(70);

        const uploaded = await uploadMediaToSupabaseStorage(processedBlob, file.name, {
          folder: selectedUploadFolder,
          resolution,
          optimized: true,
          compressionRatio,
        });

        if (uploaded) {
          setMediaList((prev) => [uploaded, ...prev]);
        }
      } catch (err) {
        console.error('[MediaManager] Upload error:', err);
      }
    }

    setUploadProgress(100);
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
    }, 500);
  };

  // Replace existing media in Supabase Storage
  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingItem) return;

    setIsUploading(true);
    try {
      let processedBlob: Blob = file;
      let resolution = '1080p';
      let compressionRatio = 'Replaced CDN';

      if (file.type.startsWith('image/')) {
        const compressed = await compressImage(file, 0.8);
        processedBlob = compressed.blob;
        resolution = compressed.resolution;
        compressionRatio = 'WebP Replaced';
      }

      const updated = await replaceMediaInSupabaseStorage(replacingItem, processedBlob, file.name, {
        folder: replacingItem.folder || 'general',
        resolution,
        optimized: true,
        compressionRatio,
      });

      if (updated) {
        setMediaList((prev) => prev.map((m) => (m.id === replacingItem.id ? updated : m)));
        alert('⚡ تم استبدال ملف الميديا في Supabase Storage بنجاح ورابط الـ CDN محدث!');
      }
    } catch (err) {
      console.error('[MediaManager] Replace error:', err);
    } finally {
      setIsUploading(false);
      setReplacingItem(null);
    }
  };

  // Delete from Supabase Storage
  const handleDeleteMedia = async (item: SupabaseMediaItem) => {
    if (confirm(`هل أنت متأكد من حذف الملف "${item.name}" نهائياً من Supabase Storage؟`)) {
      const success = await deleteMediaFromSupabaseStorage(item);
      if (success) {
        setMediaList((prev) => prev.filter((m) => m.id !== item.id));
        if (previewItem?.id === item.id) setPreviewItem(null);
      }
    }
  };

  // Copy URL
  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Quick set CMS Field
  const handleSetCmsField = (fieldKey: string, url: string, label: string) => {
    if (updateCmsField) {
      updateCmsField(fieldKey, url);
      alert(`✅ تم تعيين الميديا بنجاح لـ (${label})!`);
    }
    if (onSelectMedia) {
      onSelectMedia(url);
    }
  };

  // Drag Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  // Filtered List
  const filteredList = mediaList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFolder === 'all' || item.folder === activeFolder;
    const isVid = item.type.startsWith('video') || item.url.includes('.mp4') || item.url.includes('youtube');
    const matchesType = mediaTypeFilter === 'all' || (mediaTypeFilter === 'video' ? isVid : !isVid);

    return matchesSearch && matchesFolder && matchesType;
  });

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900/30 via-black to-blue-900/30 border border-primary/20 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span>Supabase Storage Engine & CDN Media Manager</span>
          </div>
          <h2 className="text-xl font-black text-white">مكتبة الميديا الاحترافية والسحابية</h2>
          <p className="text-xs text-gray-400 mt-1">
            رفع وضغط وتوزيع الفيديوهات والصور عبر شبكة Supabase CDN العالمية مع أداء استجابة خارق.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadMedia}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 p-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
            title="تحديث القائمة من السيرفر"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary' : ''}`} />
            <span>تحديث</span>
          </button>
        </div>
      </div>

      {/* Folders & Navigation bar */}
      <div className="flex border-b border-white/5 pb-2 overflow-x-auto gap-2">
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFolder(f.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeFolder === f.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{f.icon}</span>
            <span>{f.name}</span>
          </button>
        ))}
      </div>

      {/* Upload Zone & Filter Toolbar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Upload Box */}
        <div className="lg:col-span-1 space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden ${
              dragActive
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-white/10 bg-black/40 hover:border-primary/50 hover:bg-white/[0.01]'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 text-primary">
              <Upload className="w-6 h-6 animate-bounce" />
            </div>
            <span className="text-xs font-black text-white block">اسحب الملفات هنا للرفع السحابي</span>
            <span className="text-[10px] text-gray-400 block mt-1">يدعم الصور (WebP/PNG/JPG) والفيديوهات (MP4/WebM)</span>

            {/* Target Folder Selector */}
            <div className="mt-4 w-full text-right">
              <label className="block text-[10px] text-gray-400 font-bold mb-1">المجلد المستهدف:</label>
              <select
                value={selectedUploadFolder}
                onChange={(e) => setSelectedUploadFolder(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
              >
                <option value="general">عام (General)</option>
                <option value="banners">الهيرو والبنرات (Banners)</option>
                <option value="videos">الفيديوهات والشروحات (Videos)</option>
                <option value="logos">الشعارات والشركاء (Logos)</option>
                <option value="blog">مقالات المدونة (Blog)</option>
                <option value="certificates">الشهادات والتوثيق (Certs)</option>
              </select>
            </div>

            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="supabase-file-input"
            />

            <button
              type="button"
              onClick={() => document.getElementById('supabase-file-input')?.click()}
              className="mt-3 w-full bg-primary hover:bg-primary/90 text-white text-xs font-black py-2 rounded-xl transition-all shadow-md shadow-primary/20 cursor-pointer"
            >
              اختيار ملفات من الجهاز
            </button>
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="bg-black/60 border border-primary/30 p-3.5 rounded-xl space-y-2">
              <div className="flex justify-between text-xs text-white font-bold">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin" />
                  جاري الضغط والرفع لـ Supabase CDN...
                </span>
                <span className="text-primary font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Media Grid & Main Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filter Toolbar */}
          <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="بحث باسم الملف أو الصيغة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-xs pr-9 text-white focus:outline-none focus:border-primary"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
            </div>

            {/* Type & View toggles */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex bg-black/60 p-1 rounded-xl border border-white/5 text-xs">
                <button
                  onClick={() => setMediaTypeFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    mediaTypeFilter === 'all' ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  الكل ({mediaList.length})
                </button>
                <button
                  onClick={() => setMediaTypeFilter('image')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    mediaTypeFilter === 'image' ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  الصور
                </button>
                <button
                  onClick={() => setMediaTypeFilter('video')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    mediaTypeFilter === 'video' ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  الفيديوهات
                </button>
              </div>

              <div className="flex bg-black/60 p-1 rounded-xl border border-white/5 text-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
                  }`}
                  title="عرض الشبكة"
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
                  }`}
                  title="عرض القائمة"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Items Display */}
          {isLoading ? (
            <div className="py-16 text-center text-gray-500 space-y-3">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
              <p className="text-xs font-bold">جاري تحميل ملفات Supabase Storage...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-16 text-center bg-black/20 border border-white/5 rounded-2xl space-y-3">
              <ImageIcon className="w-12 h-12 text-gray-600 mx-auto" />
              <h4 className="text-sm font-bold text-gray-400">لا توجد ملفات ميديا مطابقة حالياً</h4>
              <p className="text-xs text-gray-500">قم برفع ملفات جديدة مباشرة إلى Supabase Storage.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredList.map((item) => {
                const isVid = item.type.startsWith('video') || item.url.includes('.mp4') || item.url.includes('youtube');

                return (
                  <div
                    key={item.id}
                    className="bg-black/40 border border-white/5 hover:border-primary/40 p-3 rounded-2xl space-y-2 group transition-all relative flex flex-col justify-between"
                  >
                    {/* Media Preview Box */}
                    <div className="h-36 bg-black/60 rounded-xl overflow-hidden relative flex items-center justify-center">
                      <MediaRenderer
                        src={item.url}
                        type={isVid ? 'video' : 'image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        alt={item.name}
                      />

                      {/* Storage Tag */}
                      <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />
                        Supabase CDN
                      </span>

                      {/* Type Overlay */}
                      <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md text-white/80 text-[9px] px-2 py-0.5 rounded-full font-mono">
                        {item.resolution || (isVid ? '1080p' : 'WebP')}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-white block truncate flex-1" title={item.name}>
                          {item.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{item.size}</span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-gray-500">
                        <span className="bg-white/5 px-2 py-0.5 rounded text-gray-400">📁 {item.folder || 'عام'}</span>
                        <span>{item.compressionRatio || 'مُحسّن'}</span>
                      </div>
                    </div>

                    {/* Quick Set Actions */}
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => handleSetCmsField('founderImgUrl', item.url, 'صورة المؤسس')}
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white text-[9px] px-2 py-1 rounded font-bold transition-all cursor-pointer flex-1 text-center"
                      >
                        المؤسس 👤
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetCmsField('trustCertImgUrl', item.url, 'شهادة الأمان')}
                        className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-white text-[9px] px-2 py-1 rounded font-bold transition-all cursor-pointer flex-1 text-center"
                      >
                        الشهادة 🛡️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetCmsField('authImageUrl', item.url, 'الشريك الهندسي')}
                        className="bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white text-[9px] px-2 py-1 rounded font-bold transition-all cursor-pointer flex-1 text-center"
                      >
                        الهندسة 🤝
                      </button>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setPreviewItem(item)}
                          className="bg-white/5 hover:bg-white/10 text-white p-1.5 rounded-lg text-xs transition-all cursor-pointer"
                          title="معاينة كاملة والكود"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopyUrl(item.url, item.id)}
                          className="bg-white/5 hover:bg-white/10 text-white p-1.5 rounded-lg text-xs transition-all cursor-pointer"
                          title="نسخ رابط الـ CDN"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => setReplacingItem(item)}
                          className="bg-white/5 hover:bg-white/10 text-white p-1.5 rounded-lg text-xs transition-all cursor-pointer"
                          title="استبدال الملف"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteMedia(item)}
                        className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer"
                        title="حذف من السيرفر"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead className="bg-black/60 text-gray-400 text-[10px] uppercase font-mono border-b border-white/5">
                  <tr>
                    <th className="p-3">الملف والمعاينة</th>
                    <th className="p-3">المجلد</th>
                    <th className="p-3">الحجم والنوع</th>
                    <th className="p-3">الضغط والـ CDN</th>
                    <th className="p-3 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredList.map((item) => {
                    const isVid = item.type.startsWith('video') || item.url.includes('.mp4');

                    return (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-all">
                        <td className="p-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-black rounded-lg overflow-hidden shrink-0">
                            <MediaRenderer src={item.url} type={isVid ? 'video' : 'image'} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold text-white truncate max-w-[200px]">{item.name}</span>
                        </td>
                        <td className="p-3 text-gray-400">📁 {item.folder || 'عام'}</td>
                        <td className="p-3 font-mono text-gray-400">
                          <div>{item.size}</div>
                          <div className="text-[10px] text-gray-500">{item.type}</div>
                        </td>
                        <td className="p-3">
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                            {item.compressionRatio || 'Supabase CDN'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => setPreviewItem(item)}
                              className="bg-white/5 hover:bg-white/10 text-white p-1.5 rounded-lg text-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleCopyUrl(item.url, item.id)}
                              className="bg-white/5 hover:bg-white/10 text-white p-1.5 rounded-lg text-xs"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMedia(item)}
                              className="text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg text-xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input for Replace Operation */}
      {replacingItem && (
        <input
          type="file"
          id="replace-file-input"
          onChange={handleReplaceFile}
          className="hidden"
          autoFocus
          ref={(input) => input?.click()}
        />
      )}

      {/* Full Preview & Code Generator Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-3xl w-full p-6 space-y-6 text-right relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 text-primary font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>معاينة الأصل من شبكة Supabase CDN</span>
            </div>

            <h3 className="text-lg font-black text-white">{previewItem.name}</h3>

            {/* Preview Box */}
            <div className="bg-black/80 rounded-2xl overflow-hidden border border-white/10 max-h-[380px] flex items-center justify-center">
              <MediaRenderer
                src={previewItem.url}
                type={previewItem.type.startsWith('video') || previewItem.url.includes('.mp4') ? 'video' : 'image'}
                className="max-h-[380px] w-full object-contain"
                controls
              />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-xs">
              <div>
                <span className="text-gray-500 block text-[10px]">حجم الملف:</span>
                <strong className="text-white font-mono">{previewItem.size}</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">الدقة والوضوح:</span>
                <strong className="text-white font-mono">{previewItem.resolution || 'HD'}</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">نوع الميديا:</span>
                <strong className="text-white font-mono">{previewItem.type}</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">حالة الضغط:</span>
                <strong className="text-emerald-400 font-bold">{previewItem.compressionRatio || 'Supabase WebP'}</strong>
              </div>
            </div>

            {/* Direct CDN Link & Embed Snippet Generator */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-300">رابط الـ CDN المباشر السريع:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={previewItem.url}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs font-mono text-primary focus:outline-none"
                />
                <button
                  onClick={() => handleCopyUrl(previewItem.url, 'modal')}
                  className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>نسخ الرابط</span>
                </button>
              </div>

              {/* Code snippets */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-gray-300">كود الصورة المستجيبة Responsive Picture Tag:</label>
                <textarea
                  readOnly
                  rows={2}
                  value={`<picture>\n  <source srcset="${previewItem.url}" type="image/webp" />\n  <img src="${previewItem.url}" alt="${previewItem.name}" loading="lazy" />\n</picture>`}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-[11px] font-mono text-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <a
                href={previewItem.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-bold"
              >
                <span>فتح في تبويب جديد</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setPreviewItem(null)}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
