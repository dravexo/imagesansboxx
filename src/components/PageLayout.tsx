import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
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
