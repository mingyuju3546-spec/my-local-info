import Link from "next/link";
import VisitorCounter from "@/components/VisitorCounter";

export default function Footer() {
  const lastUpdated = new Date().toLocaleDateString("ko-KR");
  
  return (
    <footer className="bg-slate-100 text-slate-500 py-10 px-4 mt-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-sm text-center">
        <p>데이터 출처: 공공데이터포털 (data.go.kr)</p>
        
        {/* 방문자 카운터 - 세션당 1회만 카운트 */}
        <VisitorCounter />

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
