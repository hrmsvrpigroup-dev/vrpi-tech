/**
 * Enterprise Telemetry & Analytics Module
 * Google Analytics 4 (GA4) with Privacy & GDPR Consent Controls
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  "G-VRPI2026TECH";

/**
 * Initializes GA script tag if not already loaded and if consent granted
 */
export function initAnalytics(hasConsent: boolean = false) {
  if (typeof window === "undefined") return;

  if (hasConsent) {
    updateAnalyticsConsent(true);
  }

  // Check if script tag is already injected
  if (!document.getElementById("ga-gtag-script") && hasConsent) {
    const script = document.createElement("script");
    script.id = "ga-gtag-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false, // We trigger page views manually on hash changes
        anonymize_ip: true,
      });
    }
  }
}

/**
 * Updates consent state based on user choice in the Cookie Banner
 */
export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied", // Always privacy-first: no advertising cookies
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (granted && !document.getElementById("ga-gtag-script")) {
    const script = document.createElement("script");
    script.id = "ga-gtag-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
}

/**
 * Tracks SPA virtual page views across hash route transitions
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;

  const pagePath = path.startsWith("#") ? `/${path.replace(/^#\/?/, "")}` : path;
  const pageTitle = title || document.title;

  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
    });
  }

  // Developer mode telemetry debug log
  if (import.meta.env?.DEV) {
    console.debug(`[Telemetry:PageView] ${pagePath} - ${pageTitle}`);
  }
}

/**
 * Tracks custom user interactions (form submissions, modal opens, CTAs)
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  if (import.meta.env?.DEV) {
    console.debug(`[Telemetry:Event] ${category} > ${action}`, { label, value });
  }
}
