import React from 'react';
import { motion } from 'motion/react';
import { Heart, Gamepad2, MessageCircle, BookOpen, Layers, ShieldCheck, ExternalLink, MapPin, ArrowUp, FileText } from 'lucide-react';
import { useI18n, CountryConfig, SUPPORTED_COUNTRIES } from '../i18n';
import { SEO_PILLAR_PAGES, SEO_ARTICLES } from '../data/seoPillars';

interface FooterProps {
  onNavigatePath?: (path: string) => void;
  selectedCountryId?: string;
  onSelectCountry?: (country: CountryConfig) => void;
}

/**
 * Enhanced Footer Component for SEO & Conversion
 * Contains crawlable semantic links to all 5 Pillar Pages, 6 Practical Guides,
 * regional country variants, and company trust anchors.
 */
const Footer: React.FC<FooterProps> = ({ 
  onNavigatePath, 
  selectedCountryId, 
  onSelectCountry 
}) => {
  const { t, country, setCountry } = useI18n();
  const currentYear = new Date().getFullYear();
  const ceoWhatsAppUrl = `https://wa.me/201121778205?text=${encodeURIComponent('مرحباً أستاذ إسلام عرفة، أتواصل معك بخصوص نظام IDEA MAKERS')}`;

  const activeCountryId = selectedCountryId || country.id;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigatePath) {
      e.preventDefault();
      onNavigatePath(path);
    }
  };

  const handleCountrySelect = (e: React.MouseEvent<HTMLAnchorElement>, targetCountry: CountryConfig) => {
    e.preventDefault();
    if (onSelectCountry) {
      onSelectCountry(targetCountry);
    } else {
      setCountry(targetCountry);
    }
    if (onNavigatePath) {
      onNavigatePath(`/playstation-pos-${targetCountry.id}`);
    }
  };

  const regionalCountries = [
    { id: 'egypt', flag: '🇪🇬', code: 'EG', name: 'مصر', currencyLabel: 'الجنيه', path: '/playstation-pos-egypt' },
    { id: 'saudi', flag: '🇸🇦', code: 'SA', name: 'السعودية', currencyLabel: 'الريال', path: '/playstation-pos-saudi' },
    { id: 'uae', flag: '🇦🇪', code: 'AE', name: 'الإمارات', currencyLabel: 'الدرهم', path: '/playstation-pos-uae' },
    { id: 'kuwait', flag: '🇰🇼', code: 'KW', name: 'الكويت', currencyLabel: 'الدينار', path: '/playstation-pos-kuwait' },
    { id: 'qatar', flag: '🇶🇦', code: 'QA', name: 'قطر', currencyLabel: 'الريال', path: '/playstation-pos-qatar' },
  ];

  const pillarList = Object.values(SEO_PILLAR_PAGES);
  const articleList = Object.values(SEO_ARTICLES);

  return (
    <footer className="relative bg-[#040407] border-t border-white/10 pt-16 sm:pt-20 pb-28 sm:pb-32 lg:pb-16 overflow-hidden text-gray-300">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[85%] h-72 bg-primary/5 blur-[130px] rounded-full pointer-events-none opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Value Proposition Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => {
                if (onNavigatePath) {
                  onNavigatePath('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] flex items-center justify-center border border-white/15 group-hover:border-primary/50 transition-all duration-300">
                <Gamepad2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">
                  IDEA MAKERS
                </span>
                <span className="text-[11px] font-semibold text-gray-400">
                  صُنّاع الفكرة للحلول البرمجية
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm pt-2">
              النظام الهندسي الأكثر دقة لإدارة صالات البلايستيشن وكافيهات الألعاب. نظام أوفلاين 100%، رخصة مدى الحياة بدون اشتراكات، ودقة حسابية بالثانية تمنع التلاعب بالوقت والهدر المالي.
            </p>

            {/* Direct Contact CTA */}
            <div className="pt-2 flex flex-col gap-2">
              <a 
                href={ceoWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 text-xs font-semibold text-gray-200 hover:text-white transition-all w-fit cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>واتساب الإدارة: 01121778205 (م/ إسلام عرفة)</span>
              </a>

              <a
                href="/company-profile"
                onClick={(e) => handleLinkClick(e, '/company-profile')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 hover:border-primary/60 hover:bg-primary/20 text-xs font-bold text-purple-300 hover:text-white transition-all w-fit cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>الملف التعريفي للشركة (Company Profile 2026)</span>
              </a>
            </div>
          </div>

          {/* Specialized Systems Column (3 cols) */}
          <nav aria-label="الأنظمة والحلول المتخصصة" className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>الأنظمة والحلول المتخصصة</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {pillarList.map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.path}
                    onClick={(e) => handleLinkClick(e, p.path)}
                    className="text-gray-400 hover:text-white hover:translate-x-[-3px] transition-all inline-block py-0.5"
                  >
                    {p.badge}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/free-trial"
                  onClick={(e) => handleLinkClick(e, '/free-trial')}
                  className="text-primary hover:text-primary-light font-bold hover:underline transition-all inline-block py-0.5"
                >
                  طلب تجربة مجانية (72 ساعة)
                </a>
              </li>
            </ul>
          </nav>

          {/* Knowledge & Guides Column (3 cols) */}
          <nav aria-label="دليل ومقالات أصحاب الصالات" className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>دليل ومقالات أصحاب الصالات</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="/guides"
                  onClick={(e) => handleLinkClick(e, '/guides')}
                  className="text-cyan-400 font-bold hover:underline transition-all inline-block py-0.5"
                >
                  فهرس دليل الصالات الشامل 2026
                </a>
              </li>
              {articleList.slice(0, 6).map((art) => (
                <li key={art.slug}>
                  <a
                    href={art.path}
                    onClick={(e) => handleLinkClick(e, art.path)}
                    className="text-gray-400 hover:text-white hover:translate-x-[-3px] transition-all inline-block py-0.5 line-clamp-1"
                    title={art.title}
                  >
                    {art.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Regional Variants & Trust (2 cols) */}
          <nav aria-label="الدول المدعومة والمطابقة" className="lg:col-span-2 space-y-3.5">
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>الدول المدعومة</span>
            </h3>
            <ul className="space-y-1.5 text-xs">
              {regionalCountries.map((item) => {
                const isSelected = activeCountryId === item.id;
                const configObj = SUPPORTED_COUNTRIES.find((c) => c.id === item.id) || country;
                return (
                  <li key={item.id}>
                    <a
                      href={item.path}
                      onClick={(e) => handleCountrySelect(e, configObj)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border border-white/85 bg-white/[0.05] text-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                          : 'border border-transparent text-gray-400 hover:text-white hover:bg-white/[0.02]'
                      }`}
                      aria-current={isSelected ? 'true' : undefined}
                      title={`تفعيل نسخة ${item.name} (${item.currencyLabel})`}
                    >
                      <span className="font-mono text-xs font-semibold leading-none">{item.flag}</span>
                      <span>{item.name} ({item.currencyLabel})</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Back to Top Button right above copyright section */}
        <div className="pt-10 pb-8 flex justify-center border-b border-white/[0.05]">
          <button
            onClick={() => {
              const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
              });
            }}
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/[0.03] via-white/[0.07] to-white/[0.03] border border-white/10 hover:border-primary/50 text-gray-200 hover:text-white transition-all duration-300 shadow-2xl cursor-pointer hover:scale-105 active:scale-95"
            aria-label="الرجوع إلى أعلى الصفحة"
            title="الرجوع إلى أعلى الصفحة"
          >
            <span className="text-xs sm:text-sm font-bold tracking-wide font-cairo">العودة إلى أعلى الصفحة</span>
            <div className="w-8 h-8 rounded-full bg-primary/25 border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <ArrowUp className="w-4 h-4 stroke-[3px] group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Bottom Bar: Copyright & Founder Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="font-normal">
            © {currentYear} <strong className="text-gray-300 font-semibold">صُنّاع الفكرة (IDEA MAKERS)</strong>. جميع الحقوق محفوظة لبرنامج كاشير وإدارة صالات البلايستيشن.
          </p>

          <a 
            href={ceoWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all text-gray-400 hover:text-gray-200"
            title="تواصل مباشرة مع المهندس إسلام عرفة"
          >
            <span>Developed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500/80 fill-red-500/40 group-hover:scale-125 transition-transform" />
            <span>by CEO:</span>
            <span className="font-bold text-gray-200 group-hover:text-[#25D366] transition-colors">Eslam Arafa</span>
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
