import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ShareButton from '../components/ShareButton';
import { blogPosts } from '../data/blogPosts';
import { Clock, Calendar, ArrowRight, Gift } from 'lucide-react';

export default function Blog() {
  return (
    <PageLayout title="Blog">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
            Latest Articles & Guides
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Deep dives into image optimization, data privacy, and web performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => {
            const shareUrl = `${window.location.origin}/blog/${post.slug}`;

            return (
              <div
                key={post.id}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`} className="block flex-1">
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="450"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      <span>Read full article</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>

                <div className="px-6 pb-6 pt-0">
                  <ShareButton
                    title={post.title}
                    text={`Read this: ${post.title}`}
                    url={shareUrl}
                    label="Share for bonus"
                    variant="outline"
                    className="w-full justify-center"
                    showIncentive
                  />
                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-600">
                    <Gift className="w-3.5 h-3.5" />
                    Share to unlock more value
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
