import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Mail, MessageSquare, Send, CheckCircle2, Shield } from 'lucide-react';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <PageLayout title="Contact Us">
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10 grid md:grid-cols-12 gap-8 items-start">
        
        {/* Info Sidebar Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
              We'd love to hear from you
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Have questions about file limits, custom specifications, or experiencing issues compressing your photos? Drop us a message!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Direct Email Support</h4>
                <p className="text-xs text-slate-500 mt-1">dravexo8@gmail.com</p>
                <p className="text-xs text-blue-600 mt-1 font-medium">Average response time: &lt; 24 Hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Secure Transmission</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your message is encrypted end-to-end. We never sell or share your contact information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                Thank you for contacting us. Our technical support team has received your message and will review it shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Message Details
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our technical support help you today?"
                  required
                  rows={4}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Secure Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </PageLayout>
  );
}
