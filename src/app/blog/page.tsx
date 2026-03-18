import Link from "next/link";
import blogPosts from "../../../public/data/blog-posts.json";

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 상단 헤더 */}
      <header className="bg-orange-500 text-white py-8 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-orange-100 hover:text-white transition-colors text-sm mb-2 block">
            ← 메인으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold">📚 알뜰살뜰 생활 블로그</h1>
          <p className="text-orange-100 italic">우리 동네 유용한 정보와 꿀팁을 AI가 전해드려요.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/blog/${post.id}`} className="group">
                <span className="text-sm text-slate-400 font-medium">{post.date}</span>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed line-clamp-2 md:line-clamp-none mb-4">
                  {post.excerpt}
                </p>
                <span className="text-orange-500 font-bold text-sm">계속 읽기 →</span>
              </Link>
            </article>
          ))}
        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="bg-slate-100 text-slate-500 py-10 px-4 mt-12 border-t border-slate-200 text-center text-sm">
        <p>© 2024 우리 동네 생활 정보 블로그</p>
      </footer>
    </div>
  );
}
