import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  FileText,
  List,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  COMPANY_PROFILE_SLIDES,
  COMPANY_PROFILE_CHAPTERS,
  COMPANY_PROFILE_PDF_URL,
  TOTAL_PAGES,
  CompanyProfileSlide
} from '../data/companyProfileData';

interface CompanyProfileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
  onConsultationClick?: (message?: string) => void;
}

export const CompanyProfileViewerModal: React.FC<CompanyProfileViewerModalProps> = ({
  isOpen,
  onClose,
  initialPage = 1,
  onConsultationClick
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [viewMode, setViewMode] = useState<'slides' | 'pdf'>('slides');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Sync initial page if opened with a specific page
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(Math.min(Math.max(1, initialPage), TOTAL_PAGES));
      setZoomLevel(100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialPage]);

  // Current active slide
  const currentSlide: CompanyProfileSlide =
    COMPANY_PROFILE_SLIDES.find(s => s.pageNumber === currentPage) || COMPANY_PROFILE_SLIDES[0];

  const currentChapter =
    COMPANY_PROFILE_CHAPTERS.find(
      ch => currentPage >= ch.startPage && currentPage <= ch.endPage
    ) || COMPANY_PROFILE_CHAPTERS[0];

  // Page navigation handlers
  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => (prev < TOTAL_PAGES ? prev + 1 : prev));
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToPage = useCallback((page: number) => {
    const target = Math.min(Math.max(1, page), TOTAL_PAGES);
    setCurrentPage(target);
    setIsTocOpen(false);
    setTimeout(() => {
      const el = document.getElementById(`modal-pdf-page-${target}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTocOpen) {
          setIsTocOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        // In RTL Arabic layout: ArrowLeft moves forward to next page
        goToNextPage();
      } else if (e.key === 'ArrowRight') {
        // ArrowRight moves back to previous page
        goToPrevPage();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(z => Math.min(175, z + 25));
      } else if (e.key === '-') {
        setZoomLevel(z => Math.max(75, z - 25));
      } else if (e.key === '0') {
        setZoomLevel(100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isTocOpen, goToNextPage, goToPrevPage, onClose]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.querySelector(
        `[data-page="${currentPage}"]`
      ) as HTMLElement | null;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentPage]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = `*مرحباً فريق صُنّاع الفكرة* 👋\n\nاطلعت على *الملف التعريفي للشركة (Company Profile)* صفحة رقم ${currentPage} (${currentSlide.title})، وأود الاستفسار ومناقشة تفاصيل العرض الفني والتجاري لصالتنا.`;
    if (onConsultationClick) {
      onConsultationClick(text);
    } else {
      const phone = '201121778205';
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100000] bg-[#050508]/98 backdrop-blur-2xl flex flex-col text-white select-none overflow-hidden font-cairo"
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-label="مستعرض الملف التعريفي للشركة"
      >
        {/* ========================================================
            TOP ENTERPRISE NAVIGATION HEADER
            ======================================================== */}
        <header className="h-16 px-3 sm:px-6 border-b border-white/[0.08] bg-[#07070e]/95 flex items-center justify-between gap-2 shrink-0 z-20">
          {/* Brand & Document Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-purple-800/30 border border-primary/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white truncate tracking-tight">
                  IDEA MAKERS — الملف التعريفي والعرض الفني
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/15 border border-primary/30 text-purple-300">
                  <Sparkles className="w-2.5 h-2.5 text-primary" />
                  <span>Company Profile 2026</span>
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 truncate flex items-center gap-1.5 font-medium">
                <span className="text-primary font-bold">الفصل {currentChapter.index}:</span>
                <span>{currentChapter.title}</span>
                <span className="text-gray-600">·</span>
                <span className="text-gray-300">صفحة {currentPage} من {TOTAL_PAGES}</span>
              </div>
            </div>
          </div>

          {/* Central Controls: Mode Toggle & TOC */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View Mode Switcher (Slides vs Native PDF) */}
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('slides')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'slides'
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                عرض الشرائح HD
              </button>
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                مستند PDF الأصلي
              </button>
            </div>

            {/* Table of Contents Button */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className={`h-9 px-3 rounded-xl border transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                isTocOpen
                  ? 'bg-primary/20 border-primary text-white'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-gray-200'
              }`}
              title="فهرس محتويات الملف التعريفي"
            >
              <List className="w-3.5 h-3.5 text-primary" />
              <span className="hidden md:inline">الفهرس</span>
            </button>

            {/* Zoom Controls (Slides mode only) */}
            {viewMode === 'slides' && (
              <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-xl px-1.5 py-0.5">
                <button
                  onClick={() => setZoomLevel(z => Math.max(75, z - 25))}
                  disabled={zoomLevel <= 75}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 cursor-pointer"
                  title="تصغير (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-gray-300 w-11 text-center font-bold">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => setZoomLevel(z => Math.min(175, z + 25))}
                  disabled={zoomLevel >= 175}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 cursor-pointer"
                  title="تكبير (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 100 && (
                  <button
                    onClick={() => setZoomLevel(100)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-primary hover:bg-white/5 cursor-pointer"
                    title="إعادة تعيين الحجم (0)"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Action CTAs: Download PDF, WhatsApp, Fullscreen, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* WhatsApp Consultation Button */}
            <button
              onClick={handleWhatsAppInquiry}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="استفسار مباشر عن محتوى هذا العرض"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>استفسار فني</span>
            </button>

            {/* Direct Download Button */}
            <a
              href={COMPANY_PROFILE_PDF_URL}
              download="IDEA_Makers_Company_Profile_POS_Proposal.pdf"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-md shadow-primary/25 cursor-pointer shrink-0"
              title="تحميل الملف التعريفي كملف PDF رسمي (3.8 MB)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">تحميل PDF</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="w-9 h-9 hidden md:flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 text-gray-300 hover:text-white transition-all cursor-pointer"
              title={isFullscreen ? 'الخروج من ملء الشاشة' : 'ملء الشاشة'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-red-400 transition-all cursor-pointer"
              title="إغلاق (Esc)"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ========================================================
            MAIN PRESENTATION WORKSPACE
            ======================================================== */}
        <div className="flex-1 relative flex overflow-hidden">
          {/* Slide / PDF Main Stage */}
          <main className="flex-1 relative flex flex-col items-center justify-center overflow-auto p-2 sm:p-4 md:p-6 bg-[#040407]">
            {viewMode === 'slides' ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Previous Page Arrow (Left in RTL is Next / Right is Prev) */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage <= 1}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#0d0d16]/90 border border-white/15 text-white hover:border-primary hover:bg-primary/20 flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none shadow-2xl backdrop-blur-md cursor-pointer"
                  title="الصفحة السابقة (سهم يمين)"
                  aria-label="الصفحة السابقة"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Next Page Arrow */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage >= TOTAL_PAGES}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#0d0d16]/90 border border-white/15 text-white hover:border-primary hover:bg-primary/20 flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none shadow-2xl backdrop-blur-md cursor-pointer"
                  title="الصفحة التالية (سهم يسار)"
                  aria-label="الصفحة التالية"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* High-Resolution Presentation Slide Canvas */}
                <div 
                  className="max-w-full max-h-full flex items-center justify-center overflow-auto py-2 transition-transform duration-200"
                  style={{
                    transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : 'none',
                    transformOrigin: 'center center'
                  }}
                >
                  <div className="relative group rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-[#0d0d18] max-w-[1240px] max-h-[calc(100vh-230px)] aspect-[16/10] flex items-center justify-center">
                    <img
                      src={currentSlide.image}
                      alt={`صفحة ${currentSlide.pageNumber}: ${currentSlide.title}`}
                      className="w-full h-full object-contain pointer-events-none select-none"
                      loading="eager"
                    />

                    {/* Subtle Glow Border */}
                    <div className="absolute inset-0 border border-primary/20 rounded-xl sm:rounded-2xl pointer-events-none" />
                  </div>
                </div>

                {/* Quick Slide Insight Pill / Banner */}
                {showInfoPanel && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-2xl w-[calc(100%-32px)] bg-[#0c0c14]/94 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:px-5 sm:py-3 shadow-2xl flex items-center justify-between gap-3 text-right"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <h4 className="text-xs sm:text-sm font-black text-white truncate">
                          {currentSlide.title}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-300 line-clamp-1">
                        {currentSlide.keyTakeaway}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleWhatsAppInquiry}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">طلب تفاصيل</span>
                      </button>
                      <button
                        onClick={() => setShowInfoPanel(false)}
                        className="text-gray-400 hover:text-white p-1"
                        title="إخفاء هذا الشريط"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Interactive PDF Document Reader (Zero Broken Plugins / 100% Reliable) */
              <div className="w-full h-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-[#07070f] shadow-2xl flex flex-col">
                {/* PDF Toolbar Header */}
                <div className="px-4 py-2.5 bg-[#0d0d1a] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-bold text-white truncate max-w-xs sm:max-w-md">
                      IDEA Makers POS — Technical & Commercial Proposal.pdf
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">(3.8 MB · 26 صفحة)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Zoom in/out */}
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                      <button
                        onClick={() => setZoomLevel(z => Math.max(75, z - 25))}
                        disabled={zoomLevel <= 75}
                        className="text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="تصغير"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-mono text-gray-200 px-1 font-bold">
                        {zoomLevel}%
                      </span>
                      <button
                        onClick={() => setZoomLevel(z => Math.min(150, z + 25))}
                        disabled={zoomLevel >= 150}
                        className="text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="تكبير"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <a
                      href={COMPANY_PROFILE_PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-colors cursor-pointer"
                      title="فتح الملف في تبويب مستقل"
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
                      <span>تحميل النسخة PDF</span>
                    </a>
                  </div>
                </div>

                {/* Document Scrollable Area: All 26 Pages rendered in High Definition */}
                <div
                  className="w-full flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-[#04040a]"
                >
                  {COMPANY_PROFILE_SLIDES.map(slide => (
                    <div
                      key={slide.pageNumber}
                      id={`modal-pdf-page-${slide.pageNumber}`}
                      className="flex flex-col items-center max-w-4xl mx-auto transition-transform"
                      style={{
                        transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : 'none',
                        transformOrigin: 'top center'
                      }}
                    >
                      {/* Page Header Tag */}
                      <div className="w-full flex items-center justify-between text-[11px] text-gray-400 py-1.5 px-2">
                        <span className="font-mono text-purple-300 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          صفحة {slide.pageNumber} من {TOTAL_PAGES}
                        </span>
                        <span className="text-gray-400 truncate max-w-md">{slide.title}</span>
                      </div>

                      {/* Page Canvas Container */}
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
            )}
          </main>

          {/* ========================================================
              SIDE DRAWER: TABLE OF CONTENTS (فهرس المحتويات)
              ======================================================== */}
          <AnimatePresence>
            {isTocOpen && (
              <motion.aside
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-[#090912]/98 backdrop-blur-2xl border-l border-white/10 z-40 flex flex-col shadow-2xl text-right"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-white">فهرس الملف التعريفي</h3>
                  </div>
                  <button
                    onClick={() => setIsTocOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {COMPANY_PROFILE_CHAPTERS.map(chapter => (
                    <div key={chapter.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-lg">
                        <span>{chapter.index}. {chapter.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          ص {chapter.startPage}-{chapter.endPage}
                        </span>
                      </div>
                      <div className="space-y-1 pr-2">
                        {COMPANY_PROFILE_SLIDES.filter(
                          s => s.pageNumber >= chapter.startPage && s.pageNumber <= chapter.endPage
                        ).map(slide => (
                          <button
                            key={slide.pageNumber}
                            onClick={() => goToPage(slide.pageNumber)}
                            className={`w-full text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              currentPage === slide.pageNumber
                                ? 'bg-primary/20 border border-primary/40 text-white font-bold'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <span className="truncate ml-2">{slide.title}</span>
                            <span className="text-[10px] font-mono text-gray-500 shrink-0">
                              #{slide.pageNumber}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                  <a
                    href={COMPANY_PROFILE_PDF_URL}
                    download="IDEA_Makers_Company_Profile_POS_Proposal.pdf"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-primary" />
                    <span>تحميل النسخة الكاملة PDF (3.8 MB)</span>
                  </a>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================
            BOTTOM THUMBNAIL CAROUSEL & CHAPTER PILLS
            ======================================================== */}
        <footer className="h-24 sm:h-28 border-t border-white/[0.08] bg-[#07070e] flex flex-col justify-center px-3 sm:px-6 shrink-0 z-20">
          {/* Quick Chapter Selector Pills */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
            {COMPANY_PROFILE_CHAPTERS.map(ch => {
              const isActive = currentPage >= ch.startPage && currentPage <= ch.endPage;
              return (
                <button
                  key={ch.id}
                  onClick={() => goToPage(ch.startPage)}
                  className={`px-2.5 py-0.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary/20 text-purple-300 border border-primary/40 font-bold'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {ch.index}. {ch.title}
                </button>
              );
            })}
          </div>

          {/* Filmstrip Carousel of 26 Thumbnails */}
          <div
            ref={thumbnailsRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
          >
            {COMPANY_PROFILE_SLIDES.map(slide => {
              const isActive = slide.pageNumber === currentPage;
              return (
                <button
                  key={slide.pageNumber}
                  data-page={slide.pageNumber}
                  onClick={() => goToPage(slide.pageNumber)}
                  className={`relative shrink-0 rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'w-16 h-10 sm:w-20 sm:h-12 border-primary ring-2 ring-primary/40 scale-105 shadow-lg shadow-primary/30 z-10'
                      : 'w-14 h-9 sm:w-16 sm:h-10 border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                  title={`صفحة ${slide.pageNumber}: ${slide.title}`}
                >
                  <img
                    src={slide.image}
                    alt={`صورة مصغرة صفحة ${slide.pageNumber}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute bottom-0 right-0 px-1 text-[9px] font-mono font-bold rounded-tl ${
                      isActive ? 'bg-primary text-white' : 'bg-black/70 text-gray-300'
                    }`}
                  >
                    {slide.pageNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
export default CompanyProfileViewerModal;
