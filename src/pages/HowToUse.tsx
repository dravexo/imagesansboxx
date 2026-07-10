import React from 'react';
import PageLayout from '../components/PageLayout';

export default function HowToUse() {
  return (
    <PageLayout title="How to Use">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-600">
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">1</div>
          <p className="pt-1">Drag and drop your images into the designated area or click to browse your local files.</p>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">2</div>
          <p className="pt-1">Select your desired output format (WebP, JPEG, PNG, etc.) and specify any target size limit (e.g., 200 KB).</p>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">3</div>
          <p className="pt-1">If you want to batch rename files, set a prefix and/or suffix in the settings panel.</p>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">4</div>
          <p className="pt-1">Enable "Auto Convert" for immediate results as you change settings, or click "Convert All" manually.</p>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">5</div>
          <p className="pt-1">Download individual files or grab them all in a single convenient ZIP archive.</p>
        </div>
      </div>
    </PageLayout>
  );
}
