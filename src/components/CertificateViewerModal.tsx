import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Copy, 
  Check, 
  Maximize2,
  Loader2,
  AlertCircle,
  Globe,
  Sparkles
} from 'lucide-react';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
  recipientName?: string;
  courseName?: string;
  credentialId?: string;
  credlyUrl?: string;
  verifyUrl?: string;
  verifyLabel?: string;
  issuerName?: string;
  currentLanguage?: 'ar' | 'en';
  onLanguageToggle?: (lang: 'ar' | 'en') => void;
  supportsBilingual?: boolean;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title = "شهادة الاعتماد الرسمية",
  recipientName = "إسلام عرفة (Eslam Arafa)",
  courseName = "مقدمة في حماية البنية التحتية الحيوية (CIP)",
  credentialId = "MN4A5aUoGg",
  credlyUrl,
  verifyUrl,
  verifyLabel,
  issuerName,
  currentLanguage = 'ar',
  onLanguageToggle,
  supportsBilingual = false
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMovedDuringDrag, setHasMovedDuringDrag] = useState<boolean>(false);
  
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Touch double-tap tracking for mobile
  const lastTapRef = useRef<number>(0);

  // Touch pinch tracking
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset zoom & pan when modal opens or closes or when image changes
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setImageLoading(true);
      setImageError(false);

      // Lock body scroll & prevent pull-to-refresh
      const originalOverflow = document.body.style.overflow;
      const originalOverscroll = document.body.style.overscrollBehavior;
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';

      // Focus close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.overscrollBehavior = originalOverscroll;
      };
    }
  }, [isOpen, imageUrl]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        handleReset();
      } else if (zoom > 1) {
        // Pan with arrow keys
        const panStep = 40;
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setPan(p => ({ ...p, x: p.x + panStep }));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setPan(p => ({ ...p, x: p.x - panStep }));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setPan(p => ({ ...p, y: p.y + panStep }));
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setPan(p => ({ ...p, y: p.y - panStep }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, zoom]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => {
      const next = Math.min(prev + 0.35, 3.5);
      return Math.round(next * 100) / 100;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return Math.round(next * 100) / 100;
    });
  }, []);

  const handleSetPresetZoom = useCallback((targetZoom: number) => {
    setZoom(targetZoom);
    if (targetZoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Double click / Double tap to toggle 1x and 2.2x
  const handleToggleZoom = useCallback(() => {
    if (zoom > 1.1) {
      handleReset();
    } else {
      setZoom(2.2);
    }
  }, [zoom, handleReset]);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom(prev => Math.min(Math.round((prev + 0.25) * 100) / 100, 3.5));
    } else {
      setZoom(prev => {
        const next = Math.max(Math.round((prev - 0.25) * 100) / 100, 1);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  }, []);

  // Mouse Pan/Drag Handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    if (zoom > 1) {
      e.preventDefault();
      setIsDragging(true);
      setHasMovedDuringDrag(false);
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      });
    }
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    setHasMovedDuringDrag(true);
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, zoom, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch Handlers for mobile pan, double-tap & pinch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Check for double tap on touch screens
    const now = Date.now();
    if (e.touches.length === 1) {
      if (now - lastTapRef.current < 300) {
        // Double tap detected!
        e.preventDefault();
        handleToggleZoom();
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;

      if (zoom > 1) {
        setIsDragging(true);
        setHasMovedDuringDrag(false);
        setDragStart({
          x: e.touches[0].clientX - pan.x,
          y: e.touches[0].clientY - pan.y
        });
      }
    } else if (e.touches.length === 2) {
      // Pinch to zoom start
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistRef.current = Math.hypot(dx, dy);
      touchStartZoomRef.current = zoom;
    }
  }, [zoom, pan, handleToggleZoom]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoom > 1) {
      setHasMovedDuringDrag(true);
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    } else if (e.touches.length === 2 && touchStartDistRef.current) {
      // Pinching
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const scaleDelta = dist / touchStartDistRef.current;
      const newZoom = Math.min(Math.max(touchStartZoomRef.current * scaleDelta, 1), 3.5);
      setZoom(Math.round(newZoom * 100) / 100);
      if (newZoom === 1) setPan({ x: 0, y: 0 });
    }
  }, [isDragging, zoom, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchStartDistRef.current = null;
  }, []);

  const handleCopyId = () => {
    if (!credentialId) return;
    navigator.clipboard?.writeText(credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !hasMovedDuringDrag && zoom === 1) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col bg-[#050508]/96 backdrop-blur-2xl select-none overflow-hidden touch-none"
          onClick={handleBackdropClick}
        >
          {/* ==========================================================
              TOP HEADER BAR (RESPONSIVE FOR ALL SCREEN SIZES)
              ========================================================== */}
          <div 
            className="w-full shrink-0 px-3 sm:px-6 py-2.5 sm:py-3.5 bg-black/60 border-b border-white/[0.08] backdrop-blur-md flex items-center justify-between gap-2 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Metadata */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </div>
              <div className="text-right min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-white truncate font-cairo">
                    {title}
                  </h3>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    رسمية وموثقة
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 truncate max-w-[200px] sm:max-w-md">
                  {courseName} — {recipientName}
                </p>
              </div>
            </div>

            {/* Quick Actions (Bilingual Toggle, Official Link & Close) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher inside modal (Crucial for mobile experience) */}
              {supportsBilingual && onLanguageToggle && (
                <div className="flex items-center p-0.5 bg-white/10 rounded-xl border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => onLanguageToggle('ar')}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer flex items-center gap-1 ${
                      currentLanguage === 'ar'
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-sm border border-white/20'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    title="عرض الشهادة باللغة العربية"
                  >
                    <span>🇸🇦</span>
                    <span>عربي</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageToggle('en')}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer flex items-center gap-1 ${
                      currentLanguage === 'en'
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-sm border border-white/20'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    title="View Certificate in English"
                  >
                    <span>🌐</span>
                    <span>English</span>
                  </button>
                </div>
              )}

              {/* Verify Link */}
              {(verifyUrl || credlyUrl) && (
                <a
                  href={verifyUrl || credlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary transition-all cursor-pointer"
                  title="التحقق المباشر من الجهة المانحة"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{verifyLabel || (verifyUrl?.includes('opswat') ? 'التحقق عبر OPSWAT' : 'التحقق عبر Credly')}</span>
                </a>
              )}

              {/* Close Button with high-contrast accessibility & min 44px tap target */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="إغلاق العارض (Esc)"
                title="إغلاق (Esc)"
                className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white transition-colors cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center gap-1 text-xs font-medium"
              >
                <X className="w-5 h-5" />
                <span className="hidden sm:inline text-xs text-gray-200">إغلاق</span>
              </button>
            </div>
          </div>

          {/* ==========================================================
              MAIN VIEWPORT (HIGH-RESOLUTION ZOOMABLE IMAGE CONTAINER)
              ========================================================== */}
          <div 
            ref={containerRef}
            className={`relative flex-1 w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4 md:p-6 ${
              zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
            style={{ touchAction: zoom > 1 ? 'none' : 'pan-x pan-y' }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Ambient subtle background glow */}
            <div 
              className="absolute w-[350px] sm:w-[500px] h-[250px] sm:h-[350px] rounded-full pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                filter: 'blur(80px)'
              }}
            />

            {/* Loading Spinner */}
            {imageLoading && !imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium">جاري تحميل الشهادة بدقة فائقة...</span>
              </div>
            )}

            {/* Error Message with fallback action */}
            {imageError && (
              <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/30 text-center max-w-md z-10">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">تعذر تحميل صورة الشهادة</h4>
                <p className="text-xs text-gray-300 mb-4">يمكنك التحقق من بيانات الشهادة وسجل الاعتماد مباشرة عبر الرابط الرسمي الموثق.</p>
                {(verifyUrl || credlyUrl) && (
                  <a 
                    href={verifyUrl || credlyUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
                  >
                    <span>{verifyLabel || (verifyUrl?.includes('opswat') ? 'فتح الشهادة عبر OPSWAT Academy' : 'فتح الشهادة عبر Credly')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* High-Resolution Certificate Image with Touch & Desktop Pan/Zoom */}
            <div 
              className="relative flex items-center justify-center transition-transform duration-75 ease-out select-none"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transformOrigin: 'center center',
                willChange: 'transform'
              }}
              onDoubleClick={handleToggleZoom}
            >
              <img
                src={imageUrl}
                alt={title || "شهادة الاعتماد الرسمية - إسلام عرفة"}
                className={`max-w-[calc(100vw-20px)] max-h-[calc(100dvh-140px)] sm:max-w-[calc(100vw-64px)] sm:max-h-[calc(100dvh-160px)] md:max-w-[calc(100vw-100px)] md:max-h-[calc(100dvh-170px)] object-contain rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                }}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                draggable={false}
              />
            </div>

            {/* Gesture Hint for Mobile and Desktop when at 1x */}
            {zoom === 1 && !imageLoading && !imageError && (
              <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 pointer-events-none opacity-70 text-[10px] sm:text-xs text-gray-300 bg-black/75 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                <span>انقر نقراً مزدوجاً أو اسحب للتكبير والتحريك (Pinch to Zoom)</span>
              </div>
            )}
          </div>

          {/* ==========================================================
              BOTTOM FLOATING CONTROL DOCK (OPTIMIZED FOR MOBILE THUMBS)
              ========================================================== */}
          <div 
            className="w-full shrink-0 px-3 sm:px-6 py-2 sm:py-3 bg-black/85 border-t border-white/[0.08] backdrop-blur-xl flex flex-wrap items-center justify-between gap-2 z-30"
            onClick={(e) => e.stopPropagation()}
            style={{
              paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom, 0.6rem))'
            }}
          >
            {/* Left: Credential ID & Quick Copy Button */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="hidden sm:inline">معرّف الاعتماد (ID):</span>
              <code className="text-[11px] sm:text-xs font-mono text-gray-200 bg-white/10 px-2 py-0.5 rounded border border-white/10 max-w-[130px] sm:max-w-none truncate">
                {credentialId}
              </code>
              <button
                onClick={handleCopyId}
                className="p-1 sm:p-1.5 rounded-lg hover:bg-white/15 active:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="نسخ معرّف الاعتماد"
                aria-label="نسخ معرّف الاعتماد"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {copied && <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">تم النسخ!</span>}
            </div>

            {/* Center: Full-Control Zoom Toolbar */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-[#12111a] border border-white/10 rounded-2xl p-1 shadow-xl">
              {/* Zoom Out Button */}
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                aria-label="تصغير الشهادة (-)"
                title="تصغير (-)"
                className="p-1.5 sm:p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Current Zoom Level / Reset Toggle */}
              <button
                onClick={handleReset}
                title="إعادة للوضع الطبيعي 100%"
                aria-label="إعادة للوضع الطبيعي"
                className="px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-bold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              >
                {Math.round(zoom * 100)}%
              </button>

              {/* Zoom In Button */}
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3.5}
                aria-label="تكبير الشهادة (+)"
                title="تكبير (+)"
                className="p-1.5 sm:p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

              {/* Quick Presets for Mobile: 2x zoom toggle & Fit */}
              <button
                onClick={() => handleSetPresetZoom(2)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold hidden sm:inline-block transition-colors ${
                  zoom === 2 ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title="تكبير 200%"
              >
                2X
              </button>

              <button
                onClick={handleReset}
                disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
                aria-label="ملائمة الشاشة (Reset)"
                title="ملائمة الشاشة"
                className="p-1.5 sm:p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Right: View Raw Image & Mobile Official Verify Link */}
            <div className="flex items-center gap-1.5">
              {(verifyUrl || credlyUrl) && (
                <a
                  href={verifyUrl || credlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:hidden px-2.5 py-1 rounded-xl bg-primary/20 text-primary border border-primary/30 text-[11px] font-bold flex items-center gap-1"
                >
                  <span>التحقق</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
                title="عرض الصورة الأصلية بالكامل في نافذة جديدة"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs">الصورة الأصلية</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateViewerModal;
