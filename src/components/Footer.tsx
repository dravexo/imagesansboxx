import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-200 bg-white/40 mt-16 relative z-10 font-medium">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-sm">
        {/* Tools */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800">Tools</h4>
          <ul className="space-y-2 text-slate-500">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Image Compressor</Link></li>
            <li><Link to="/pdf-compressor" className="hover:text-blue-600 transition-colors">PDF Compressor</Link></li>
            <li><Link to="/how-to-use" className="hover:text-blue-600 transition-colors">How to Use</Link></li>
          </ul>
        </div>
        
        {/* Resources */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800">Resources</h4>
          <ul className="space-y-2 text-slate-500">
            <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
            <li><Link to="/government-form-guide" className="hover:text-blue-600 transition-colors">Government Form Guide</Link></li>
            <li><Link to="/job-application-guide" className="hover:text-blue-600 transition-colors">Job Application Guide</Link></li>
            <li><Link to="/indian-govt-size-guide" className="hover:text-blue-600 transition-colors">Indian Govt. Size Guide</Link></li>
          </ul>
        </div>

        {/* Legal & Trust */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800">Company & Trust</h4>
          <ul className="space-y-2 text-slate-500">
            <li><Link to="/about-us" className="hover:text-blue-600 transition-colors">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-500 space-y-2 border-t border-slate-200/50 pt-8 max-w-4xl mx-auto">
        <p>
          Designed for developers, designers, and privacy advocates.
        </p>
        <p className="flex items-center justify-center gap-1">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>locally in your Sandbox.</span>
        </p>
      </div>
    </footer>
  );
}
