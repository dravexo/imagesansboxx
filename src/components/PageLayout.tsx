import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Footer from './Footer';
import ShareButton from './ShareButton';
import usePageSEO from '../hooks/usePageSEO';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  /** SEO metadata — if provided, will set document head and inject structured data */
  seo?: {
    title: string;
    description: string;
    canonicalUrl?: string;
    jsonLd?: Record<string, unknown>;
    faqJsonLd?: Array<{ question: string; answer: string }>;
  };
}

export default function PageLayout({ title, children, seo }: PageLayoutProps) {
  // Apply SEO metadata when seo prop is provided
  usePageSEO(
    seo ?? {
      title: `${title} | ImageSandboxX`,
      description: `Use ImageSandboxX to ${title.toLowerCase()} — free, fast, and private. No uploads needed, all processing happens in your browser.`,
      canonicalUrl: `https://imagesandboxx.online${window.location.pathname}`,
    }
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Back to Home</span>
          </Link>
          
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-slate-900">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ShareButton
            title={title === 'Blog' ? 'ImageSandboxX Blog' : `${title} | ImageSandboxX`}
            text="Check this out on ImageSandboxX and explore the free tools."
            url={typeof window !== 'undefined' ? window.location.href : undefined}
            label="Share & Win"
            variant="secondary"
            showIncentive
            className="hidden sm:inline-flex"
          />

          {/* Local-only badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>100% Secure</span>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <main className="flex-1 flex flex-col items-center p-6 md:p-12">
        {children}
      </main>

      <Footer />
    </div>
  );
}
