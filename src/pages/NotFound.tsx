import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-2xl w-full mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-5 border border-red-100">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">404 — Page not found</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The URL you requested doesn’t exist. It may have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <a
            href="/sitemap.xml"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-800 font-medium py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
          >
            View Sitemap
          </a>
        </div>
      </div>
    </div>
  );
}

