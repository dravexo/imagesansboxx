import React from 'react';

export function FooterPlaceholder() {
  return (
    <footer
      className="w-full py-12 border-t border-slate-200 bg-white/40 mt-16 relative z-10 font-medium"
      aria-hidden="true"
    />
  );
}

export function KnowledgeBasePlaceholder() {
  return <div className="w-full h-[420px]" aria-hidden="true" />;
}

