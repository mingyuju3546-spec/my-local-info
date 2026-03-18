import Link from "next/link";
import blogPosts from "../../../../public/data/blog-posts.json";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
}

// Cloudflare Pages (Static Export)에서는 빌드 타임에 경로를 미리 알아야 합니다.
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* 상단 네비게이션 */}
      <nav className="border-b border-slate-100 py-4 px-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/blog" className="text-slate-500 hover:text-orange-600 transition-colors flex items-center gap-1">
            <span>←</span> 목록으로
          </Link>
          <Link href="/" className="font-bold text-orange-500">🏠 홈으로</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <article>
          <header className="mb-12 text-center">
            <time className="text-slate-400 text-sm font-medium mb-4 block">{post.date}</time>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-500 italic text-sm">
              <span>작성자: {post.author}</span>
            </div>
          </header>

          <div className="prose prose-slate prose-lg mx-auto leading-relaxed text-slate-700 whitespace-pre-wrap">
            {post.content}
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-amber-50 border border-amber-100 flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-amber-800 mb-1">📢 함께 보면 좋은 정보</h4>
              <p className="text-sm text-amber-700">성남시의 또 다른 생활 정보들이 궁금하신가요?</p>
            </div>
            <Link 
              href="/" 
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-sm ml-auto"
            >
              메인 페이지 가기
            </Link>
          </div>
        </article>
      </main>

      <footer className="bg-slate-50 border-t border-slate-100 py-12 px-4 text-center">
        <p className="text-slate-400 text-xs">본 글은 공공데이터를 기반으로 AI가 자동 작성한 글입니다.</p>
      </footer>
    </div>
  );
}
