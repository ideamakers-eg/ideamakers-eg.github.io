import React, { useState } from 'react';
import { 
  Search, Shield, Layers, RefreshCw, FileText, Check, Trash2, Plus, 
  Sparkles, Save, Image, Upload, File, HelpCircle, CheckSquare, 
  Eye, Monitor, Wifi, Globe, Send, MessageCircle, Heart, Palette
} from 'lucide-react';
import { setMediaItem } from '../lib/db';
import { MediaRenderer } from './MediaRenderer';
import { MediaManager } from './MediaManager';

interface CmsMarketingProps {
  cmsData: Record<string, any>;
  updateCmsField: (key: string, value: any) => void;
  mediaFiles: any[];
  setMediaFiles: React.Dispatch<React.SetStateAction<any[]>>;
  activeRole: string;
}

export const CmsMarketing: React.FC<CmsMarketingProps> = ({ 
  cmsData, 
  updateCmsField, 
  mediaFiles, 
  setMediaFiles,
  activeRole
}) => {
  // Local sub-tabs
  const [subSection, setSubSection] = useState<'seo' | 'whatsapp' | 'brand_assets' | 'media'>('seo');
  
  // Media states
  const [mediaSearch, setMediaSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // SEO state
  const [selectedAuditPage, setSelectedAuditPage] = useState('egypt');
  
  // WhatsApp state
  const [testNumber, setTestNumber] = useState('201121778205');
  const [whatsappLogs, setWhatsappLogs] = useState<any[]>([]);

  // Compress and upload real image to LocalStorage safely
  const compressAndAddImage = (file: File) => {
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        const MAX_HEIGHT = 900;
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
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75); // compress to 75% quality JPEG
          
          // Calculate approximate size in KB
          const approxSize = Math.round((dataUrl.length * 3) / 4 / 1024);
          
          const mediaId = 'med-' + Date.now();
          const dbKey = `media_file_${mediaId}`;
          
          // Save actual Base64 to IndexedDB
          setMediaItem(dbKey, dataUrl).then(() => {
            const newMedia = {
              id: mediaId,
              name: file.name,
              type: 'image/jpeg',
              size: `${approxSize} KB`,
              url: `db://${dbKey}`,
              optimized: true,
              compressionRatio: 'تم الضغط لـ 75%',
              resolution: `${Math.round(width)}x${Math.round(height)}`
            };

            setMediaFiles(prev => [newMedia, ...prev]);
          }).catch(err => {
            console.error("Failed to save image to IndexedDB:", err);
          });
        }
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndAddImage(file);
    }
  };

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
    const file = e.dataTransfer.files?.[0];
    if (file) {
      compressAndAddImage(file);
    }
  };

  // WhatsApp simulation send
  const sendTestWhatsApp = () => {
    const timestamp = new Date().toLocaleTimeString('ar-EG');
    const log = {
      id: 'wa-log-' + Date.now(),
      timestamp,
      phone: testNumber,
      status: 'sent',
      message: cmsData.cmsWhatsapp || 'مرحباً، أود الاستفسار عن سيستم كاشير البلايستيشن.'
    };
    setWhatsappLogs(prev => [log, ...prev]);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Sub tabs header */}
      <div className="flex border-b border-white/5 pb-0 overflow-x-auto gap-1">
        <button
          onClick={() => setSubSection('seo')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'seo' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🔍 محرك البحث والسيو (SEO)
        </button>
        <button
          onClick={() => setSubSection('whatsapp')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'whatsapp' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          💬 تواصل واتساب (WhatsApp Automation)
        </button>
        <button
          onClick={() => setSubSection('brand_assets')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'brand_assets' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🎨 الهوية البصرية (Brand Assets)
        </button>
        <button
          onClick={() => setSubSection('media')}
          className={`px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer ${
            subSection === 'media' ? 'border-primary text-white bg-white/[0.02]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🖼️ مكتبة الميديا الذكية (Media Library)
        </button>
      </div>

      {/* --- Sub section: SEO --- */}
      {subSection === 'seo' && (
        <div className="space-y-6">
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-white">التحكم الكلي بـ SEO ومحركات البحث للبلدان</h3>
              <p className="text-[11px] text-gray-400">إضافة علامات الميتا، وتخصيص الكلمات المفتاحية لرفع التصنيف الميداني.</p>
            </div>
            <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
              {['egypt', 'saudi', 'kuwait', 'uae', 'qatar'].map(p => (
                <button
                  key={p}
                  onClick={() => setSelectedAuditPage(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedAuditPage === p ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {p === 'egypt' ? '🇪🇬 مصر' : p === 'saudi' ? '🇸🇦 السعودية' : p === 'kuwait' ? '🇰🇼 الكويت' : p === 'uae' ? '🇦🇪 الإمارات' : '🇶🇦 قطر'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side Form */}
            <div className="lg:col-span-2 bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
              <h4 className="text-xs font-black text-primary">تعديل ميتا الصفحة الرئيسية ({selectedAuditPage})</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-400 text-xs mb-1 font-bold">العنوان التعريفي (Meta Title)</label>
                  <input
                    type="text"
                    value={cmsData[`seoTitle_${selectedAuditPage}`] || `سيستم كاشير بلايستيشن احترافي في ${selectedAuditPage === 'egypt' ? 'مصر' : 'الخليج'}`}
                    onChange={(e) => updateCmsField(`seoTitle_${selectedAuditPage}`, e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs mb-1 font-bold">الوصف التعريفي (Meta Description)</label>
                  <textarea
                    rows={3}
                    value={cmsData[`seoDesc_${selectedAuditPage}`] || `نظام متكامل لإدارة صالات البلايستيشن، الكافيه، والمخازن. صُمم بذكاء لرفع أرباح صالتك بنسبة 40% وسد ثغرات الكاشير في ${selectedAuditPage === 'egypt' ? 'مصر' : 'الخليج'}.`}
                    onChange={(e) => updateCmsField(`seoDesc_${selectedAuditPage}`, e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs mb-1 font-bold">الكلمات المفتاحية المستهدفة (Focus Keywords)</label>
                  <input
                    type="text"
                    value={cmsData[`seoKeywords_${selectedAuditPage}`] || 'سيستم بلايستيشن، كاشير صالات، برنامج بلايستيشن وكافيه'}
                    onChange={(e) => updateCmsField(`seoKeywords_${selectedAuditPage}`, e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-300">نصيحة الذكاء الاصطناعي: قم بإضافة "ملكية مدى الحياة" لزيادة نسبة النقر CTR بـ ١٨%.</span>
              </div>
            </div>

            {/* Right side SEO Audit results */}
            <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
              <h4 className="text-xs font-black text-white">فحص السيو الفوري والمطابقة التقنية</h4>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" className="text-white/5" strokeWidth="4" fill="transparent" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor" className="text-emerald-400" strokeWidth="4" fill="transparent" strokeDasharray="175" strokeDashoffset="25" />
                  </svg>
                  <span className="absolute text-sm font-black text-white">٨٥%</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">ممتاز ومطابق للشروط</div>
                  <div className="text-[10px] text-gray-400">باقي تعديلات طفيفة للحصول على ١٠٠% الكاملة.</div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>طول عنوان الميتا مثالي (٥٥ حرف)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>تم تفعيل وسم الكلمات المفتاحية في الصفحة</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>وسم الـ Open Graph (OG) مفعل ومربوط بمكتبة الصور</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-400">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  <span>الوصف التعريفي طويل نسبياً (١٧٥ حرف)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Sub section: WhatsApp Automation --- */}
      {subSection === 'whatsapp' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white">إعداد تواصل واتساب والرسائل الافتراضية</h3>
            <p className="text-xs text-gray-400">تخصيص الرسالة التي يتلقاها فريق صُنّاع الفكرة عند نقر العميل على زر تواصل واتساب.</p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-gray-400 text-xs mb-1 font-bold">رقم تواصل واتساب الأساسي (مع كود الدولة)</label>
                <input
                  type="text"
                  value={cmsData.cmsPhone || '201121778205'}
                  onChange={(e) => updateCmsField('cmsPhone', e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1 font-bold">رسالة الترحيب المخصصة الفورية للعميل (Pre-filled Message)</label>
                <textarea
                  rows={4}
                  value={cmsData.cmsWhatsapp || 'مرحباً فريق صُنّاع الفكرة، أودّ الاستفسار عن نظام إدارة صالات البلايستيشن.'}
                  onChange={(e) => updateCmsField('cmsWhatsapp', e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <h4 className="text-xs font-black text-white">تجربة محاكاة الإرسال والمتابعة</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">رقم هاتف تجريبي للاختبار</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={testNumber}
                    onChange={(e) => setTestNumber(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    onClick={sendTestWhatsApp}
                    className="bg-primary text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-primary/90"
                  >
                    إرسال
                  </button>
                </div>
              </div>

              {/* Logs */}
              <div className="bg-black/60 border border-white/5 rounded-xl p-3 h-44 overflow-y-auto space-y-2">
                <span className="text-[10px] text-gray-400 block font-bold">سجل محاكاة الإرسال:</span>
                {whatsappLogs.length === 0 ? (
                  <div className="text-[10px] text-gray-500 text-center py-8">لا يوجد محاكاة إرسال حالية. انقر إرسال للتجربة.</div>
                ) : (
                  whatsappLogs.map(log => (
                    <div key={log.id} className="bg-white/[0.02] p-2 rounded border border-white/[0.02] text-[10px] space-y-0.5">
                      <div className="flex justify-between items-center text-primary">
                        <span>تم الإرسال بنجاح</span>
                        <span className="font-mono text-[9px] text-gray-500">{log.timestamp}</span>
                      </div>
                      <div className="text-gray-400">إلى: {log.phone}</div>
                      <p className="text-gray-500 line-clamp-1">الرسالة: {log.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Sub section: Brand Assets --- */}
      {subSection === 'brand_assets' && (
        <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-black text-white">تعديل الألوان والهوية البصرية للنظام</h3>
          <p className="text-xs text-gray-400">تحكم ببراند الموقع الأساسي وتجربة المستخدم البصرية بما يتناسب مع رغبة العملاء.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold block">اللون الأساسي (Primary Accent)</span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={cmsData.primaryColor || '#a855f7'}
                  onChange={(e) => updateCmsField('primaryColor', e.target.value)}
                  className="w-12 h-10 bg-transparent cursor-pointer rounded border border-white/10"
                />
                <span className="text-xs font-mono text-white">{cmsData.primaryColor || '#a855f7'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold block">اللون الثانوي (Secondary Color)</span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={cmsData.secondaryColor || '#3b82f6'}
                  onChange={(e) => updateCmsField('secondaryColor', e.target.value)}
                  className="w-12 h-10 bg-transparent cursor-pointer rounded border border-white/10"
                />
                <span className="text-xs font-mono text-white">{cmsData.secondaryColor || '#3b82f6'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold block">الخط الأساسي للموقع (Typography Font)</span>
              <select
                value={cmsData.primaryFont || 'Inter'}
                onChange={(e) => updateCmsField('primaryFont', e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Inter">Inter (Sans-serif)</option>
                <option value="Space Grotesk">Space Grotesk (Modern Tech)</option>
                <option value="Outfit">Outfit (Clean Geometry)</option>
                <option value="JetBrains Mono">JetBrains Mono (Technical)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* --- Sub section: Media Library --- */}
      {subSection === 'media' && (
        <MediaManager cmsData={cmsData} updateCmsField={updateCmsField} />
      )}
    </div>
  );
};
