import React from 'react';
import { ExternalLink } from 'lucide-react';

const AD_URL = 'https://dravexo.github.io/dravexoPIxelBot/';

interface AdBannerProps {
  compact?: boolean;
}

export default function AdBanner({ compact = false }: AdBannerProps) {
  return (
    <a
      href={AD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all overflow-hidden"
      aria-label="Play Pixel Bot — a free retro pixel game"
    >
      <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
        <img
          src="/ad-banner.png"
          alt="Pixel Bot Game"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {!compact && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Sponsored
            </span>
          </div>
          <p className="mt-1.5 text-sm font-bold text-slate-900">Play Pixel Bot — Free Retro Game</p>
          <p className="text-xs text-slate-500 mt-0.5">Jump, dash &amp; grapple through pixel worlds. No download needed.</p>
        </div>
      )}
      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
    </a>
  );
}
