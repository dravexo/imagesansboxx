import React from 'react';
import { Check, FileText, Sparkles, ShieldCheck } from 'lucide-react';

export function PdfGuidesHero() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-center max-w-4xl mx-auto">
        <span className="px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
          PDF Converter Guides
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Compress PDFs and Convert Images to PDF
        </h2>
      </div>

      <div className="text-base text-slate-600 leading-relaxed max-w-4xl mx-auto space-y-3">
        <p>
          This workspace optimizes your documents locally in your browser. Upload PDFs (or images) and generate a smaller output without uploading to any server.
        </p>
        <p>
          Use it for government forms, scanned certificates, and document submissions where file size limits matter.
        </p>
      </div>
    </div>
  );
}

export function PdfGuidesSteps() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">1) Upload</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Drag & drop a PDF or supported image formats (PNG/JPG/JPEG/WebP).
        </p>
      </div>

      <div className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">2) Process</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Press <span className="font-semibold text-slate-700">Compress</span> (or <span className="font-semibold text-slate-700">Compress All</span>) to produce optimized outputs.
        </p>
      </div>

      <div className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">3) Download</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Save each result. If a PDF is already smaller, we keep the original to avoid quality regressions.
        </p>
      </div>
    </div>
  );
}

export function PdfGuidesFaq() {
  return (
    <div className="space-y-8 border-t border-slate-100 pt-12">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-display font-bold text-slate-900">Quick FAQ</h3>
        <p className="text-sm text-slate-500">Helpful answers about PDF + image conversion and file size.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">Will this upload my files?</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            No. All processing happens in your browser.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">Why does a result sometimes match the original size?</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            PDFs are complex. When optimization doesn’t reduce size, the app keeps the best (smaller) output.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">What types work best?</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Scanned documents, forms, and images converted into a single-page PDF work great.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm">Can I compress multiple files?</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Yes. Use <span className="font-semibold text-slate-700">Compress All</span> and download a ZIP when ready.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PdfGuidesContent() {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-16">
      <PdfGuidesHero />
      <PdfGuidesSteps />
      <div className="flex items-start gap-3 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <Check className="w-5 h-5 text-emerald-600 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800">Best practice</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            If your submission portal has strict size limits, compress first, download, then re-upload only the optimized file.
          </p>
        </div>
      </div>
      <PdfGuidesFaq />
    </div>
  );
}

