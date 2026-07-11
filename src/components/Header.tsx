import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onShowHelp: () => void;
}

export default function Header({ onShowHelp }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl shadow-md shadow-blue-500/15 overflow-hidden bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full object-contain p-1">
            <defs>
              <linearGradient id="header-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="24" fill="url(#header-logo-grad)" />
            <rect x="26" y="26" width="38" height="38" rx="8" fill="none" stroke="#ffffff" strokeWidth="6.5" strokeOpacity={0.95} />
            <rect x="36" y="36" width="38" height="38" rx="8" fill="none" stroke="#ffffff" strokeWidth="5" strokeDasharray="6 3" strokeOpacity={0.6} />
            <circle cx="45" cy="45" r="5.5" fill="#ffffff" />
            <path d="M 72 28 L 60 40 M 60 40 L 66 40 M 60 40 L 60 34" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-lg tracking-tight text-slate-900">
              image<span className="text-blue-600">sandboxx</span>
            </h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200">v1.0</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Professional Offline Image Converter</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Local-only badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <span>100% Client-Side (Private)</span>
        </div>

        {/* Help/Info trigger */}
        <button
          onClick={onShowHelp}
          aria-label="How it works"
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-all px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer font-medium"
        >
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span className="hidden xs:inline">How it works</span>
        </button>
      </div>
    </header>
  );
}

