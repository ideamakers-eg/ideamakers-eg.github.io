import { CountryConfig, Country } from './types';

export const COUNTRIES: Record<Country, CountryConfig> = {
  EG: {
    name: 'Egypt',
    flag: '🇪🇬',
    currency: 'EGP',
    symbol: 'ج.م',
    basePackagePrice: 10000,
    defaultHourlyPrice: 20,
  },
  SA: {
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    currency: 'SAR',
    symbol: 'ر.س',
    basePackagePrice: 1200,
    defaultHourlyPrice: 10,
  },
  AE: {
    name: 'UAE',
    flag: '🇦🇪',
    currency: 'AED',
    symbol: 'د.إ',
    basePackagePrice: 1200,
    defaultHourlyPrice: 10,
  },
};

export const INTERNATIONAL_PACKAGE_FEATURES = [
  "دعم تبديل العملات (Currency Switching)",
  "التحكم في المنطقة الزمنية (Timezone Control)",
  "يدعم عمليات السعودية والإمارات",
  "يتضمن جميع مميزات باقة Professional",
  "دعم فني دولي عابر للحدود",
];
