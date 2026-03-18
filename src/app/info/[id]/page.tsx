import Link from "next/link";
import data from "../../../../public/data/local-info.json";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function InfoDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = data.find((d) => d.id === parseInt(id));

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a192f] font-sans text-gray-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 뒤로 가기 버튼 */}
        <Link 
          href="/" 
          className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors mb-8 group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> 
          메인으로 돌아가기
        </Link>

        {/* 상세 내용 카드 */}
        <div className="bg-[#112240] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5 backdrop-blur-sm">
          <div className="inline-block px-4 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-semibold mb-6 border border-orange-500/20">
            {item.category}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            {item.name}
          </h1>

          <div className="space-y-6 text-lg mb-10 border-y border-white/5 py-8">
            <DetailItem icon="📅" label="기간" value={`${item.startDate} ~ ${item.endDate}`} />
            <DetailItem icon="📍" label="장소" value={item.location} />
            <DetailItem icon="👥" label="대상" value={item.target} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">상세 내용</h2>
            <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
              {item.summary}
              {"\n\n"}이 정보는 성남시 시민분들의 편의를 위해 제공되는 샘플 데이터입니다. 실제 신청 시에는 반드시 공식 홈페이지나 관할 부서에 다시 한번 확인해 주시기 바랍니다.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <a 
              href={item.link} 
              className="block w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-center py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/20 shadow-orange-500/10"
            >
              공식 홈페이지에서 자세히 보기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-2xl mt-1">{icon}</span>
      <div>
        <div className="text-sm text-gray-500 font-medium mb-1">{label}</div>
        <div className="text-white font-semibold">{value}</div>
      </div>
    </div>
  );
}
