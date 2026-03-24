import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">포스트를 찾을 수 없습니다.</h1>
        <Link href="/blog" className="text-orange-600 hover:underline">블로그 목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 py-4 px-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/blog" className="text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-1">
            <span>←</span> 블로그 목록
          </Link>
          <Link href="/" className="font-bold text-gray-900 text-xl">🏠 홈</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full uppercase tracking-wider">
            {postData.category}
          </span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-gray-400 text-sm">{postData.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          {postData.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {postData.tags.map((tag) => (
            <span key={tag} className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-orange lg:prose-lg mx-auto max-w-none border-t border-gray-100 pt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {postData.content}
        </ReactMarkdown>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors font-medium group"
        >
          <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </Link>
      </div>
      </article>
    </div>
  );
}
