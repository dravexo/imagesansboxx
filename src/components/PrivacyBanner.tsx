import React from 'react';
import { ShieldCheck, Zap, Cpu, Lock } from 'lucide-react';

export default function PrivacyBanner() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 shadow-sm mb-8">
      {/* Decorative gradient orb */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Secure Architecture</span>
          </div>
          <h2 className="text-xl font-display font-semibold text-slate-900 tracking-tight">
            Safe, Secure & Instant Image Conversion
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your images are processed <span className="text-blue-600 font-semibold">securely and privately</span>. All operations occur seamlessly to deliver high-quality results. It's blazing fast, completely private, and highly reliable.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1 min-w-[140px]">
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs">
              <Zap className="w-3.5 h-3.5" />
              <span>Zero Waiting</span>
            </div>
            <span className="text-[11px] text-slate-500">Blazing fast conversion</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1 min-w-[140px]">
            <div className="flex items-center gap-1.5 text-indigo-600 font-semibold text-xs">
              <Cpu className="w-3.5 h-3.5" />
              <span>No Limits</span>
            </div>
            <span className="text-[11px] text-slate-500">Process huge photos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

