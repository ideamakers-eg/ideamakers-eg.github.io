import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO_ARTICLES, SeoArticle } from '../data/seoPillars';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ChevronRight, 
  ChevronDown,
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  Share2,
  Tag,
  Search,
  X,
  Filter,
  Check,
  Bookmark,
  TrendingUp,
  ShieldCheck,
  SlidersHorizontal,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  FileText,
  ListOrdered,
  Maximize2
} from 'lucide-react';

// Genuine project visual assets mapped contextually to article categories
import heroSmartCashier from '../assets/images/hero_smart_cashier_1791830336913.jpg';
import heroRevenueAnalytics from '../assets/images/hero_revenue_analytics_1791830360334.jpg';
import heroDeviceSession from '../assets/images/hero_device_session_1791830324822.jpg';
import heroSalesInventory from '../assets/images/hero_sales_inventory_1791830349922.jpg';
import ps5DualSense from '../assets/images/ps5_dualsense_cinematic_1791901469417.jpg';
import ps5LoungeAtmosphere from '../assets/images/ps5_lounge_atmosphere_1791828455267.jpg';

const ARTICLE_IMAGES: Record<string, string> = {
  'how-to-choose-playstation-pos': heroSmartCashier,
  'calculate-gaming-lounge-profit': heroRevenueAnalytics,
  'track-playstation-session-time': heroDeviceSession,
  'manage-lounge-cafe-inventory': heroSalesInventory,
  'offline-vs-cloud-pos': ps5DualSense,
  'shift-handover-cashier-audit': ps5LoungeAtmosphere,
  'traditional-cashier-vs-gaming-pos': heroSmartCashier,
  'lounge-setup-and-operation-costs': heroRevenueAnalytics,
  'break-even-calculator-playstation-lounge': heroRevenueAnalytics,
  'prevent-windows-clock-tampering': ps5DualSense,
  'lounge-cafe-beverage-profit-system': heroSalesInventory,
  'shift-handover-cashier-protocol': ps5LoungeAtmosphere,
};

const ARTICLE_ALIASES: Record<string, string> = {
  'best-playstation-pos-software-guide': 'how-to-choose-playstation-pos',
  'eliminate-time-fraud-lounge-sessions': 'track-playstation-session-time',
  'cafe-snack-inventory-control-pos': 'manage-lounge-cafe-inventory',
  'offline-vs-cloud-playstation-system': 'offline-vs-cloud-pos',
  'shift-handover-cashier-accounting': 'shift-handover-cashier-audit',
  'increase-lounge-profits-hourly-pricing': 'calculate-gaming-lounge-profit',
};

interface GuidesHubViewProps {
  activeSlug?: string | null;
  onNavigateHome: () => void;
  onNavigateArticle: (slug: string) => void;
  onNavigateHub: () => void;
  onOpenTrialForm: () => void;
}

type FontSize = 'normal' | 'medium' | 'large';
type SortOption = 'newest' | 'read-time' | 'alphabetical';

// Arabic text normalizer for accurate search matching
function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[إأآا]/g, 'ا')
    .replace(/[ة]/g, 'ه')
    .replace(/[ى]/g, 'ي')
    .replace(/[ؤئ]/g, 'ء')
    .replace(/[\u064B-\u065F]/g, '') // remove harakat/tashkeel
    .replace(/[^\w\s\u0600-\u06FF]/gi, ' ') // replace punctuation with spaces
    .replace(/\s+/g, ' ')
    .trim();
}

export const GuidesHubView: React.FC<GuidesHubViewProps> = ({
  activeSlug,
  onNavigateHome,
  onNavigateArticle,
  onNavigateHub,
  onOpenTrialForm,
}) => {
  const WHATSAPP_NUMBER = '201121778205';

  // Hub directory state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Single article reading state
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  const resolvedSlug = activeSlug ? (ARTICLE_ALIASES[activeSlug] || activeSlug) : null;
  const article = resolvedSlug ? SEO_ARTICLES[resolvedSlug] : null;
  const articleList = useMemo(() => Object.values(SEO_ARTICLES), []);

  // Sync Document Title, Meta Tags, Canonical URL & OpenGraph
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ideamakers-eg.github.io';

    if (article) {
      document.title = article.seoTitle;
      
      const updateMeta = (name: string, content: string, isProperty = false) => {
        const attr = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let el = document.querySelector(attr);
        if (!el) {
          el = document.createElement('meta');
          if (isProperty) el.setAttribute('property', name);
          else el.setAttribute('name', name);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      updateMeta('description', article.metaDescription);
      updateMeta('og:title', article.seoTitle, true);
      updateMeta('og:description', article.metaDescription, true);
      updateMeta('og:url', `${origin}${article.path}`, true);
      updateMeta('og:type', 'article', true);
      updateMeta('og:site_name', 'IDEA MAKERS PlayStation POS', true);
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', article.seoTitle);
      updateMeta('twitter:description', article.metaDescription);

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `${origin}${article.path}`);
      }
    } else {
      document.title = 'دليل ومقالات إدارة صالات البلايستيشن في 2026 | IDEA MAKERS';
      
      const updateMeta = (name: string, content: string, isProperty = false) => {
        const attr = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let el = document.querySelector(attr);
        if (el) el.setAttribute('content', content);
      };

      const hubDesc = 'المكتبة المعرفية والأدلة التشغيلية المتخصصة لأصحاب صالات البلايستيشن: كيفية اختيار برنامج الكاشير، حساب الأرباح، إدارة البوفيه، ومراقبة الشيفتات.';
      updateMeta('description', hubDesc);
      updateMeta('og:title', 'دليل ومقالات إدارة صالات البلايستيشن في 2026 | IDEA MAKERS', true);
      updateMeta('og:description', hubDesc, true);
      updateMeta('og:url', `${origin}/guides`, true);
      updateMeta('og:type', 'website', true);

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `${origin}/guides`);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article, activeSlug]);

  // Track scroll progress for reading progress bar
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }

      // Check current active section for TOC
      const headings = article.content.map((_, idx) => document.getElementById(`section-${idx + 1}`));
      const scrollPosition = window.scrollY + 180;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveHeadingId(`section-${i + 1}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  // Derive categories with real article counts
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = { all: articleList.length };
    articleList.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articleList]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articleList.map((a) => a.category)));
    return ['all', ...cats];
  }, [articleList]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...articleList];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeArabic(searchQuery);
      result = result.filter((a) => {
        const titleNorm = normalizeArabic(a.title);
        const h1Norm = normalizeArabic(a.h1);
        const summaryNorm = normalizeArabic(a.summary);
        const categoryNorm = normalizeArabic(a.category);
        const keywordsNorm = a.keywords.map(normalizeArabic).join(' ');
        const contentNorm = a.content.map((s) => normalizeArabic(s.heading + ' ' + s.paragraphs.join(' '))).join(' ');

        return (
          titleNorm.includes(normalizedQuery) ||
          h1Norm.includes(normalizedQuery) ||
          summaryNorm.includes(normalizedQuery) ||
          categoryNorm.includes(normalizedQuery) ||
          keywordsNorm.includes(normalizedQuery) ||
          contentNorm.includes(normalizedQuery)
        );
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'read-time') {
        const timeA = parseInt(a.readTime, 10) || 5;
        const timeB = parseInt(b.readTime, 10) || 5;
        return timeA - timeB;
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title, 'ar');
      }
      // default newest: stable order by index or date
      return 0;
    });

    return result;
  }, [articleList, selectedCategory, searchQuery, sortBy]);

  // Copy Link with Feedback Toast
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Font size classes for Arabic body text
  const bodyTextSizeClass = useMemo(() => {
    switch (fontSize) {
      case 'medium':
        return 'text-[18px] sm:text-[20px] leading-[2.0] sm:leading-[2.1]';
      case 'large':
        return 'text-[20px] sm:text-[22px] leading-[2.1] sm:leading-[2.2]';
      case 'normal':
      default:
        return 'text-[16px] sm:text-[18px] leading-[1.85] sm:leading-[1.95]';
    }
  }, [fontSize]);

  // =========================================================================
  // VIEW 1: SINGLE ARTICLE DETAIL VIEW (/guides/[slug])
  // =========================================================================
  if (article) {
    const articleImage = ARTICLE_IMAGES[article.slug] || heroSmartCashier;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `مرحباً فريق IDEA MAKERS، قرأت مقال (${article.title}) وأود استشارة مهندسيكم بخصوص النظام الأنسب لصالي.`
    )}`;

    const tocItems = article.content.map((sec, idx) => ({
      id: `section-${idx + 1}`,
      title: sec.heading
    }));

    return (
      <article className="min-h-screen bg-[#07060b] text-gray-100 pt-24 sm:pt-28 pb-24 relative selection:bg-primary/30 selection:text-white">
        {/* Subtle Reading Progress Indicator at top */}
        <div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-emerald-400 z-[100] transition-all duration-150 origin-right"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        {/* Structured Data: Schema.org Article & Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.h1,
              description: article.metaDescription,
              image: `https://ideamakers-eg.github.io${articleImage}`,
              author: {
                '@type': 'Organization',
                name: 'IDEA MAKERS'
              },
              publisher: {
                '@type': 'Organization',
                name: 'IDEA MAKERS',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://ideamakers-eg.github.io/assets/images/ps5_dualsense_cinematic_1791901469417.jpg'
                }
              },
              datePublished: article.publishedDate,
              dateModified: article.publishedDate,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://ideamakers-eg.github.io${article.path}`
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'الرئيسية',
                  item: 'https://ideamakers-eg.github.io/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'دليل صالات البلايستيشن',
                  item: 'https://ideamakers-eg.github.io/guides'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: `https://ideamakers-eg.github.io${article.path}`
                }
              ]
            })
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Top Breadcrumb Navigation */}
          <nav aria-label="مسار التصفح" className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <button 
              onClick={onNavigateHome}
              className="hover:text-primary transition-colors cursor-pointer font-medium"
            >
              الرئيسية
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 rotate-180 shrink-0" />
            <button 
              onClick={onNavigateHub}
              className="hover:text-primary transition-colors cursor-pointer font-medium"
            >
              دليل ومقالات الصالات
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 rotate-180 shrink-0" />
            <span className="text-primary-light font-bold truncate max-w-[260px] sm:max-w-md">{article.title}</span>
          </nav>

          {/* Article Header & Editorial Title */}
          <header className="mb-8 sm:mb-12 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.3] mb-6 tracking-tight font-cairo">
              {article.h1}
            </h1>

            {/* Executive Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border-r-4 border-primary border-y border-l border-white/[0.06] text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1.5">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span>الموجز التنفيذي للدليل</span>
              </div>
              <p className="font-light leading-relaxed text-gray-300">
                {article.summary}
              </p>
            </div>

            {/* Editorial Metadata Bar & Reading Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between py-3.5 border-y border-white/10 text-xs text-gray-400 gap-4">
              {/* Left: Author & Date Details */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium">{article.author}</span>
                </span>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>تحديث: {article.publishedDate}</span>
                </span>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="flex items-center gap-1.5 text-amber-300/90 font-mono font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Right: Reading Utility Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                {/* Font Size Adjuster */}
                <div className="flex items-center p-0.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      fontSize === 'normal' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="حجم الخط الطبيعي"
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('medium')}
                    className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      fontSize === 'medium' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="حجم خط متوسط"
                  >
                    A+
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      fontSize === 'large' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="حجم خط كبير"
                  >
                    A++
                  </button>
                </div>

                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-xs text-gray-300 transition-colors cursor-pointer"
                  title="نسخ رابط المقال"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'تم النسخ!' : 'مشاركة'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Authentic Image Banner */}
          <div className="mb-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative aspect-[16/8] sm:aspect-[21/9] max-h-[360px]">
            <img
              src={articleImage}
              alt={article.title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07060b] via-transparent to-transparent opacity-80" />
          </div>

          {/* Main Grid: Reading Canvas (Center/Right) + Sticky Table of Contents (Left) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* =========================================================
                READING CANVAS (720px - 760px optimized container)
                ========================================================= */}
            <main className="lg:col-span-8 space-y-10 text-right">
              
              {/* Mobile Table of Contents Accordion */}
              <div className="lg:hidden p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
                <button
                  type="button"
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-white cursor-pointer"
                  aria-expanded={isMobileTocOpen}
                >
                  <span className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-primary" />
                    <span>فهرس محتويات الدليل ({tocItems.length} أقسام رئيسية)</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileTocOpen && (
                  <nav aria-label="فهرس المحتويات للجوال" className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    {tocItems.map((item, idx) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          setIsMobileTocOpen(false);
                        }}
                        className={`block text-xs py-1 transition-colors ${
                          activeHeadingId === item.id ? 'text-primary font-bold' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <span className="text-gray-500 font-mono ml-1.5">{idx + 1}.</span>
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </nav>
                )}
              </div>

              {/* Render Article Content Sections */}
              <div className="space-y-12">
                {article.content.map((sec, idx) => {
                  const sectionId = `section-${idx + 1}`;
                  return (
                    <section key={idx} id={sectionId} className="space-y-5 scroll-mt-28">
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight border-r-4 border-primary pr-3.5 font-cairo leading-snug">
                        {sec.heading}
                      </h2>

                      {sec.paragraphs.map((p, pIdx) => (
                        <p 
                          key={pIdx} 
                          className={`${bodyTextSizeClass} text-gray-200 font-normal`}
                        >
                          {p}
                        </p>
                      ))}

                      {/* Bullet Checkpoints if present */}
                      {sec.bulletList && sec.bulletList.length > 0 && (
                        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                          <span className="text-xs font-bold text-gray-400 block mb-1">نقاط التطبيق العملية:</span>
                          <ul className="space-y-2.5">
                            {sec.bulletList.map((item, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-200">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Callout Box if present */}
                      {sec.callout && (
                        <aside className="p-4 sm:p-5 rounded-2xl bg-purple-950/25 border border-primary/30 text-purple-100 text-sm sm:text-base leading-relaxed my-5 shadow-lg">
                          <strong className="block text-white font-bold text-base mb-1.5 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span>{sec.callout.title}</span>
                          </strong>
                          <p className="text-gray-200 leading-relaxed font-light">
                            {sec.callout.text}
                          </p>
                        </aside>
                      )}
                    </section>
                  );
                })}
              </div>

              {/* Key Takeaway / Conclusion Box */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/30 via-black/40 to-purple-950/30 border border-primary/25 text-right mt-12 shadow-xl">
                <h3 className="font-bold text-base sm:text-lg text-primary mb-2 flex items-center gap-2 font-cairo">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>خلاصة الدليل ورؤية IDEA MAKERS:</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                  {article.conclusion}
                </p>
              </div>

              {/* Ethical Contextual CTA Box */}
              <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#120f1f] to-[#0a0812] border border-primary/30 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-44 h-44 bg-primary/15 blur-[60px] rounded-full pointer-events-none" />
                
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 font-cairo">
                  {article.ctaHeading}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
                  احمِ أموال صالتك من التسريب واختبر دقة برنامج كاشير البلايستيشن IDEA MAKERS مجاناً لمدة 72 ساعة بدون أي التزام.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenTrialForm}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{article.ctaText}</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>استشارة تشغيلية عبر واتساب</span>
                  </a>
                </div>
              </div>

              {/* Related Guides Links */}
              {article.relatedGuides && article.relatedGuides.length > 0 && (
                <div className="mt-14 pt-8 border-t border-white/10 text-right">
                  <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span>أدلة ومقالات ذات صلة ننصح بقراءتها:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {article.relatedGuides.map(relSlug => {
                      const rel = SEO_ARTICLES[relSlug];
                      if (!rel) return null;
                      const relImg = ARTICLE_IMAGES[relSlug] || heroSmartCashier;
                      return (
                        <button
                          key={relSlug}
                          onClick={() => onNavigateArticle(relSlug)}
                          className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-primary/[0.03] transition-all text-right cursor-pointer flex items-center gap-3 group"
                        >
                          <img
                            src={relImg}
                            alt={rel.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] text-primary font-bold block mb-0.5">{rel.category}</span>
                            <span className="text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors block line-clamp-2">
                              {rel.title}
                            </span>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-primary transition-transform group-hover:-translate-x-1 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Back Navigation Bar */}
              <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-gray-400">
                <button
                  type="button"
                  onClick={onNavigateHub}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>العودة لكافة مقالات الدليل</span>
                </button>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                >
                  <span>الصفحة الرئيسية لـ IDEA MAKERS</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </main>

            {/* =========================================================
                DESKTOP STICKY SIDEBAR: TABLE OF CONTENTS & QUICK ACTIONS
                ========================================================= */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
              
              {/* Table of Contents Box */}
              <div className="p-5 rounded-2xl bg-[#0d0c14] border border-white/10 shadow-xl text-right">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-primary" />
                    <span>فهرس أقسام الدليل</span>
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {Math.round(scrollProgress)}% تم
                  </span>
                </div>

                <nav aria-label="فهرس المحتويات" className="space-y-2">
                  {tocItems.map((item, idx) => {
                    const isActive = activeHeadingId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`block text-xs py-1.5 px-2.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary/20 text-white font-bold border-r-2 border-primary'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                        }`}
                      >
                        <span className="text-gray-500 font-mono ml-1.5">{idx + 1}.</span>
                        <span>{item.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Advisory Assistance Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-[#0e0c16] border border-emerald-500/20 text-right space-y-3">
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold inline-block">
                  دعم واستشارات مجانية
                </span>
                <h5 className="text-sm font-bold text-white">هل لديك استفسار حول إدارة صالتك؟</h5>
                <p className="text-xs text-gray-400 leading-relaxed">
                  تحدث مباشرة مع مهندسي تطوير نظام IDEA MAKERS للحصول على استشارة فنية مخصصة لصالتك.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب مباشرة</span>
                </a>
              </div>

              {/* Return to Guides Link */}
              <button
                type="button"
                onClick={onNavigateHub}
                className="w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span>تصفح كافة مقالات المكتبة</span>
              </button>
            </aside>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // VIEW 2: GUIDES HUB DIRECTORY VIEW (/guides)
  // =========================================================================
  const featuredArticle = articleList[0]; // 'how-to-choose-playstation-pos'
  const isSearchActive = searchQuery.trim().length > 0 || selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-[#07060b] text-white pt-24 sm:pt-28 pb-24 px-4 sm:px-6 selection:bg-primary/30 selection:text-white">
      {/* Schema.org CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'دليل ومقالات إدارة صالات البلايستيشن في 2026',
            description: 'المكتبة المعرفية المتخصصة لأصحاب ومشغلي صالات الألعاب في مصر والخليج العربي.',
            url: 'https://ideamakers-eg.github.io/guides',
            publisher: {
              '@type': 'Organization',
              name: 'IDEA MAKERS'
            }
          })
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Top Breadcrumb Navigation */}
        <nav aria-label="مسار التصفح" className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <button 
            type="button"
            onClick={onNavigateHome}
            className="hover:text-primary transition-colors cursor-pointer font-medium"
          >
            الرئيسية
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 rotate-180" />
          <span className="text-primary font-bold">دليل صالات البلايستيشن</span>
        </nav>

        {/* Editorial Hub Hero Section */}
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>المكتبة المعرفية والأدلة التشغيلية لرواد الصالات</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.25] tracking-tight font-cairo">
            دليل وأسرار إدارة صالات البلايستيشن في 2026
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            مقالات وأدلة عملية كُتبت بعقلية هندسية لمساعدتك على سد ثغرات تلاعب العمال، احتساب أوقات اللعب بالثانية، جرد البوفيه بدقة، ومضاعفة أرباح صالتك.
          </p>
        </header>

        {/* =================================================================
            LIVE SEARCH & FILTER CONTROLS BAR
            ================================================================= */}
        <div className="mb-10 max-w-3xl mx-auto space-y-4">
          {/* Functional Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأدلة (مثلاً: حساب الوقت، بوفيه، أرباح، أوفلاين، شيفتات...)"
              className="w-full pr-12 pl-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-primary focus:bg-white/[0.06] text-white placeholder-gray-500 text-sm focus:outline-none transition-all shadow-inner"
              aria-label="البحث في مقالات وأدلة الدليل"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-2">
            {categories.map((cat) => {
              const count = categoryStats[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md shadow-primary/30 border border-primary/50'
                      : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
                  }`}
                >
                  <span>{cat === 'all' ? 'جميع المقالات' : cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Summary & Sorting Bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 px-1 border-t border-white/5">
            <span className="font-medium">
              تم العثور على <strong className="text-white">{filteredArticles.length}</strong> دليل متخصص
            </span>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-gray-500">الترتيب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-gray-300 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="newest">الأحدث</option>
                <option value="read-time">الأسرع قراءة</option>
                <option value="alphabetical">الترتيب الأبجدي</option>
              </select>
            </div>
          </div>
        </div>

        {/* =================================================================
            FEATURED ARTICLE SPOTLIGHT (Shown when no active search)
            ================================================================= */}
        {!isSearchActive && featuredArticle && (
          <div className="mb-12">
            <div 
              onClick={() => onNavigateArticle(featuredArticle.slug)}
              className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/30 via-white/[0.02] to-black/60 border border-primary/30 hover:border-primary/60 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigateArticle(featuredArticle.slug);
                }
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left (RTL: image column) */}
                <div className="lg:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 relative order-2 lg:order-1">
                  <img
                    src={ARTICLE_IMAGES[featuredArticle.slug] || heroSmartCashier}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-primary text-white shadow-md">
                    الدليل الأكثر قراءة
                  </div>
                </div>

                {/* Right (RTL: content column) */}
                <div className="lg:col-span-7 text-right space-y-3.5 order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/15 text-primary font-bold border border-primary/25">
                      {featuredArticle.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-amber-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredArticle.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-primary transition-colors font-cairo leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light line-clamp-3">
                    {featuredArticle.summary}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-primary group-hover:text-primary-light">
                    <span>قراءة الدليل الشامل</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            ARTICLE DISCOVERY GRID
            ================================================================= */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => {
              const artImg = ARTICLE_IMAGES[art.slug] || heroSmartCashier;
              return (
                <div
                  key={art.slug}
                  onClick={() => onNavigateArticle(art.slug)}
                  className="rounded-2xl sm:rounded-3xl bg-[#0c0b12] border border-white/[0.08] hover:border-primary/40 hover:bg-primary/[0.02] transition-all cursor-pointer flex flex-col justify-between group shadow-xl overflow-hidden"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onNavigateArticle(art.slug);
                    }
                  }}
                >
                  {/* Article Thumbnail Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50 border-b border-white/5">
                    <img
                      src={artImg}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-black/75 text-primary border border-primary/30 backdrop-blur-md">
                      {art.category}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-right">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono mb-2.5">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{art.readTime}</span>
                        <span>•</span>
                        <span>{art.publishedDate}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors leading-snug mb-2.5 font-cairo">
                        {art.title}
                      </h3>

                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4 font-light">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-primary">
                      <span>اقرأ الدليل ↗</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 max-w-lg mx-auto space-y-4">
            <Search className="w-10 h-10 text-gray-500 mx-auto" />
            <h3 className="text-base font-bold text-white">لا توجد أدلة مطابقة لبحثك</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              لم نعثر على مقالات تطابق كلمة البحث: "{searchQuery}". جرّب كلمات أكثر عمومية أو اختر أحد التصنيفات أعلاه.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {['كاشير', 'أرباح', 'بوفيه', 'وقت', 'شيفتات'].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold cursor-pointer"
            >
              عرض كافة المقالات
            </button>
          </div>
        )}

        {/* Bottom Conversion Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-primary/10 to-purple-950/40 border border-primary/25 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2 font-cairo">
            هل ترغب في تطبيق هذه الحلول داخل صالتك اليوم؟
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
            وفّر هدر أوقات اللعب والمخزون، واختبر نظام IDEA MAKERS برخصة تجريبية كاملة لمدة 72 ساعة داخل صالتك.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenTrialForm}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>طلب التجربة المجانية 72 ساعة</span>
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>العودة للصفحة الرئيسية لـ IDEA MAKERS</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesHubView;
