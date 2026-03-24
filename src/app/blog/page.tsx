import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogListPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <nav className="border-b border-slate-200 py-5 px-4 sticky top-0 bg-white/90 backdrop-blur-xl z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-extrabold text-slate-900 text-xl tracking-tight">🏠 김해시 정보</Link>
          <div className="flex gap-8">
            <Link href="/" className="font-bold text-slate-500 hover:text-slate-900 transition-colors">홈</Link>
            <Link href="/blog" className="font-bold text-orange-600 border-b-2 border-orange-600 pb-1">블로그</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">블로그</h1>
          <p className="text-xl text-slate-600 font-medium">우리 동네의 유용한 정보와 소식을 전해드립니다.</p>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-8 rounded-full"></div>
        </header>

        <div className="grid gap-10 md:grid-cols-2">
          {allPostsData.length > 0 ? (
            allPostsData.map(({ slug, date, title, summary, category, tags }) => (
              <article key={slug} className="group border border-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 bg-white flex flex-col h-full transform hover:-translate-y-2">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 text-xs font-bold text-orange-700 bg-orange-100 rounded-full mb-4 uppercase tracking-widest">
                    {category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors mb-3 leading-tight">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                  </h2>
                  <div className="text-sm text-slate-400 font-semibold">{date}</div>
                </div>
                <p className="text-slate-600 mb-8 flex-grow leading-relaxed line-clamp-3 font-medium">
                  {summary}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-50">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                      <span key={tag} className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${slug}`} 
                    className="inline-flex items-center text-orange-600 font-bold text-sm group/btn"
                  >
                    더 보기
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 7l5 5-5 5" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xl font-bold">아직 작성된 블로그 글이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
