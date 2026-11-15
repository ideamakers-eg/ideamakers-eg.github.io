import { CountryConfig, CountryId, CountryCode } from './types';

export const COUNTRIES_REGISTRY: Record<CountryId, CountryConfig> = {
  egypt: {
    code: 'EG',
    id: 'egypt',
    name: 'مصر',
    nativeName: 'جمهورية مصر العربية',
    flag: '🇪🇬',
    locale: 'ar-EG',
    currency: 'EGP',
    currencyName: 'جنيه مصري',
    currencySymbol: 'ج.م',
    hourlyPrice: 20,
    hourlyCurrencyName: 'جنيه',
    rate: 1,
    timeZone: 'Africa/Cairo',
    dialectName: 'اللهجة المصرية 🇪🇬',
    writingStyle: 'عربية مصرية مهنية لرواد صالات البلايستيشن',
    intlNumberOptions: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    intlCurrencyOptions: {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    },
    meta: {
      title: 'نظام إدارة صالات البلايستيشن في مصر | سيستم كاشير بلايستيشن - IDEA Makers',
      description: 'امتلك أقوى نظام لإدارة صالات البلايستيشن في مصر. نظام أوفلاين 100% بملكية مدى الحياة بدون اشتراكات أو رسوم شهرية متكررة.',
      keywords: 'نظام كاشير بلايستيشن مصر, برنامج إدارة صالات البلايستيشن, PlayStation POS Egypt',
      canonicalPath: '/playstation-pos-egypt',
    },
  },
  saudi: {
    code: 'SA',
    id: 'saudi',
    name: 'السعودية',
    nativeName: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    locale: 'ar-SA',
    currency: 'SAR',
    currencyName: 'ريال سعودي',
    currencySymbol: 'ر.س',
    hourlyPrice: 10,
    hourlyCurrencyName: 'ريال',
    rate: 0.12,
    timeZone: 'Asia/Riyadh',
    dialectName: 'اللهجة السعودية/الخليجية 🇸🇦',
    writingStyle: 'عربية سعودية تجارية رصينة لملاك مراكز الألعاب والترفيه',
    intlNumberOptions: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    intlCurrencyOptions: {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    },
    meta: {
      title: 'نظام إدارة صالات ومراكز الألعاب في السعودية | سستم كاشير بلايستيشن - IDEA Makers',
      description: 'نظام محاسبي وإداري متطور لمراكز وألعاب البلايستيشن والضيافة في السعودية. أوفلاين 100% وتقارير ورديات فورية على الواتساب.',
      keywords: 'نظام كاشير بلايستيشن السعودية, إدارة مراكز ألعاب الرياض جدة, PlayStation POS Saudi',
      canonicalPath: '/playstation-pos-saudi',
    },
  },
  uae: {
    code: 'AE',
    id: 'uae',
    name: 'الإمارات',
    nativeName: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    locale: 'ar-AE',
    currency: 'AED',
    currencyName: 'درهم إماراتي',
    currencySymbol: 'د.إ',
    hourlyPrice: 10,
    hourlyCurrencyName: 'درهم',
    rate: 0.12,
    timeZone: 'Asia/Dubai',
    dialectName: 'اللهجة الإماراتية/الخليجية 🇦🇪',
    writingStyle: 'عربية حديثة ملائمة لبيئة الأعمال الذكية وصالات الجيمنج بدبي وأبوظبي',
    intlNumberOptions: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    intlCurrencyOptions: {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    },
    meta: {
      title: 'نظام إدارة مراكز الجيمنج والبلايستيشن في الإمارات | سستم كاشير ذكي - IDEA Makers',
      description: 'الحل البرمجي والتقني الأقوى لإدارة مراكز الجيمنج وغرف VIP في دبي وأبوظبي. ملكية مدى الحياة وتحكم فوري بالأجهزة والمبيعات.',
      keywords: 'سستم بلايستيشن الإمارات, كاشير صالات ألعاب دبي, Gaming Lounge POS UAE',
      canonicalPath: '/playstation-pos-uae',
    },
  },
  qatar: {
    code: 'QA',
    id: 'qatar',
    name: 'قطر',
    nativeName: 'دولة قطر',
    flag: '🇶🇦',
    locale: 'ar-QA',
    currency: 'QAR',
    currencyName: 'ريال قطري',
    currencySymbol: 'ر.ق',
    hourlyPrice: 10,
    hourlyCurrencyName: 'ريال',
    rate: 0.12,
    timeZone: 'Asia/Qatar',
    dialectName: 'اللهجة القطرية/الخليجية 🇶🇦',
    writingStyle: 'عربية خليجية راقية مناسبة لصالونات ومراكز الترفيه الفاخرة بقطر',
    intlNumberOptions: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    intlCurrencyOptions: {
      style: 'currency',
      currency: 'QAR',
      maximumFractionDigits: 0,
    },
    meta: {
      title: 'نظام إدارة صالات البلايستيشن والألعاب في قطر | سستم كاشير VIP - IDEA Makers',
      description: 'السيستم الاحترافي الأول لإدارة صالات الـ VIP والألعاب بدولة قطر. تتبع دقيق للحسابات وتقارير يومية مباشرة بالواتساب.',
      keywords: 'كاشير بلايستيشن قطر, إدارة صالات ألعاب الدوحة, PlayStation POS Qatar',
      canonicalPath: '/playstation-pos-qatar',
    },
  },
  kuwait: {
    code: 'KW',
    id: 'kuwait',
    name: 'الكويت',
    nativeName: 'دولة الكويت',
    flag: '🇰🇼',
    locale: 'ar-KW',
    currency: 'KWD',
    currencyName: 'دينار كويتي',
    currencySymbol: 'د.ك',
    hourlyPrice: 1,
    hourlyCurrencyName: 'دينار',
    rate: 0.01,
    timeZone: 'Asia/Kuwait',
    dialectName: 'اللهجة الكويتية/الخليجية 🇰🇼',
    writingStyle: 'عربية كويتية تجارية ملائمة لصالونات البلايستيشن والضيافة',
    intlNumberOptions: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    },
    intlCurrencyOptions: {
      style: 'currency',
      currency: 'KWD',
      maximumFractionDigits: 3,
    },
    meta: {
      title: 'سستم كاشير وإدارة صالات البلايستيشن في الكويت | حماية الإيرادات - IDEA Makers',
      description: 'سستم الكاشير وإدارة صالات الألعاب الأرقى في الكويت. تشغيل أوفلاين مدى الحياة، حماية من التلاعب، وجرد مخازن صارم للبوفيه.',
      keywords: 'سستم بلايستيشن الكويت, كاشير صالات ترفيه السالمية, Gaming Lounge POS Kuwait',
      canonicalPath: '/playstation-pos-kuwait',
    },
  },
};

export const SUPPORTED_COUNTRIES: CountryConfig[] = Object.values(COUNTRIES_REGISTRY);

export const DEFAULT_COUNTRY: CountryConfig = COUNTRIES_REGISTRY.egypt;

export function getCountryById(id: string): CountryConfig {
  const normalized = id.toLowerCase().trim() as CountryId;
  return COUNTRIES_REGISTRY[normalized] || DEFAULT_COUNTRY;
}

export function getCountryByCode(code: string): CountryConfig {
  const normalized = code.toUpperCase().trim() as CountryCode;
  const found = SUPPORTED_COUNTRIES.find((c) => c.code === normalized);
  return found || DEFAULT_COUNTRY;
}

export function getCountryFromPath(pathname: string): CountryConfig | null {
  const lower = pathname.toLowerCase();
  if (lower.includes('egypt') || lower.includes('/eg')) return COUNTRIES_REGISTRY.egypt;
  if (lower.includes('saudi') || lower.includes('/sa')) return COUNTRIES_REGISTRY.saudi;
  if (lower.includes('uae') || lower.includes('/ae')) return COUNTRIES_REGISTRY.uae;
  if (lower.includes('kuwait') || lower.includes('/kw')) return COUNTRIES_REGISTRY.kuwait;
  if (lower.includes('qatar') || lower.includes('/qa')) return COUNTRIES_REGISTRY.qatar;
  return null;
}
