import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  showIncentive?: boolean;
}

export default function ShareButton({
  title,
  text,
  url,
  label = 'Share',
  className = '',
  variant = 'primary',
  showIncentive = false,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || (typeof document !== 'undefined' ? document.title : 'ImageSandboxX');
  const shareText = text || 'Check this out on ImageSandboxX';

  const copyLink = async () => {
    if (!shareUrl) return;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Copy failed:', error);
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (!shareUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
        return;
      }

      await copyLink();
    } catch (error) {
      const err = error as DOMException;
      if (err && err.name === 'AbortError') {
        return;
      }

      await copyLink();
    }
  };

  const styles = {
    primary:
      'inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all',
    secondary:
      'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl border border-slate-200 transition-all',
    outline:
      'inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm transition-all',
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`${styles[variant]} ${className}`}
      aria-label={copied ? 'Link copied' : label}
    >
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      <span>{copied ? 'Link copied' : label}</span>
      {showIncentive && (
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide">
          {copied ? 'Done' : 'Bonus'}
        </span>
      )}
      {!copied && !showIncentive && <Copy className="w-3.5 h-3.5 opacity-80" />}
    </button>
  );
}
