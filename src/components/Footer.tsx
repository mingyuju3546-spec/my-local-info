import Link from "next/link";

export default function Footer() {
  const lastUpdated = new Date().toLocaleDateString("ko-KR");
  
  return (
    <footer className="bg-slate-100 text-slate-500 py-10 px-4 mt-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-sm text-center">
        <p>데이터 출처: 공공데이터포털 (data.go.kr)</p>
        
        {/* 방문자 카운터 */}
        <div className="py-2">
          <img 
            src="https://komarev.com/ghpvc/?username=gimhaeinfo-com&color=ff69b4&style=flat-square&label=VISITORS" 
            alt="Visitors Counter"
            className="hover:opacity-80 transition-opacity"
          />
        </div>

        <p>마지막 업데이트: {lastUpdated}</p>
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-xs font-medium">© 2024 김해시 생활 정보. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/" className="hover:underline">홈</Link>
            <Link href="/blog" className="hover:underline">블로그</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
