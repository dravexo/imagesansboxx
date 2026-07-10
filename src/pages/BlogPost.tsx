import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { blogPosts, ContentBlock } from '../data/blogPosts';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'h2':
        return <h2 key={index} className="text-3xl font-bold font-display text-slate-900 mt-12 mb-6 tracking-tight">{block.content}</h2>;
      case 'h3':
        return <h3 key={index} className="text-2xl font-bold font-display text-slate-800 mt-8 mb-4 tracking-tight">{block.content}</h3>;
      case 'p':
        return <p key={index} className="text-lg text-slate-600 leading-relaxed mb-6">{block.content}</p>;
      case 'list':
        if (Array.isArray(block.content)) {
          return (
            <ul key={index} className="list-disc list-inside space-y-3 text-lg text-slate-600 mb-8 ml-4">
              {block.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 my-10 italic text-xl text-slate-700 bg-blue-50/50 py-6 rounded-r-xl">
            "{block.content}"
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout title="Blog">
      <article className="max-w-3xl w-full mx-auto pb-20">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to all articles
          </Link>
        </div>

        <header className="mb-12 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="text-xl text-slate-500 leading-relaxed font-medium mb-12 pb-12 border-b border-slate-200">
            {post.excerpt}
          </div>
          
          {post.blocks.map((block, index) => renderBlock(block, index))}
        </div>
      </article>
    </PageLayout>
  );
}
