import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { ArrowRight, CheckCircle, DollarSign, MapPin, Ticket, Image, FileText } from 'lucide-react';

const faqJsonLd = [
  {
    question: 'Did anyone win the Mega Millions last night?',
    answer: 'Check the official Mega Millions website or state lottery sites like the Florida Lottery for the latest drawing results. Winning numbers and jackpot winner information are posted shortly after each drawing.',
  },
  {
    question: 'Who won the Mega Millions last night?',
    answer: 'Winner information is published by state lottery agencies. In Florida, the Florida Lottery website posts the winner name, city, and retailer location for Mega Millions jackpot winners.',
  },
  {
    question: 'What are the Mega Millions winning numbers?',
    answer: 'Mega Millions winning numbers consist of five white ball numbers (1-70) and one gold Mega Ball number (1-25). Results are updated on the official Mega Millions website after each Tuesday and Friday drawing.',
  },
  {
    question: 'Where was the winning Mega Millions ticket sold?',
    answer: 'Winning Mega Millions tickets are sold at authorized lottery retailers across participating states. The state lottery publishes the retail location, city, and state where the winning ticket was purchased.',
  },
  {
    question: 'How do I claim a Mega Millions jackpot in Florida?',
    answer: 'Florida Mega Millions winners can claim prizes at Florida Lottery claim centers in Tallahassee, Miami, Tampa, Jacksonville, and Fort Lauderdale. You need a valid government ID, signed claim form, and the winning ticket.',
  },
  {
    question: 'What is the Mega Millions jackpot amount?',
    answer: 'The Mega Millions jackpot starts at $20 million and grows with each drawing without a winner. Jackpots can reach billions of dollars before a winning ticket is sold.',
  },
  {
    question: 'How can I prepare documents for a lottery claim?',
    answer: 'Use our free image compressor to optimize your ID photo (20KB-200KB), signature (10KB-100KB), and ticket scans. All processing happens client-side for privacy.',
  },
  {
    question: 'Where in Florida was the Mega Millions won?',
    answer: 'Florida Mega Millions winners come from cities across the state including Miami, Tampa, Orlando, Jacksonville, and Fort Lauderdale. The Florida Lottery publishes the specific city and retailer for each winning ticket.',
  },
];

export default function MegaMillions() {
  return (
    <PageLayout
      title="Mega Millions"
      seo={{
        title: 'Mega Millions Jackpot & Winning Numbers 2026 | Florida Lottery Results | ImageSandboxX',
        description: 'Check Mega Millions winning numbers, jackpot amounts, Florida lottery results, and who won last night. Plus learn how to prepare your claim documents with our free image compressor.',
        canonicalUrl: 'https://imagesandboxx.online/mega-millions',
        faqJsonLd,
      }}
    >
      <div className="max-w-4xl w-full mx-auto space-y-16 pb-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Mega Millions <span className="text-blue-600">Jackpot</span> & Winning Numbers
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your complete resource for Mega Millions results — including who won last night, 
            where the winning ticket was sold, Florida Lottery updates, and how to prepare 
            your claim documents using our secure image compression tools.
          </p>
        </div>

        {/* Mega Millions Jackpot Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Mega Millions Jackpot</h2>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            The Mega Millions jackpot is one of the largest lottery prizes in the world. Starting at $20 million, 
            the jackpot grows with every drawing that does not produce a grand prize winner. When the Mega Millions 
            jackpot rolls over repeatedly, prizes can reach billion-dollar amounts — making headlines worldwide as 
            people ask "did anyone win the Mega Millions last night?"
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Drawings are held every Tuesday and Friday at 11:00 PM ET. Tickets cost $2 per play, and players 
            choose five numbers from 1 to 70 and one Mega Ball number from 1 to 25. The Mega Millions jackpot 
            can be paid as an annuity (30 payments over 29 years) or as a lump sum cash option.
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-slate-900 mb-3 text-lg">Past Mega Millions Jackpot Highlights</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-slate-700"><strong>$1.602 Billion</strong> — Mega Millions jackpot won in Florida on August 8, 2023 (largest Mega Millions jackpot ever)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-slate-700"><strong>$1.337 Billion</strong> — Mega Millions jackpot won in Illinois on July 29, 2022</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-slate-700"><strong>$1.050 Billion</strong> — Mega Millions jackpot won in Michigan on January 22, 2021</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Mega Millions Winning Numbers Guide */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Mega Millions Winning Numbers</h2>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Every Mega Millions drawing produces a set of winning numbers — five white ball numbers (1-70) 
            and one gold Mega Ball number (1-25). The Mega Millions winning numbers are published on the 
            official Mega Millions website, state lottery websites (including the Florida Lottery), and 
            major news outlets shortly after each drawing.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            If you are checking "what are the Mega Millions winning numbers" or "Mega Millions number" 
            results, you can visit the Mega Millions official website or your state lottery's website. 
            The Florida Lottery publishes Mega Millions winning numbers for Florida players immediately 
            after each drawing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Prize Tiers</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex justify-between"><span>Jackpot</span><span className="font-semibold">5 + Mega Ball</span></li>
                <li className="flex justify-between"><span>$1 Million</span><span className="font-semibold">5 numbers</span></li>
                <li className="flex justify-between"><span>$10,000</span><span className="font-semibold">4 + Mega Ball</span></li>
                <li className="flex justify-between"><span>$500</span><span className="font-semibold">4 numbers</span></li>
                <li className="flex justify-between"><span>$10</span><span className="font-semibold">3 numbers</span></li>
                <li className="flex justify-between"><span>$4</span><span className="font-semibold">2 + Mega Ball / 1 + Mega Ball / Mega Ball</span></li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Where to Check Results</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <span>Mega Millions official website</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <span>Florida Lottery website (flalottery.com)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <span>State lottery apps (Florida Lottery App)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <span>Major news websites and lottery result aggregators</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Florida Lottery Mega Millions Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Mega Millions Florida</h2>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Florida is one of the most active Mega Millions states, with millions of tickets sold for every drawing. 
            The Florida Mega Millions winner history includes some of the largest jackpots ever won, including the 
            record $1.602 billion jackpot won in Neptune Beach, Florida on August 8, 2023. For those asking 
            "where in Florida was Mega Millions won," winning tickets have been sold across the state.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            The Florida Mega Millions game is managed by the Florida Lottery, which publishes winning numbers, 
            winner information, and retailer details on their official website. Florida is also one of the states 
            that allows Mega Millions winners to remain anonymous under certain conditions.
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
            <h3 className="font-bold text-slate-900 mb-3 text-lg">Florida Lottery Claim Centers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" /> Tallahassee (Headquarters)</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" /> Miami</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" /> Tampa</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" /> Jacksonville</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" /> Fort Lauderdale</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600" /> Orlando</div>
            </div>
          </div>
        </section>

        {/* Who Won Mega Millions - Winner Tracking */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Who Won Mega Millions?</h2>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            For those asking "who won the Mega Millions last night" or "who won mega millions," the answer 
            depends on whether a ticket matched all six numbers in the most recent drawing. When a Mega Millions 
            jackpot is won, the winner's name, city of residence, and the retailer where the ticket was purchased 
            are typically announced by the state lottery within days of the claim being validated.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            If no ticket matches all six numbers, the Mega Millions jackpot rolls over to the next drawing, 
            and the answer to "did anyone win the Mega Millions" is no — but many players still win smaller 
            prizes for matching fewer numbers. Check the Mega Millions website or Florida Lottery for the 
            most recent "did someone win the Mega Millions" results.
          </p>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-bold text-slate-900 mb-2 text-lg">What to Do If You Win</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Sign the back of your winning Mega Millions ticket immediately</li>
              <li>Store the ticket in a safe place (safe deposit box recommended)</li>
              <li>Contact a financial advisor and attorney before claiming</li>
              <li>Prepare your documents using our image compressor for clean, properly-sized ID and signature files</li>
              <li>Visit your state lottery claim center with your winning ticket and identification</li>
            </ol>
          </div>
        </section>

        {/* Document Preparation Section */}
        <section className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-rose-100 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Image className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Prepare Your Claim Documents</h2>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Whether you are checking "did anyone win Mega Millions last night" or celebrating your own win, 
            properly preparing your claim documents is essential. State lottery portals require specific file 
            formats and sizes for ID photos, signature scans, and ticket copies. Use our free, client-side 
            image compressor to optimize your documents without uploading sensitive files to external servers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <Link to="/" className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all group">
              <Image className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900">Image Compressor</span>
              <span className="text-sm text-slate-500 text-center">Optimize ID photos and ticket scans to exact file sizes</span>
              <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/pdf-compressor" className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all group">
              <FileText className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900">PDF Compressor</span>
              <span className="text-sm text-slate-500 text-center">Shrink bank statements and residency proofs</span>
              <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/blog/mega-millions-winning-documents-guide" className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all group">
              <DollarSign className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900">Full Guide</span>
              <span className="text-sm text-slate-500 text-center">Read our complete Mega Millions document guide</span>
              <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-8 text-center">
            Mega Millions FAQ
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqJsonLd.map((faq, index) => (
              <details key={index} className="group bg-slate-50 rounded-2xl p-6 border border-slate-200 open:border-blue-200 open:bg-blue-50/30 transition-all">
                <summary className="text-lg font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            More Resources
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-700 underline font-medium">
              Image Compressor
            </Link>
            <Link to="/pdf-compressor" className="text-blue-600 hover:text-blue-700 underline font-medium">
              PDF Compressor
            </Link>
            <Link to="/blog" className="text-blue-600 hover:text-blue-700 underline font-medium">
              All Blog Articles
            </Link>
            <Link to="/blog/mega-millions-winning-documents-guide" className="text-blue-600 hover:text-blue-700 underline font-medium">
              Mega Millions Document Guide
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

