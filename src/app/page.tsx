import Image from "next/image";
import Link from "next/link";
import infoData from "../../public/data/local-info.json";
import blogPosts from "../../public/data/blog-posts.json";

interface InfoItem {
  id: number;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  link: string;
}

export default function Home() {
  const events = infoData.filter((item) => item.category === "행사");
  const benefits = infoData.filter((item) => item.category === "혜택");
  const recentBlogs = blogPosts.slice(0, 2);
  const lastUpdated = new Date().toLocaleDateString("ko-KR");

  return (
    <div className="min-h-screen bg-pink-100 font-sans text-slate-800">
      {/* 상단 헤더 */}
      <header className="bg-gradient-to-b from-pink-200 to-pink-700 text-white py-8 px-4 shadow-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">🏠 성남시 생활 정보</h1>
            <p className="text-white/80 italic text-sm font-medium">우리 동네 축제, 행사부터 꿀맛 같은 혜택까지!</p>
          </div>
          <nav className="flex gap-4">
            <Link href="/" className="px-4 py-2 bg-white/20 rounded-lg font-bold hover:bg-white/30 transition-colors">홈</Link>
            <Link href="/blog" className="px-4 py-2 bg-pink-600 rounded-lg font-bold hover:bg-pink-700 transition-colors">블로그</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-16">
        {/* 이번 달 행사/축제 섹션 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🎉</span>
            <h2 className="text-2xl font-bold text-pink-700">이번 달 행사/축제</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} item={event} color="orange" />
            ))}
          </div>
        </section>

        {/* 지원금/혜택 섹션 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">💰</span>
            <h2 className="text-2xl font-bold text-rose-700">지원금/혜택 정보</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.id} item={benefit} color="amber" />
            ))}
          </div>
        </section>

        {/* 최신 블로그 섹션 */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-pink-200">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✍️</span>
              <h2 className="text-2xl font-bold text-slate-800">최신 생활 꿀팁</h2>
            </div>
            <Link href="/blog" className="text-pink-500 font-bold hover:underline transition-all">전체보기 →</Link>
          </div>
          <div className="space-y-6">
            {recentBlogs.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                <span className="text-xs text-slate-400 block mb-1">{post.date}</span>
                <h3 className="text-xl font-bold group-hover:text-pink-600 transition-colors mb-2">{post.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 푸터 */}
      <footer className="bg-slate-100 text-slate-500 py-10 px-4 mt-12 border-t border-slate-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 text-sm">
          <p>데이터 출처: 공공데이터포털 (data.go.kr)</p>
          <p>마지막 업데이트: {lastUpdated}</p>
          <p className="mt-4 text-xs">© 2024 우리 동네 생활 정보. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Card({ item, color }: { item: InfoItem; color: "orange" | "amber" }) {
  const bgColor = "bg-white";
  const borderColor = color === "orange" ? "border-pink-100" : "border-rose-100";
  const tagColor = color === "orange" ? "bg-pink-100 text-pink-700" : "bg-rose-100 text-rose-700";
  const btnColor = color === "orange" ? "bg-pink-500 hover:bg-pink-600" : "bg-rose-500 hover:bg-rose-600";

  return (
    <div className={`p-6 rounded-2xl border-2 ${borderColor} ${bgColor} shadow-sm hover:shadow-md transition-shadow flex flex-col group`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${tagColor}`}>
          {item.category}
        </span>
        <span className="text-xs text-slate-400">
          {item.startDate === item.endDate ? item.startDate : `${item.startDate} ~ ${item.endDate}`}
        </span>
      </div>
      <Link href="/blog">
        <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-pink-600 transition-colors cursor-pointer">{item.name}</h3>
      </Link>
      <div className="space-y-2 mb-6 flex-grow">
        <p className="text-sm text-slate-600 flex gap-2">
          <span className="font-semibold shrink-0">📍 장소:</span> {item.location}
        </p>
        <p className="text-sm text-slate-600 flex gap-2">
          <span className="font-semibold shrink-0">👥 대상:</span> {item.target}
        </p>
        <p className="text-sm text-slate-500 mt-4 leading-relaxed line-clamp-2">
          {item.summary}
        </p>
      </div>
      <Link
        href="/blog"
        className={`mt-auto text-center py-3 rounded-xl text-white font-bold text-sm transition-colors ${btnColor}`}
      >
        상세 보기
      </Link>
    </div>
  );
}
