import { useEffect } from 'react';

const GTAG_ID = 'G-MN2K5CDPH3';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalyticsHead() {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById('ga4-script')) {
      return;
    }

    const loadAnalytics = () => {
      // External Google Analytics Script
      const script = document.createElement('script');
      script.id = 'ga4-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;

      // Inline Configuration
      const inline = document.createElement('script');
      inline.id = 'ga4-inline';
      inline.type = 'text/javascript';
      inline.innerHTML = `
        window.dataLayer = window.dataLayer || [];

        function gtag(){
          dataLayer.push(arguments);
        }

        window.gtag = gtag;

        gtag('js', new Date());

        gtag('config', '${GTAG_ID}', {
          send_page_view: true
        });
      `;

      document.head.appendChild(script);
      document.head.appendChild(inline);
    };

    // Load GA4 after browser is idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadAnalytics);
    } else {
      window.setTimeout(loadAnalytics, 1500);
    }
  }, []);

  return null;
}