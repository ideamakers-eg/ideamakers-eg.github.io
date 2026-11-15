export type CountryCode = 'EG' | 'SA' | 'AE' | 'QA' | 'KW';
export type CountryId = 'egypt' | 'saudi' | 'uae' | 'qatar' | 'kuwait';
export type LocaleCode = 'ar-EG' | 'ar-SA' | 'ar-AE' | 'ar-QA' | 'ar-KW';
export type CurrencyCode = 'EGP' | 'SAR' | 'AED' | 'QAR' | 'KWD';

export interface CountryConfig {
  code: CountryCode;
  id: CountryId;
  name: string;
  nativeName: string;
  flag: string;
  locale: LocaleCode;
  currency: CurrencyCode;
  currencyName: string;
  currencySymbol: string;
  hourlyPrice: number;
  hourlyCurrencyName: string;
  rate: number;
  timeZone: string;
  dialectName: string;
  writingStyle: string;
  intlNumberOptions?: Intl.NumberFormatOptions;
  intlCurrencyOptions?: Intl.NumberFormatOptions;
  meta: {
    title: string;
    description: string;
    keywords: string;
    canonicalPath: string;
  };
}

export interface ProblemItem {
  title: string;
  desc: string;
  iconType: 'theft' | 'time' | 'device';
}

export interface SolutionItem {
  title: string;
  desc: string;
  badge: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  city: string;
  loungeName: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RoadmapStep {
  title: string;
  badge: string;
  duration: string;
  summary: string;
  details: string[];
  ctaText: string;
}

export interface TranslationSchema {
  common: {
    brandName: string;
    brandArabic: string;
    tryFree: string;
    discoverFeatures: string;
    startNow: string;
    freeTrialDays: string;
    freeTrialHours: string;
    fullAccess: string;
    noCreditCard: string;
    safe: string;
    fast: string;
    usersCount: string;
    whatsappMessage: string;
  };
  navigation: {
    features: string;
    roadmap: string;
    whyUs: string;
    pricing: string;
    freeTrial: string;
    calculator: string;
    faq: string;
    selectCountry: string;
  };
  hero: {
    tag: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust1: string;
    trust2: string;
    trust3: string;
    badgePS: string;
    badgeTime: string;
  };
  problems: {
    title: string;
    subtitle: string;
    items: ProblemItem[];
  };
  questions: {
    title: string;
    items: string[];
    cta: string;
  };
  solutions: {
    title: string;
    subtitle: string;
    items: SolutionItem[];
  };
  calculator: {
    title: string;
    subtitle: string;
    devicesLabel: string;
    devicesHint: string;
    hoursLabel: string;
    hoursHint: string;
    leakLabel: string;
    leakHint: string;
    leakExplanation: string;
    potentialProfitLabel: string;
    potentialProfitHint: string;
    lossLabel: string;
    lossHint: string;
    recoveredProfitLabel: string;
    recoveredProfitHint: string;
    cta: string;
  };
  justification: {
    title: string;
    text: string;
    points: string[];
  };
  pricing: {
    title: string;
    subtitle: string;
    popularBadge: string;
    lockedBadge: string;
    recommendedBadge: string;
    internationalNotice: string;
    ctaButton: string;
    decisionGuideBadge: string;
  };
  roadmap: {
    title: string;
    subtitle: string;
    steps: RoadmapStep[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  forms: {
    title: string;
    subtitle: string;
    ownerNameLabel: string;
    ownerNamePlaceholder: string;
    loungeNameLabel: string;
    loungeNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    countryLabel: string;
    packageLabel: string;
    deviceCountLabel: string;
    submitButton: string;
    successTitle: string;
    successMessage: string;
  };
  footer: {
    rights: string;
    description: string;
  };
}
