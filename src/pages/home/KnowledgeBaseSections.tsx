import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Check,
} from 'lucide-react';

export function KnowledgeHero() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-center max-w-4xl mx-auto">
        <span className="px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
          Product Knowledge Base
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Secure High-Fidelity Image Optimization
        </h2>
      </div>

      <div className="text-base text-slate-600 leading-relaxed max-w-4xl mx-auto space-y-4">
        <p>
          Our high-fidelity image compression engine is custom-engineered to shrink visual assets down to target sizes like 50KB or 100KB with absolute structural integrity. Built for developers, designers, and professionals submitting documents to institutional portals, this toolkit supports standard format standards such as JPEG, PNG, and WebP.
        </p>
        <p>
          By employing intelligent color frequency analysis and advanced quantizers, we eliminate redundant visual noise before writing the output stream. This results in incredibly light file sizes while maintaining immaculate pixel precision for text scans, signatures, and fine-art illustrations.
        </p>
      </div>
    </div>
  );
}

export function KnowledgeFeatures() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">1. Smart JPEG Quantizer</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Experience high-performance lossy compression. The quantizer strips out unnoticeable chromatic variances, yielding remarkable file footprint savings while preserving maximum visual fidelity.
        </p>
      </div>

      <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">2. Alpha-Aware PNG Compressor</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Retain valuable transparency masks without the associated storage bloat. Ideal for vector logos, signatures, and dynamic branding assets.
        </p>
      </div>

      <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
          <Zap className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">3. Next-Gen WebP Pipeline</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Convert assets to WebP structures instantly. Saves up to 40% more file overhead compared to legacy standards while establishing modern, responsive layouts.
        </p>
      </div>
    </div>
  );
}

export function KnowledgeSpecsTable() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
          Standard Portal & Application Guidelines
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Many central registry networks, academic databases, and candidate recruitment portals enforce strict limits on both pixel width/height dimensions and maximum file size capacities. Use these standards for guidance:
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
        <table className="w-full text-left border-collapse text-sm text-slate-600">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-800">
              <th className="p-4">Asset Type</th>
              <th className="p-4">Target File Range</th>
              <th className="p-4">Recommended Bounds</th>
              <th className="p-4">Optimal Format</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Passport Photograph</td>
              <td className="p-4">20KB – 50KB</td>
              <td className="p-4">3.5 cm x 4.5 cm (350 x 450 px)</td>
              <td className="p-4">JPEG / JPG</td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Authorized Signature</td>
              <td className="p-4">10KB – 20KB</td>
              <td className="p-4">3.5 cm x 1.5 cm (280 x 120 px)</td>
              <td className="p-4">JPEG / PNG</td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Official Certificates & Transcripts</td>
              <td className="p-4">100KB – 300KB</td>
              <td className="p-4">A4 Size (1200 x 1600 px)</td>
              <td className="p-4">PDF / JPEG</td>
            </tr>
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Identification Credentials (PAN, ID Card)</td>
              <td className="p-4">50KB – 100KB</td>
              <td className="p-4">Standard Card Size (800 x 500 px)</td>
              <td className="p-4">JPEG / PDF</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function KnowledgeFaq() {
  return (
    <div className="space-y-8 border-t border-slate-100 pt-12">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-display font-bold text-slate-900">
          Frequently Asked Questions
        </h3>
        <p className="text-sm text-slate-500">
          Quick technical answers regarding compression thresholds, security compliance, and formats.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">
            Q. How do I target exactly 50KB or 100KB limits?
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Drop your files into the staging queue, toggle the 'Target Size' switch, set the exact numeric limit in KB, and click convert. The optimization pipeline dynamically balances sample dimensions and quantization scales to hit your size threshold.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">
            Q. Are my confidential files sent across a public network?
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Absolutely not. All processing occurs locally within localized, sandboxed secure memory buffers. No files are transmitted to or stored on external cloud infrastructure, satisfying the highest compliance and enterprise security policies.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">
            Q. Which format is best for preserving text readability?
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            For document scans with embedded fine print, WebP or high-quality PNG is highly recommended. These formats prevent the chromatic ringing artifacts typically introduced by aggressive JPEG compression.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">
            Q. Are there volume caps or premium subscription models?
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our core compression workspace operates fully unrestricted. You can compress any number of high-resolution image files simultaneously with zero file count or speed limits.
          </p>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeBaseSections() {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-16">
      <KnowledgeHero />
      <KnowledgeFeatures />
      <KnowledgeSpecsTable />
      <KnowledgeFaq />
    </div>
  );
}

export function HowItWorksModalContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="space-y-2">
        <h3
          id="how-it-works-title"
          className="text-lg font-display font-bold text-slate-900 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-blue-500" />
          <span>How imageboxx Works</span>
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          A professional, client-side toolkit built to make image conversion instant, safe, and robust.
        </p>
      </div>

      <div className="space-y-4 text-xs text-slate-600">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-green-600" />
            <span>Ultra-Secure Processing</span>
          </h4>
          <p className="leading-relaxed text-slate-500 font-medium">
            We use advanced compression pipelines to process your files securely. This means your files are handled with enterprise-grade privacy standards, preserving quality and ensuring full compliance with workspace privacy policies.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-blue-600" />
            <span>Format Comparisons</span>
          </h4>
          <ul className="space-y-1.5 text-slate-500 font-medium">
            <li>
              • <strong className="text-slate-800">PNG:</strong> Lossless quality. Perfect for logos, illustrations, or graphics with transparency.
            </li>
            <li>
              • <strong className="text-slate-800">JPEG/JPG:</strong> Great lossy compression. Perfect for large photos, reducing size significantly.
            </li>
            <li>
              • <strong className="text-slate-800">WebP:</strong> Next-generation format. Saves up to 30% more space than JPEG at equal visual fidelity.
            </li>
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-indigo-600" />
            <span>Adjustable Compression</span>
          </h4>
          <p className="leading-relaxed text-slate-500 font-medium">
            Slide quality levels for JPEG and WebP outputs. A quality setting of 80% to 85% usually yields up to an 80% file size saving with practically zero noticeable change in visible details!
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/15 cursor-pointer"
      >
        Get Started
      </button>
    </>
  );
}

