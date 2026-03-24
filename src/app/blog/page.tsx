import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogListPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 py-4 px-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-gray-900 text-xl tracking-tight">🏠 성남시 정보</Link>
          <div className="flex gap-6">
            <Link href="/" className="font-medium text-gray-500 hover:text-gray-900 transition-colors">홈</Link>
            <Link href="/blog" className="font-bold text-orange-600 border-b-2 border-orange-600">블로그</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 border-b border-gray-100 pb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">블로그</h1>
        <p className="text-lg text-gray-600">우리 동네의 유용한 정보와 소식을 전해드립니다.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {allPostsData.length > 0 ? (
          allPostsData.map(({ slug, date, title, summary, category, tags }) => (
            <article key={slug} className="group border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full transform hover:-translate-y-1">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full mb-3 uppercase tracking-wider">
                  {category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2 leading-tight">
                  <Link href={`/blog/${slug}`}>{title}</Link>
                </h2>
                <div className="text-sm text-gray-400 font-medium">{date}</div>
              </div>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed line-clamp-3">
                {summary}
              </p>
              <div className="mt-auto border-t border-gray-50 pt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/blog/${slug}`} 
                  className="inline-flex items-center text-orange-600 font-semibold text-sm hover:underline"
                >
                  더 보기
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-500 text-lg">아직 작성된 블로그 글이 없습니다.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
