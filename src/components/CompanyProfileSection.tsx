import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Download,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  MessageCircle,
  Eye,
  Layers,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import {
  COMPANY_PROFILE_CHAPTERS,
  COMPANY_PROFILE_PDF_URL,
  TOTAL_PAGES,
  getAssetUrl
} from '../data/companyProfileData';

interface CompanyProfileSectionProps {
  onOpenViewer: (pageNumber?: number) => void;
  onWhatsAppInquiry?: (message?: string) => void;
}

export const CompanyProfileSection: React.FC<CompanyProfileSectionProps> = ({
  onOpenViewer,
  onWhatsAppInquiry
}) => {
  const handleWhatsApp = (text?: string) => {
    const defaultMsg = `*مرحباً فريق صُنّاع الفكرة* 👋\n\nأودّ طلب نسخة رسمية من *الملف التعريفي للشركة (Company Profile)* ومناقشة تفاصيل العرض الفني والتجاري لصالتنا.`;
    const message = text || defaultMsg;
    if (onWhatsAppInquiry) {
      onWhatsAppInquiry(message);
    } else {
      const phone = '201121778205';
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    }
  };

  return (
    <section
      id="company-profile"
      className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 relative overflow-hidden bg-gradient-to-b from-black via-[#080811] to-black border-t border-white/[0.04]"
      dir="rtl"
    >
      {/* Background Tech Grids & Ambient Nebula Glow */}
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ========================================================
            SECTION HEADER
            ======================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 border border-primary/25 text-purple-300 mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>الملف التعريفي الرسمي والعرض الفني المعتمد · COMPANY PROFILE 2026</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            الملف التعريفي لشركة{' '}
            <span className="bg-gradient-to-r from-white via-purple-300 to-primary bg-clip-text text-transparent">
              IDEA MAKERS
            </span>
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-semibold block mt-3">
              نحو إدارة أكثر ذكاءً واحترافية لصالات الألعاب ومراكز الترفيه
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            وثيقة مؤسسية وهندسية متكاملة (26 صفحة) توثق فلسفتنا في تطوير برمجيات إدارة صالات البلايستيشن، بنية النظام الأوفلاين 100%، استعراض الواجهات الحقيقية، والجدوى الاستثمارية لصالتك كما تُقدَّم لكبرى الشركات والكيانات التجارية.
          </motion.p>
        </div>

        {/* ========================================================
            MAIN SHOWCASE: REAL BROCHURE PREVIEW & KEY PILLARS
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Stacked 3D Realistic Brochure Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative flex flex-col items-center"
          >
            {/* Interactive Card Presentation */}
            <div
              onClick={() => onOpenViewer(1)}
              className="relative w-full max-w-lg aspect-[16/10] rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-br from-primary/40 via-white/10 to-transparent shadow-[0_20px_60px_rgba(168,85,247,0.25)] hover:shadow-[0_25px_80px_rgba(168,85,247,0.4)] transition-all duration-500 cursor-pointer group"
            >
              <div className="w-full h-full rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#090912] relative flex items-center justify-center">
                {/* Cover Preview Image */}
                <img
                  src={getAssetUrl('assets/company-profile/page_01.jpg')}
                  alt="غلاف الملف التعريفي لشركة IDEA MAKERS"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Glass Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-5 sm:p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-primary text-white">
                      26 صفحة عالية الدقة
                    </span>
                    <span className="text-xs text-gray-300 font-mono">
                      PDF Version V.3 (2026)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    تصفح الملف التعريفي بدقة HD كاملة
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                    <span>انقر لفتح المستعرض التفاعلي</span>
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Floating Eye Action Icon */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:scale-110 group-hover:border-primary group-hover:text-primary transition-all">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Sub-strip of sample pages to jump into directly */}
            <div className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-lg">
              {[
                { page: 3, label: 'الرؤية والرسالة', thumb: getAssetUrl('assets/company-profile/page_03.jpg') },
                { page: 7, label: 'معمارية الحل', thumb: getAssetUrl('assets/company-profile/page_07.jpg') },
                { page: 9, label: 'الواجهة الحقيقية', thumb: getAssetUrl('assets/company-profile/page_09.jpg') },
                { page: 23, label: 'مقارنة الباقات', thumb: getAssetUrl('assets/company-profile/page_23.jpg') },
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => onOpenViewer(item.page)}
                  className="flex flex-col items-center gap-1.5 p-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-primary/40 transition-all text-center group cursor-pointer"
                >
                  <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50">
                    <img
                      src={item.thumb}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 group-hover:text-white font-medium truncate w-full">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 4 Enterprise Strategic Value Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    01. الفلسفة المؤسسية وتمكين الصالات (Pages 1–3)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    لسنا مجرد بائعين لبرنامج محاسبي؛ نحن شركة هندسية متكاملة تقدم منظومة سيادة تقنية تحمي استثمارات صالات الألعاب وتمنع التسريب المالي من الجذور.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    02. الحل الشامل: كل إدارة صالتك في شاشة واحدة (Pages 6–10)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    ربط آلي متكامل بين التحكم بالشاشات بالثانية، كاشير ونقاط البيع، جرد مستودع المشروبات، ومطابقة الخزينة اليومية دون الحاجة لأي برامج خارجية.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    03. أمان محلي 100% Offline بدون إنترنت (Pages 14–18)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    تشغيل محلي مشفر ومستقل تماماً يحمي عملك من انقطاعات الإنترنت، مع حماية متطورة ضد التلاعب بساعة الويندوز ونظام صلاحيات صارم للموظفين.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    04. شفافية تجارية وملكية مدى الحياة (Pages 19–26)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    ترخيص ملكية دائمة يدفع لمرة واحدة مدى الحياة بدون أي اشتراكات متكررة، مع تجربة حية مجانية لمدة 72 ساعة فحص واقعي داخل صالتك.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            ACTION CTA ROW: BROWSE HD, DOWNLOAD PDF, WHATSAPP
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-[#0e0e18] to-cyan-500/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="text-center md:text-right">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">
              الوثيقة الرسمية متاحة للاطلاع الفوري والتحميل
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              اطلع على العرض الفني والتجاري الكامل (26 صفحة بدقة عالية)
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              يمكنك تقليب الصفحات بملء الشاشة، تكبير التفاصيل، أو تنزيل ملف الـ PDF مباشرة.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* Primary: Open HD Viewer */}
            <button
              onClick={() => onOpenViewer(1)}
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-primary/30 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>تصفح الملف التعريفي الآن</span>
            </button>

            {/* Secondary: Download PDF */}
            <a
              href={COMPANY_PROFILE_PDF_URL}
              download="IDEA_Makers_Company_Profile_POS_Proposal.pdf"
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>تحميل النسخة PDF (3.8 MB)</span>
            </a>

            {/* Tertiary: WhatsApp Inquiries */}
            <button
              onClick={() => handleWhatsApp()}
              className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>استفسار حول العرض</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Chapter Navigation Cards */}
        <div className="mt-12">
          <div className="text-xs font-bold text-gray-400 mb-4 text-center">
            تصفح فصول الملف التعريفي مباشرة بنقرة واحدة:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
            {COMPANY_PROFILE_CHAPTERS.map(ch => (
              <button
                key={ch.id}
                onClick={() => onOpenViewer(ch.startPage)}
                className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-primary/40 text-right transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="text-[10px] text-primary font-bold mb-1">
                  فصل 0{ch.index}
                </div>
                <div className="text-xs font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                  {ch.title}
                </div>
                <div className="text-[10px] text-gray-500 font-mono mt-1">
                  ص {ch.startPage} - {ch.endPage}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default CompanyProfileSection;
