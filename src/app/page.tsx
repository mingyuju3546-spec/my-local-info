import Image from "next/image";
import Link from "next/link";
import data from "../../public/data/local-info.json";

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
  const events = data.filter((item) => item.category === "행사/축제");
  const benefits = data.filter((item) => item.category === "지원금/혜택");

  return (
    <div className="min-h-screen bg-[#0a192f] font-sans text-gray-200">
      {/* 1. 상단 헤더 - 어두운 배경에 어울리는 네온 오렌지 포인트 */}
      <header className="relative bg-gradient-to-b from-[#112240] to-transparent py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/5 blur-3xl rounded-full translate-y-[-50%] transform"></div>
        <h1 className="relative text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          성남시 생활 정보 <span className="text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]">✨</span>
        </h1>
        <p className="relative text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          우리 동네의 따끈따끈한 소식을 가장 빠르고 정확하게 확인하세요.
        </p>
      </header>

      <main className="max-w-6xl mx-auto py-10 px-4 space-y-20">
        {/* 2. 이번 달 행사/축제 섹션 */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl bg-orange-500/10 p-2 rounded-xl border border-orange-500/20">🎉</span>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent italic">
                이달의 행사/축제
              </h2>
            </div>
            <span className="text-xs text-orange-400/60 font-mono uppercase tracking-widest">Live Now</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((item) => (
              <InfoCard key={item.id} item={item} color="orange" />
            ))}
          </div>
        </section>

        {/* 3. 지원금/혜택 정보 섹션 */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl bg-yellow-500/10 p-2 rounded-xl border border-yellow-500/20">💰</span>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent italic">
                지원금/혜택 정보
              </h2>
            </div>
            <span className="text-xs text-yellow-400/60 font-mono uppercase tracking-widest">Exclusive</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item) => (
              <InfoCard key={item.id} item={item} color="yellow" />
            ))}
          </div>
        </section>
      </main>

      {/* 4. 하단 푸터 */}
      <footer className="bg-[#020c1b] border-t border-white/5 mt-32 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-gray-500 text-sm">데이터 출처: 공공데이터포털 (Public Data Portal)</p>
          <p className="text-orange-400/70 text-xs font-semibold">마지막 업데이트: 2024년 3월 18일</p>
          <div className="pt-8 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-[0.2em]">
             &copy; 2024 Our Neighborhood Life Info. Built for Seongnam Citizens.
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({ item, color }: { item: any; color: "orange" | "yellow" }) {
  const accentColor = color === "orange" ? "orange" : "yellow";
  const borderClass = color === "orange" ? "border-orange-500/20" : "border-yellow-500/20";
  const bgAccentClass = color === "orange" ? "bg-orange-400" : "bg-yellow-400";
  const textAccentClass = color === "orange" ? "text-orange-400" : "text-yellow-400";

  return (
    <div className={`group bg-[#112240] rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:shadow-${accentColor}-500/5 transition-all duration-500 border border-white/5 hover:${borderClass} flex flex-col relative overflow-hidden`}>
      {/* 카드 배경 장식 */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${bgAccentClass}/5 blur-3xl rounded-full group-hover:blur-2xl transition-all duration-500`}></div>
      
      <div className="relative flex-grow">
        <div className={`inline-block px-3 py-0.5 rounded-full ${color === "orange" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"} text-[10px] font-bold mb-4 border uppercase tracking-wider`}>
          {item.category}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white leading-tight group-hover:text-orange-300 transition-colors">
          {item.name}
        </h3>
        
        <div className="space-y-3 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-2.5">
            <span className={`${textAccentClass} text-base opacity-70`}>📅</span>
            <span className="font-medium">
              {item.startDate === item.endDate 
                ? item.startDate 
                : `${item.startDate} ~ ${item.endDate}`}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className={`${textAccentClass} text-base opacity-70`}>📍</span>
            <span className="font-medium">{item.location}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed group-hover:text-gray-400 transition-colors">
          {item.summary}
        </p>
      </div>
      
      <Link 
        href={item.link} 
        className={`relative inline-flex items-center justify-center bg-[#1d355e] hover:${bgAccentClass} text-white group-hover:text-[#0a192f] py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-${accentColor}-500/20 group-hover:translate-y-[-2px]`}
      >
        상세 정보 확인하기
        <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
      </Link>
    </div>
  );
}
