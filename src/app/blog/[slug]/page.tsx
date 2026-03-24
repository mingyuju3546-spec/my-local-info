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
    <div className="min-h-screen font-sans text-slate-900">
      <nav className="border-b border-slate-200 py-5 px-4 sticky top-0 bg-white/90 backdrop-blur-xl z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/blog" className="text-slate-500 hover:text-orange-600 font-semibold transition-all flex items-center gap-2 group">
            <span className="transition-transform group-hover:-translate-x-1">←</span> 블로그 목록
          </Link>
          <Link href="/" className="font-extrabold text-slate-900 text-xl tracking-tight">🏠 홈</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <article className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-14">
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="px-4 py-1.5 text-xs font-bold text-orange-700 bg-orange-100 rounded-full uppercase tracking-widest">
                  {postData.category}
                </span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-slate-500 font-medium text-sm">{postData.date}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                {postData.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-2">
                {postData.tags.map((tag) => (
                  <span key={tag} className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full hover:bg-slate-200 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose prose-slate lg:prose-xl mx-auto max-w-none border-t border-slate-100 pt-12 prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-a:text-orange-600 prose-img:rounded-2xl shadow-slate-50">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {postData.content}
              </ReactMarkdown>
            </div>

            <div className="mt-20 pt-10 border-t border-slate-100 flex justify-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center px-8 py-3 bg-slate-900 text-white rounded-2xl hover:bg-orange-600 transition-all font-bold group shadow-lg shadow-slate-200"
              >
                <svg className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
