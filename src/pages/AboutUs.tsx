import React from 'react';
import PageLayout from '../components/PageLayout';
import { Shield, Sparkles, Heart, Users, Target, Award } from 'lucide-react';

export default function AboutUs() {
  return (
    <PageLayout title="About Us">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
            About Our Image & PDF Compression Service
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We build state-of-the-art, secure, and lightning-fast media optimization tools to help individuals and businesses compress documents perfectly.
          </p>
        </div>

        {/* Core Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 pt-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Our Mission</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our ultimate objective is to eliminate the frustration of navigating outdated portal specifications. We help you easily compress images to 50KB, 100KB, or custom sizes, ensuring your applications, documents, and government submissions are processed seamlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">100% Privacy & Security</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We stand apart through our offline-first and sandboxed browser processing. Your files are never sent to a remote server. Everything is compressed locally on your device, guaranteeing absolute security and compliance with international privacy laws.
            </p>
          </div>
        </div>

        {/* Expertise, Authority, and Trustworthiness (E-A-T) block */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Award className="w-48 h-48" />
          </div>
          <div className="max-w-2xl space-y-6 relative z-10">
            <h3 className="text-2xl font-bold font-display">Built by Media Optimization Experts</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our team consists of web performance engineers and open-source advocates who understand the science behind pixel-perfect resampling, high-fidelity chroma subsampling, and structural PDF optimizations.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              By utilizing client-side canvas API rendering and native Assembly-driven compression frameworks, we avoid unnecessary cloud hops. This means zero latency, no subscription barriers, and high-performance throughput on both mobile devices and desktops.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Over 1M+ Files Processed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Zero Server Uploads</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Free & Open Source</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Google Trusts Us / FAQ elements inside about */}
        <div className="space-y-6 pt-6">
          <h3 className="text-2xl font-bold text-slate-800 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 text-base">Is there any file limit or hidden cost?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                No. Because our platform compresses your files natively inside your browser, we do not incur heavy hosting fees. We happily pass these savings on to you with 100% free, unlimited, and restriction-free compression.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 text-base">How do I achieve a precise file size?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our tools include quality adjustment slides, target size presets (like 20KB, 50KB, 100KB, 200KB), and dimensions limits. Our advanced resampling algorithms adjust quality iteratively to match your target file constraint perfectly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
