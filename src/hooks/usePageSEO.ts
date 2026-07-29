import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  jsonLd?: Record<string, unknown>;
  faqJsonLd?: Array<{ question: string; answer: string }>;
}

/**
 * Custom hook to manage page-level SEO metadata including:
 * - Document title
 * - Meta description
 * - Canonical URL
 * - JSON-LD structured data (WebApplication, BreadcrumbList, FAQPage)
 */
export default function usePageSEO(seo: SeoProps) {
  useEffect(() => {
    const { title, description, canonicalUrl, jsonLd, faqJsonLd } = seo;

    // 1. Set document title
    document.title = title;

    // 2. Set meta description
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // 3. Set canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonicalUrl;
    }

    // 4. Inject JSON-LD structured data
    const structuredData: Record<string, unknown>[] = [];

    // Base WebApplication schema
    if (jsonLd) {
      structuredData.push({
        ...jsonLd,
      });
    }

    // BreadcrumbList
    if (canonicalUrl) {
      const pathParts = canonicalUrl.replace('https://imagesandboxx.online', '').replace(/\/$/, '').split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://imagesandboxx.online/',
        },
      ];

      pathParts.forEach((part, index) => {
        const name = part
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        const item = `https://imagesandboxx.online/${pathParts.slice(0, index + 1).join('/')}`;
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: index + 2,
          name,
          item,
        });
      });

      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      });
    }

    // FAQPage structured data
    if (faqJsonLd && faqJsonLd.length > 0) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqJsonLd.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // Remove old injected JSON-LD scripts (those with data-seo="true")
    document.querySelectorAll('script[data-seo="true"]').forEach((el) => el.remove());

    // Inject new JSON-LD scripts
    structuredData.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('script[data-seo="true"]').forEach((el) => el.remove());
    };
  }, [seo.title, seo.description, seo.canonicalUrl, JSON.stringify(seo.jsonLd), JSON.stringify(seo.faqJsonLd)]);
}

