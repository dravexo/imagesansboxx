import React from 'react';
import PageLayout from '../components/PageLayout';
import { Scale, ShieldCheck, FileText, CheckCircle } from 'lucide-react';

export default function TermsOfService() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <PageLayout title="Terms of Service">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 relative z-10 text-slate-700">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Scale className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Effective date: {currentDate}
          </p>
        </div>

        {/* Introduction */}
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            Welcome to our Image & PDF Compressor service. By accessing or using our website, tools, and widgets, you agree to comply with and be bound by the following terms, conditions, and disclaimers. Please review them carefully.
          </p>
        </div>

        {/* Section Blocks */}
        <div className="space-y-8 text-sm leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" />
              1. Acceptance of Terms
            </h3>
            <p>
              By utilizing our free services, you affirm that you possess the legal capacity to enter into these Terms of Service. If you do not agree to any part of these terms, you are prohibited from using the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-500" />
              2. Permitted Use & Local Processing
            </h3>
            <p>
              We grant you a personal, non-exclusive, non-transferable, and revocable license to use our web compression platform for personal or professional needs.
            </p>
            <p>
              Because our systems operate entirely client-side, you retain 100% intellectual property ownership of any photo, graphics, or document file processed through our tools. You are solely responsible for ensuring you have the necessary rights and consents to process and download your media.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-slate-500" />
              3. Prohibited Conduct
            </h3>
            <p>
              You agree not to engage in any activity that could compromise, disrupt, or damage our website or server delivery networks. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Attempting to bypass built-in page speed optimization structures.</li>
              <li>Injecting malicious software, viruses, or cross-site scripting (XSS) into contact fields.</li>
              <li>Using automated scraping tools or denial-of-service bots against our assets.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">
              4. Disclaimer of Warranties
            </h3>
            <p>
              This application and its tools are provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied. We do not guarantee that the compression quality will meet specific external expectations or that the platform will operate completely error-free.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">
              5. Limitation of Liability
            </h3>
            <p>
              Under no circumstances shall we, our developers, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from your use of or inability to use this platform, including file corruption or submission rejections by external portals.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-slate-900">
              6. Governing Law
            </h3>
            <p>
              These terms shall be governed by and interpreted in accordance with standard international digital law. Any disputes arising from these terms will be settled through constructive arbitration.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
