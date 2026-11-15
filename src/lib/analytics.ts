/**
 * IDEA MAKERS — Analytics & Conversion Tracking Architecture
 * Safely dispatches standard and custom business events to Google Analytics 4 / Google Tag Manager.
 * Checks for window.gtag and window.dataLayer; operates safely if tracking is not yet configured.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsEvent = 
  | 'click_whatsapp'
  | 'trial_form_start'
  | 'trial_form_submit'
  | 'package_select'
  | 'pricing_cta_click'
  | 'phone_click'
  | 'contact_request'
  | 'page_view';

export function trackEvent(eventName: AnalyticsEvent, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  };

  // Push to GTM dataLayer if present
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  // Push to GA4 gtag if present
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export const Analytics = {
  clickWhatsApp: (source: string, message?: string) => {
    trackEvent('click_whatsapp', { source, message_preview: message?.slice(0, 50) });
  },

  trialFormStart: () => {
    trackEvent('trial_form_start', { form_id: 'smart-trial-form' });
  },

  trialFormSubmit: (packageId: string, country: string) => {
    trackEvent('trial_form_submit', {
      package_id: packageId,
      country,
      currency: country === 'egypt' ? 'EGP' : 'SAR',
    });
  },

  packageSelect: (packageId: string, price: number | string, currency: string) => {
    trackEvent('package_select', {
      package_id: packageId,
      value: Number(price) || 0,
      currency,
    });
  },

  pricingCtaClick: (packageId: string) => {
    trackEvent('pricing_cta_click', { package_id: packageId });
  },

  phoneClick: (phoneNumber: string) => {
    trackEvent('phone_click', { phone_number: phoneNumber });
  },

  contactRequest: (source: string) => {
    trackEvent('contact_request', { source });
  },
};
