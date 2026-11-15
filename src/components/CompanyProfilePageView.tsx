import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  HelpCircle,
  Clock,
  Laptop,
  RefreshCw,
  FileDown
} from 'lucide-react';
import {
  COMPANY_PROFILE_SLIDES,
  COMPANY_PROFILE_CHAPTERS,
  COMPANY_PROFILE_PDF_URL,
  TOTAL_PAGES
} from '../data/companyProfileData';

interface CompanyProfilePageViewProps {
  onNavigateHome: () => void;
  onOpenViewer: (pageNumber?: number) => void;
  onOpenTrialForm: () => void;
}

export const CompanyProfilePageView: React.FC<CompanyProfilePageViewProps> = ({
  onNavigateHome,
  onOpenViewer,
  onOpenTrialForm
}) => {
  const [selectedPreviewPage, setSelectedPreviewPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'pdf' | 'slides'>('slides');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const thumbnailsScrollRef = useRef<HTMLDivElement>(null);

  const currentPreviewSlide =
    COMPANY_PROFILE_SLIDES.find(s => s.pageNumber === selectedPreviewPage) ||
    COMPANY_PROFILE_SLIDES[0];

  // Reset loading state on slide change
  useEffect(() => {
    setIsImageLoading(true);
    setIsImageError(false);
  }, [selectedPreviewPage]);

  // Preload adjacent images for ultra-smooth response
  useEffect(() => {
    const nextIdx = Math.min(TOTAL_PAGES, selectedPreviewPage + 1);
    const prevIdx = Math.max(1, selectedPreviewPage - 1);
    const preloadImage = (url: string) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    };
    if (COMPANY_PROFILE_SLIDES[nextIdx - 1]) {
      preloadImage(COMPANY_PROFILE_SLIDES[nextIdx - 1].image);
    }
    if (COMPANY_PROFILE_SLIDES[prevIdx - 1]) {
      preloadImage(COMPANY_PROFILE_SLIDES[prevIdx - 1].image);
    }
  }, [selectedPreviewPage]);

  // Keep thumbnail in view
  useEffect(() => {
    if (thumbnailsScrollRef.current) {
      const activeEl = thumbnailsScrollRef.current.querySelector(
        `[data-thumb-page="${selectedPreviewPage}"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [selectedPreviewPage]);

  const handleWhatsApp = () => {
    const text = `*مرحباً فريق صُنّاع الفكرة* 👋\n\nأطلعت على صفحة *الملف التعريفي للشركة (Company Profile)* الرسمية، وأرغب في مناقشة تفاصيل العرض الفني والتجاري لصالتنا.`;
    const phone = '201121778205';
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  const scrollThumbnails = (dir: 'left' | 'right') => {
    if (thumbnailsScrollRef.current) {
      const scrollAmount = 300;
      thumbnailsScrollRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-24 pb-24 font-cairo" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="مسار التنقل" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-gray-400">
            <li>
              <button
                onClick={onNavigateHome}
                className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>الرئيسية</span>
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-200 font-bold">الملف التعريفي للشركة (Company Profile)</li>
          </ol>
        </nav>

        {/* Page Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 border border-primary/30 text-purple-300 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>OFFICIAL COMPANY PROFILE & TECHNICAL PROPOSAL · 2026 EDITION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            الملف التعريفي الرسمي لشركة{' '}
            <span className="bg-gradient-to-r from-white via-purple-300 to-primary bg-clip-text text-transparent">
              IDEA MAKERS
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            الوثيقة المؤسسية والهندسية المتكاملة (26 صفحة) لبرنامج إدارة صالات البلايستيشن ومراكز الألعاب الإلكترونية. تصفح التفاصيل بدقة عالية أو حمّل النسخة الرسمية PDF.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenViewer(selectedPreviewPage)}
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-primary/30 transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>فتح المستعرض التفاعلي بملء الشاشة</span>
            </button>

            <a
              href={COMPANY_PROFILE_PDF_URL}
              download="IDEA_Makers_Company_Profile_POS_Proposal.pdf"
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>تحميل ملف الـ PDF (3.8 MB)</span>
            </a>

            <button
              onClick={handleWhatsApp}
              className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>استفسار حول العرض</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            PREVIEW SECTION: DUAL-MODE VIEWER (PDF EMBED / HD SLIDES)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Slide & PDF Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0a0a14] border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
            {/* Top Bar with Mode Switcher & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
              {/* Dual View Mode Segmented Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode('slides')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'slides'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>عرض الشرائح عالي الدقة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'pdf'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>مستند الـ PDF المباشر</span>
                </button>
              </div>

              {/* Title & Fullscreen Trigger */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-300 font-medium hidden sm:inline-block">
                  صفحة {selectedPreviewPage} من {TOTAL_PAGES}
                </span>
                <button
                  onClick={() => onOpenViewer(selectedPreviewPage)}
                  className="text-xs font-bold text-primary hover:text-purple-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                  title="توسيع ملء الشاشة"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>توسيع ملء الشاشة</span>
                </button>
              </div>
            </div>

            {/* Content Display: Slides or Native PDF */}
            {viewMode === 'slides' ? (
              /* HD Slides Mode */
              <div className="space-y-4">
                <div
                  onClick={() => onOpenViewer(selectedPreviewPage)}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#121224] via-[#0c0d18] to-[#070710] border border-white/10 cursor-pointer group shadow-2xl flex items-center justify-center"
                >
                  {/* Loading Skeleton */}
                  {isImageLoading && !isImageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0e1b] z-10">
                      <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-3" />
                      <div className="text-xs font-bold text-purple-300">
                        جاري تحميل الصفحة {selectedPreviewPage} بدقة 1080p...
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        IDEA MAKERS Company Profile
                      </div>
                    </div>
                  )}

                  {/* Error State Fallback */}
                  {isImageError ? (
                    <div className="p-8 text-center text-gray-400 space-y-3">
                      <FileDown className="w-12 h-12 text-primary mx-auto opacity-70" />
                      <div className="text-sm font-bold text-white">
                        الصفحة {selectedPreviewPage}: {currentPreviewSlide.title}
                      </div>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        يمكنك فتح المستند كاملاً عبر مستعرض الـ PDF أو تحميل النسخة الرسمية مباشرة.
                      </p>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewMode('pdf');
                          }}
                          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
                        >
                          التحويل لمستعرض الـ PDF
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsImageError(false);
                            setIsImageLoading(true);
                          }}
                          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300"
                        >
                          إعادة المحاولة
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* The Actual Slide Image */
                    <img
                      src={currentPreviewSlide.image}
                      alt={currentPreviewSlide.title}
                      loading="eager"
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => {
                        setIsImageLoading(false);
                        setIsImageError(true);
                      }}
                      className={`w-full h-full object-contain transition-opacity duration-300 ${
                        isImageLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                  )}

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-2 shadow-2xl">
                      <Eye className="w-4 h-4" />
                      <span>انقر للتكبير والتصفح التفاعلي بملء الشاشة</span>
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-purple-200">
                    صفحة {selectedPreviewPage} / {TOTAL_PAGES}
                  </div>
                </div>

                {/* Stepper Navigation Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSelectedPreviewPage(p => Math.max(1, p - 1))}
                    disabled={selectedPreviewPage <= 1}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>الصفحة السابقة</span>
                  </button>

                  <div className="text-center">
                    <div className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
                      {currentPreviewSlide.title}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      الفصل 0{currentPreviewSlide.chapterIndex}: {currentPreviewSlide.chapter}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPreviewPage(p => Math.min(TOTAL_PAGES, p + 1))}
                    disabled={selectedPreviewPage >= TOTAL_PAGES}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>الصفحة التالية</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive PDF Document Reader (Continuous Scroll / 100% Reliable) */
              <div className="space-y-3">
                <div className="w-full h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-[#07070f] relative shadow-2xl flex flex-col">
                  {/* PDF Toolbar Header */}
                  <div className="px-4 py-2.5 bg-[#0d0d1a] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="font-bold text-white truncate max-w-xs sm:max-w-md">
                        وثيقة العرض الفني والتجاري المعتمد V.3 (26 صفحة)
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">(3.8 MB)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={COMPANY_PROFILE_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-colors cursor-pointer"
                        title="فتح في تبويب مستقل"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-primary" />
                        <span>فتح في تبويب</span>
                      </a>
                      <a
                        href={COMPANY_PROFILE_PDF_URL}
                        download="IDEA_Makers_Company_Profile_POS_Proposal.pdf"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-colors cursor-pointer"
                        title="تحميل الملف الأصلي"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>تحميل ملف PDF</span>
                      </a>
                    </div>
                  </div>

                  {/* Scrollable Document Pages View: All 26 pages rendered cleanly */}
                  <div className="w-full flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-[#04040a]">
                    {COMPANY_PROFILE_SLIDES.map(slide => (
                      <div
                        key={slide.pageNumber}
                        id={`page-view-pdf-${slide.pageNumber}`}
                        className="flex flex-col items-center max-w-3xl mx-auto"
                      >
                        <div className="w-full flex items-center justify-between text-[11px] text-gray-400 py-1.5 px-2">
                          <span className="font-mono text-purple-300 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            صفحة {slide.pageNumber} من {TOTAL_PAGES}
                          </span>
                          <span className="text-gray-400 truncate max-w-md">{slide.title}</span>
                        </div>
                        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-[#0e0e1a] shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative">
                          <img
                            src={slide.image}
                            alt={`صفحة ${slide.pageNumber}: ${slide.title}`}
                            loading="lazy"
                            className="w-full h-full object-contain select-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>تم استعراض كافة صفحات العرض الفني الـ 26 بدقة عالية قابلة للتمرير والتصفح.</span>
                  <button
                    onClick={() => setViewMode('slides')}
                    className="text-primary hover:underline font-bold cursor-pointer"
                  >
                    التبديل لعرض الشرائح المفردة HD
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                HORIZONTAL THUMBNAILS CAROUSEL (معاينة جميع الصفحات)
                ======================================================== */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-white">
                    معاينة جميع صفحات الملف التعريفي ({TOTAL_PAGES} صفحة):
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => scrollThumbnails('right')}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="تمرير لليمين"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollThumbnails('left')}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="تمرير لليسار"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Thumbnails Strip */}
              <div
                ref={thumbnailsScrollRef}
                className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-none"
              >
                {COMPANY_PROFILE_SLIDES.map(slide => {
                  const isActive = slide.pageNumber === selectedPreviewPage;
                  return (
                    <button
                      key={slide.pageNumber}
                      data-thumb-page={slide.pageNumber}
                      onClick={() => {
                        setSelectedPreviewPage(slide.pageNumber);
                        if (viewMode === 'pdf') {
                          const el = document.getElementById(`page-view-pdf-${slide.pageNumber}`);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                      }}
                      className={`relative shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group bg-[#0e0e1a] ${
                        isActive
                          ? 'border-primary ring-2 ring-primary/40 scale-105 shadow-lg shadow-primary/30 z-10'
                          : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                      title={`صفحة ${slide.pageNumber}: ${slide.title}`}
                    >
                      <img
                        src={slide.image}
                        alt={`شريحة ${slide.pageNumber}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-1">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isActive ? 'bg-primary text-white' : 'bg-black/70 text-gray-300'
                          }`}
                        >
                          ص {slide.pageNumber}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chapter Quick Selector & Key Highlights (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Slide Insights Card */}
            <div className="p-6 rounded-3xl bg-[#0b0b16] border border-white/10 shadow-xl">
              <div className="text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">
                {currentPreviewSlide.chapter}
              </div>
              <h3 className="text-lg font-black text-white mb-2">
                {currentPreviewSlide.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                {currentPreviewSlide.keyTakeaway}
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                {currentPreviewSlide.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Chapter Jump Index */}
            <div className="p-6 rounded-3xl bg-[#0b0b16] border border-white/10 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>فهرس فصول الملف التعريفي:</span>
              </h4>
              <div className="space-y-1.5">
                {COMPANY_PROFILE_CHAPTERS.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedPreviewPage(ch.startPage)}
                    className={`w-full text-right p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      selectedPreviewPage >= ch.startPage && selectedPreviewPage <= ch.endPage
                        ? 'bg-primary/20 border border-primary/40 text-white font-bold'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{ch.index}. {ch.title}</span>
                    <span className="text-[10px] font-mono text-gray-500 shrink-0">
                      ص {ch.startPage}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7 Enterprise Chapters Grid Breakdown */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
              خارطة محتويات الملف التعريفي (26 صفحة)
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              استكشف المحاور الهندسية والتشغيلية والمالية التي تجعل نظام IDEA MAKERS معتمداً لدى مئات الصالات:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_PROFILE_CHAPTERS.map(chapter => (
              <div
                key={chapter.id}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-lg bg-primary/10">
                      الفصل 0{chapter.index}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      الصفحات {chapter.startPage} – {chapter.endPage}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {chapter.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedPreviewPage(chapter.startPage);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="mt-4 pt-4 border-t border-white/5 text-xs font-bold text-purple-300 hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span>عرض صفحات هذا الفصل</span>
                  <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-primary/20 via-[#0e0e1a] to-emerald-950/20 border border-white/10 text-center relative overflow-hidden">
          <h3 className="text-2xl sm:text-4xl font-black text-white mb-4">
            جاهز لتجربة النظام بنفسك داخل صالتك؟
          </h3>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 font-light">
            كما هو موثق في الصفحة 25 من الملف التعريفي: نوفر لك تجربة مجانية كاملة لمدة 72 ساعة لتختبر دقة حساب الثواني وسهولة الكاشير دون أي التزام مالي مسبق.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenTrialForm}
              className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-sm shadow-xl shadow-primary/30 transition-all cursor-pointer"
            >
              ابدأ تجربتك المجانية (3 أيام)
            </button>
            <button
              onClick={handleWhatsApp}
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm transition-all cursor-pointer"
            >
              تحدث مع مهندس المبيعات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePageView;
