import Link from "next/link";
import infoData from "../../../../public/data/local-info.json";
import { notFound } from "next/navigation";

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

// Cloudflare Pages (Static Export)를 위한 정적 경로 생성
export function generateStaticParams() {
  return (infoData as InfoItem[]).map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function InfoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = (infoData as InfoItem[]).find((p) => p.id === parseInt(id));

  if (!item) {
    notFound();
  }

  const isEvent = item.category === "행사";
  const themeColor = isEvent ? "pink" : "rose";
  const bgColor = isEvent ? "bg-pink-500" : "bg-rose-500";
  const hoverColor = isEvent ? "hover:bg-pink-600" : "hover:bg-rose-600";
  const textColor = isEvent ? "text-pink-700" : "text-rose-700";
  const subBgColor = isEvent ? "bg-pink-50" : "bg-rose-50";
  const subBorderColor = isEvent ? "border-pink-100" : "border-rose-100";

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-slate-800">
      {/* 상단 네비게이션 */}
      <nav className="border-b border-slate-100 py-4 px-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-slate-500 hover:text-pink-600 transition-colors flex items-center gap-1">
            <span>←</span> 목록으로 돌아가기
          </Link>
          <Link href="/" className="font-bold text-pink-500 text-xl">🏠 홈</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* 헤더 섹션 */}
          <header className={`p-8 md:p-12 ${subBgColor} border-b ${subBorderColor}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${isEvent ? "bg-pink-200 text-pink-800" : "bg-rose-200 text-rose-800"}`}>
                {item.category}
              </span>
              <span className="text-slate-400 text-sm">
                {item.startDate === item.endDate ? item.startDate : `${item.startDate} ~ ${item.endDate}`}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              {item.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">📍</span>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">장소</p>
                  <p className="font-medium text-slate-700">{item.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">👥</span>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">대상</p>
                  <p className="font-medium text-slate-700">{item.target}</p>
                </div>
              </div>
            </div>
          </header>

          {/* 상세 내용 섹션 */}
          <div className="p-8 md:p-12">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className={textColor}>|</span> 상세 정보
            </h2>
            <div className="prose prose-slate prose-lg max-w-none leading-relaxed text-slate-700 whitespace-pre-wrap">
              {item.summary}
            </div>

            {/* 원본 링크 버튼 */}
            <div className="mt-12 flex flex-col items-center border-t border-slate-100 pt-10">
              <p className="text-sm text-slate-400 mb-4">더 자세한 내용이 궁금하신가요?</p>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full md:w-auto px-10 py-4 ${bgColor} ${hoverColor} text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg`}
              >
                자세히 보기 <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </article>

        {/* 하단 안내 */}
        <div className="mt-12 text-center text-slate-400 text-xs">
          <p>본 정보는 공공데이터를 기반으로 제공되며, 현지 사정에 따라 변경될 수 있습니다.</p>
          <p className="mt-1">© 2024 성남시 생활 정보 가이드</p>
        </div>
      </main>
    </div>
  );
}
