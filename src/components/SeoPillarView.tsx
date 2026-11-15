import React, { useEffect } from 'react';
import { SeoPillarPage, SEO_PILLAR_PAGES } from '../data/seoPillars';
import { 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface SeoPillarViewProps {
  page: SeoPillarPage;
  onNavigateHome: () => void;
  onNavigatePillar: (slug: string) => void;
  onOpenTrialForm: () => void;
}

export const SeoPillarView: React.FC<SeoPillarViewProps> = ({
  page,
  onNavigateHome,
  onNavigatePillar,
  onOpenTrialForm,
}) => {
  const WHATSAPP_NUMBER = '201121778205';

  // Dynamic Document Title and Meta updates
  useEffect(() => {
    document.title = page.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', page.metaDescription);
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://ideamakers-eg.github.io${page.path}`);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(page.whatsappMessage)}`;

  const isEn = page.lang === 'en';

  return (
    <article 
      dir={isEn ? "ltr" : "rtl"} 
      className={`min-h-screen bg-[#07070c] text-white pt-24 sm:pt-28 pb-20 px-3.5 sm:px-6 ${isEn ? "font-sans" : ""}`}
    >
      {/* Dynamic Breadcrumbs Schema */}
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
                name: isEn ? 'Home' : 'الرئيسية',
                item: 'https://ideamakers-eg.github.io/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: page.title,
                item: `https://ideamakers-eg.github.io${page.path}`
              }
            ]
          })
        }}
      />

      {/* Dynamic FAQ Schema if present */}
      {page.faqs && page.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: page.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a
                }
              }))
            })
          }}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation Bar */}
        <nav aria-label={isEn ? "Breadcrumb navigation" : "مسار التصفح"} className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
          <button 
            onClick={onNavigateHome}
            className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1 font-semibold"
          >
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronRight className={`w-3.5 h-3.5 text-gray-600 ${isEn ? '' : 'rotate-180'}`} />
          <span className="text-primary font-bold">{page.title}</span>
        </nav>

        {/* Header Hero Pill & Title */}
        <header className={`mb-10 ${isEn ? 'text-left' : 'text-right'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{page.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            {page.h1}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            {page.subtitle}
          </p>

          <div className="flex items-center justify-between py-3 border-y border-white/10 text-xs text-gray-400 flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{isEn ? `Last updated: ${page.lastUpdated}` : `آخر تحديث: ${page.lastUpdated}`}</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEn ? 'Verified Architecture' : 'محتوى تقني معتمد'}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-xs font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isEn ? 'Quick Inquiry' : 'استشارة سريعة'}</span>
              </a>
            </div>
          </div>
        </header>

        {/* Key Takeaways / Summary Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-900/10 to-transparent border border-primary/20 backdrop-blur-md mb-10">
          <h2 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{isEn ? 'Technical Solution & Operational Value:' : 'ملخص الحل التقني والقيمة التشغيلية:'}</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            {page.summary}
          </p>
        </div>

        {/* Content Sections */}
        <div className={`space-y-10 ${isEn ? 'text-left' : 'text-right'}`}>
          {page.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className={`text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2 ${isEn ? 'border-l-4 pl-3' : 'border-r-4 pr-3'} border-primary`}>
                <span>{section.heading}</span>
              </h2>

              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  {p}
                </p>
              ))}

              {section.highlightBox && (
                <div className={`p-4 sm:p-5 rounded-xl bg-amber-500/10 ${isEn ? 'border-l-4' : 'border-r-4'} border-amber-500 text-amber-200 text-sm leading-relaxed my-4`}>
                  <strong className="block text-amber-300 font-bold mb-1">
                    💡 {section.highlightBox.title}
                  </strong>
                  <span>{section.highlightBox.text}</span>
                </div>
              )}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className={`space-y-2.5 my-4 ${isEn ? 'pl-1' : 'pr-1'}`}>
                  {section.bulletPoints.map((point, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQs Section */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="mt-14 pt-10 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span>{isEn ? `Frequently Asked Questions — ${page.title}` : `الأسئلة الشائعة حول ${page.title}`}</span>
            </h2>

            <div className="space-y-4">
              {page.faqs.map((faq, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-bold text-sm sm:text-base text-white mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* High Conversion CTA Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-primary/20 to-purple-900/40 border border-primary/40 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-xl sm:text-3xl font-black text-white mb-3">
            {isEn ? 'Ready to test the system in your gaming lounge?' : 'جاهز لتجربة النظام بنفسك داخل صالتك؟'}
          </h2>
          <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            {isEn 
              ? 'Get an authentic 72-hour full operational trial with zero commitments and no credit card required. Free remote setup included.' 
              : 'احصل على رخصة تشغيل تجريبية كاملة لمدة 72 ساعة بدون بطاقة ائتمان. نقوم بتثبيت السيستم على جهازك مجاناً.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenTrialForm}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{page.ctaText}</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isEn ? 'Chat with Lead Systems Engineer on WhatsApp' : 'تحدث مع المهندس المسؤول عبر واتساب'}</span>
            </a>
          </div>
        </div>

        {/* Related Pillars / Navigation */}
        {page.relatedSlugs && page.relatedSlugs.length > 0 && (
          <div className="mt-14 pt-8 border-t border-white/10">
            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
              {isEn ? 'Related Pages & Architecture Guides:' : 'صفحات وأدلة ذات صلة:'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {page.relatedSlugs.map(slug => {
                const relPage = SEO_PILLAR_PAGES[slug];
                if (!relPage) return null;
                return (
                  <button
                    key={slug}
                    onClick={() => onNavigatePillar(slug)}
                    className={`p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all ${isEn ? 'text-left' : 'text-right'} cursor-pointer flex items-center justify-between group`}
                  >
                    <div>
                      <span className="text-xs text-primary font-bold block mb-1">{relPage.badge}</span>
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors block">
                        {relPage.title}
                      </span>
                    </div>
                    {isEn ? (
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-transform group-hover:translate-x-1 shrink-0" />
                    ) : (
                      <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-primary transition-transform group-hover:-translate-x-1 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Back to Home CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {isEn ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            <span>{isEn ? 'Back to IDEA MAKERS Homepage' : 'العودة للصفحة الرئيسية لـ IDEA MAKERS'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default SeoPillarView;
