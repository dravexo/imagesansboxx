import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';

const ImageCompressor = lazy(() => import('./pages/ImageCompressor'));
const PdfCompressor = lazy(() => import('./pages/PdfCompressor'));
const HowToUse = lazy(() => import('./pages/HowToUse'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const GovernmentFormGuide = lazy(() => import('./pages/GovernmentFormGuide'));
const JobApplicationGuide = lazy(() => import('./pages/JobApplicationGuide'));
const IndianGovtSizeGuide = lazy(() => import('./pages/IndianGovtSizeGuide'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 space-y-4">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
    <span className="text-sm font-medium animate-pulse">Loading experience...</span>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<ImageCompressor />} />
            <Route path="/pdf-compressor" element={<PdfCompressor />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/government-form-guide" element={<GovernmentFormGuide />} />
            <Route path="/job-application-guide" element={<JobApplicationGuide />} />
            <Route path="/indian-govt-size-guide" element={<IndianGovtSizeGuide />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
