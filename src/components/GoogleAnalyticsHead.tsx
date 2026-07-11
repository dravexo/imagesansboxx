import React, { useEffect } from 'react';

const GTAG_ID = 'G-MN2K5CDPH3';
const SCRIPT_SRC = 'https://www.googletagmanager.com/gtag/js';

const SCRIPT_SCRIPT_ELEMENT_ID = 'google-tag-gtagjs';
const SCRIPT_INLINE_ELEMENT_ID = 'google-tag-gtagjs-inline';
const DATA_LAYER_INITED_KEY = '__google_tag_dataLayer_inited__';

declare global {
  interface Window {
    dataLayer?: any[];
    [key: string]: any;
  }
}

/**
 * Injects the Google tag snippet into the document <head> once.
 * Safe in SPA navigation (react-router) because we guard with element ids.
 */
export default function GoogleAnalyticsHead() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_SCRIPT_ELEMENT_ID) || document.getElementById(SCRIPT_INLINE_ELEMENT_ID)) {
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_SCRIPT_ELEMENT_ID;
    script.async = true;
    script.src = `${SCRIPT_SRC}?id=${GTAG_ID}`;

    // Inline snippet (exactly one per page)
    const inline = document.createElement('script');
    inline.id = SCRIPT_INLINE_ELEMENT_ID;
    inline.text = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GTAG_ID}');`;

    const head = document.head;
    head.appendChild(script);
    head.appendChild(inline);

    // Some CSP setups or async ordering issues can leave dataLayer undefined early.
    // This is a lightweight guard to be safe.
    if (!window[DATA_LAYER_INITED_KEY]) {
      window[DATA_LAYER_INITED_KEY] = true;
      window.dataLayer = window.dataLayer || [];
    }
  }, []);

  return null;
}

