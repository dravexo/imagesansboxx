import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';
import GoogleAnalyticsHead from './components/GoogleAnalyticsHead';


import ImageCompressor from './pages/ImageCompressor.tsx';
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
const NotFound = lazy(() => import('./pages/NotFound'));


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
        <GoogleAnalyticsHead />

        <Routes>
          <Route path="/" element={<ImageCompressor />} />

          {/* Lazy routes */}
          <Route
            path="/pdf-compressor"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <PdfCompressor />
              </Suspense>
            }
          />
          <Route
            path="/how-to-use"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <HowToUse />
              </Suspense>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ContactUs />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <BlogPost />
              </Suspense>
            }
          />
          <Route
            path="/government-form-guide"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <GovernmentFormGuide />
              </Suspense>
            }
          />
          <Route
            path="/job-application-guide"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <JobApplicationGuide />
              </Suspense>
            }
          />
          <Route
            path="/indian-govt-size-guide"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <IndianGovtSizeGuide />
              </Suspense>
            }
          />
          <Route
            path="/about-us"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <TermsOfService />
              </Suspense>
            }
          />

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

