import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  CountryConfig, 
  CountryId, 
  CountryCode, 
  LocaleCode, 
  CurrencyCode, 
  TranslationSchema 
} from './types';
import { 
  COUNTRIES_REGISTRY, 
  SUPPORTED_COUNTRIES, 
  DEFAULT_COUNTRY, 
  getCountryById, 
  getCountryByCode, 
  getCountryFromPath 
} from './countries';
import { egTranslations } from './locales/eg';
import { saTranslations } from './locales/sa';
import { aeTranslations } from './locales/ae';
import { qaTranslations } from './locales/qa';
import { kwTranslations } from './locales/kw';

export * from './types';
export * from './countries';

export const TRANSLATIONS_REGISTRY: Record<CountryId, TranslationSchema> = {
  egypt: egTranslations,
  saudi: saTranslations,
  uae: aeTranslations,
  qatar: qaTranslations,
  kuwait: kwTranslations,
};

export function getTranslations(countryId: string | CountryId): TranslationSchema {
  const normalized = (countryId || '').toLowerCase().trim() as CountryId;
  return TRANSLATIONS_REGISTRY[normalized] || TRANSLATIONS_REGISTRY.egypt;
}

/**
 * Format currency using standard Intl.NumberFormat based on country locale and currency code
 */
export function formatCurrency(amount: number, country: CountryConfig): string {
  try {
    return new Intl.NumberFormat(country.locale, {
      style: 'currency',
      currency: country.currency,
      maximumFractionDigits: country.currency === 'KWD' ? 3 : 0,
      minimumFractionDigits: 0,
      ...country.intlCurrencyOptions,
    }).format(amount);
  } catch (e) {
    return `${amount.toLocaleString()} ${country.currencySymbol}`;
  }
}

/**
 * Format numbers using standard Intl.NumberFormat with regional decimal/grouping separators
 */
export function formatNumber(value: number, country: CountryConfig): string {
  try {
    return new Intl.NumberFormat(country.locale, {
      maximumFractionDigits: country.currency === 'KWD' ? 3 : 0,
      ...country.intlNumberOptions,
    }).format(value);
  } catch (e) {
    return value.toLocaleString();
  }
}

/**
 * Format hourly price with localized hourly currency name
 */
export function formatHourlyPrice(country: CountryConfig): string {
  return `${country.hourlyPrice} ${country.hourlyCurrencyName}`;
}

export interface I18nContextType {
  country: CountryConfig;
  t: TranslationSchema;
  setCountry: (country: CountryConfig | CountryId) => void;
  formatCurrency: (amount: number) => string;
  formatNumber: (value: number) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [country, setCountryState] = useState<CountryConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_COUNTRY;
    const fromPath = getCountryFromPath(window.location.pathname);
    if (fromPath) return fromPath;
    const storedId = localStorage.getItem('playstation_pos_selected_country');
    if (storedId) {
      return getCountryById(storedId);
    }
    return DEFAULT_COUNTRY;
  });

  const t = useMemo(() => getTranslations(country.id), [country.id]);

  const setCountry = (newCountry: CountryConfig | CountryId) => {
    const resolved = typeof newCountry === 'string' ? getCountryById(newCountry) : newCountry;
    setCountryState(resolved);
    if (typeof window !== 'undefined') {
      localStorage.setItem('playstation_pos_selected_country', resolved.id);
      
      // Sync URL pathname if different
      const targetPath = `/playstation-pos-${resolved.id}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ countryId: resolved.id }, '', targetPath);
      }

      // Sync Document Title and Meta tags
      document.title = resolved.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', resolved.meta.description);
      }
    }
  };

  // Sync state on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const fromPath = getCountryFromPath(window.location.pathname) || DEFAULT_COUNTRY;
      setCountryState(fromPath);
      localStorage.setItem('playstation_pos_selected_country', fromPath.id);
      document.title = fromPath.meta.title;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO tags on mount or country change
  useEffect(() => {
    document.title = country.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', country.meta.description);
    }
  }, [country]);

  const contextValue = useMemo(() => ({
    country,
    t,
    setCountry,
    formatCurrency: (amount: number) => formatCurrency(amount, country),
    formatNumber: (value: number) => formatNumber(value, country),
  }), [country, t]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    // Graceful fallback for components rendered outside provider
    const fallbackCountry = DEFAULT_COUNTRY;
    return {
      country: fallbackCountry,
      t: getTranslations(fallbackCountry.id),
      setCountry: () => {},
      formatCurrency: (amount: number) => formatCurrency(amount, fallbackCountry),
      formatNumber: (value: number) => formatNumber(value, fallbackCountry),
    };
  }
  return context;
}
