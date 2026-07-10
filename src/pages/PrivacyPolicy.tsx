import React from 'react';
import PageLayout from '../components/PageLayout';
import { ShieldAlert, EyeOff, Lock, CheckCircle, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <PageLayout title="Privacy Policy">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 relative z-10 text-slate-700">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: {currentDate}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3 text-blue-800">
            <EyeOff className="w-5 h-5 shrink-0" />
            <h2 className="font-bold text-base">Your Data Never Leaves Your Device</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike traditional web applications that upload your photos, documents, and sensitive files to remote servers, our suite of compression tools works <strong>entirely in your web browser (client-side)</strong>. Your images and PDFs are loaded, converted, and exported locally. No file contents are ever transmitted across the internet to us or any third parties.
          </p>
        </div>

        {/* Section Blocks */}
        <div className="space-y-8 text-sm leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-slate-500" />
              1. Information We Collect
            </h3>
            <p>
              We prioritize minimalist data design. Because all file processing happens locally:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>No File Uploads:</strong> Your documents, JPEG, PNG, or PDF files are processed within your web sandbox. We do not have access to, read, or store any file you compress.</li>
              <li><strong>Analytical Data:</strong> We may collect non-identifiable, aggregated usage data (such as page views, browser type, and operating system) via light privacy-compliant telemetry. This is used solely to optimize website loading speeds and troubleshoot styling.</li>
              <li><strong>Contact Information:</strong> If you reach out to us via our Support form or email, we will only use your name and email address to reply to your inquiry.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-slate-500" />
              2. Cookies and Tracking Technologies
            </h3>
            <p>
              We use primary functional cookies and local storage tokens to remember your chosen conversion settings (such as target format and resolution scales) for a personalized session.
            </p>
            <p>
              Third-party partners, including Google AdSense or analytics networks, may use cookies to serve relevant advertisements based on your prior visits to our website or other sites on the Internet. You can choose to opt out of personalized advertising by visiting your Google Ad Settings or managing cookies in your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-slate-500" />
              3. Data Protection (GDPR & CCPA Compliance)
            </h3>
            <p>
              Because your personal data is handled client-side, we inherently satisfy the principles of <strong>Data Minimization</strong> and <strong>Privacy by Design</strong> under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
            </p>
            <p>
              You maintain absolute control over your digital footprint. To "delete" your history, simply refresh your browser, clear your local site cache, or close the tab—all temporary RAM structures are instantly discarded.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">
              4. Changes to This Privacy Policy
            </h3>
            <p>
              We may update this Privacy Policy from time to time to reflect adjustments in web standards or regulatory requirements. Any modifications will be posted here with an updated revision date.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-slate-900">
              5. Contacting Our Data Officer
            </h3>
            <p>
              If you have any questions or security audits regarding our local processing methods, please reach out to us through our contact page or at: <strong className="text-slate-800">support@imagecompressor.example.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
