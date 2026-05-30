import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUP LOCAL TOOLS 소개 | 소방·건설 행정 통합 포털",
  description: "지역 주민과 현장 실무자를 위한 맞춤형 생활 정보 포털 및 행정 자동화 플랫폼 소개글입니다. 공공데이터포털 오픈 API 공식 데이터와 인공지능 기술(AI)의 융합.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] font-sans antialiased pb-20">
      
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-sm font-black tracking-widest text-[#4F46E5] uppercase">
                ← BUP LOCAL · HOME
              </span>
            </Link>
            <Link href="/blog" className="text-sm font-extrabold text-slate-700 hover:text-black transition-all">
              블로그
            </Link>
            <Link href="/about" className="text-sm font-extrabold text-slate-700 hover:text-[#4F46E5] transition-all">
              소개
            </Link>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">
            소개 안내
          </span>
        </div>
      </header>

      {/* 본문 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-6 mt-10">
        <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-10 space-y-10">
          
          {/* 타이틀 */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 bg-[#4F46E5] rounded-full"></span>
              <span className="text-xs sm:text-sm font-black tracking-widest text-[#4F46E5] uppercase">
                ABOUT PORTAL
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              BUP LOCAL TOOLS를 소개합니다
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-bold">
              우리는 투명성과 전문성(E-E-A-T)을 바탕으로 현장 실무자와 지역 사회에 유익한 가치를 창출합니다.
            </p>
          </div>

          {/* 세부 소개 항목들 */}
          <div className="space-y-8 font-sans text-base leading-relaxed text-[#374151]">
            
            {/* 1. 사이트 운영 목적 */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>📍</span> 지역 주민과 실무자를 위한 생활 및 행정 정보 제공
              </h3>
              <p className="font-bold pl-7">
                BUP LOCAL TOOLS는 건설 및 소방 현장에서 번거롭고 실수하기 쉬운 각종 법률 표준 서식 작성을 마찰 없이 신속하게 해결하는 **행정 자동화 도구**를 무료로 보급하고 있습니다. 이와 동시에, 지역 사회 소상공인과 신규 창업기업들이 정부의 복잡한 지원금이나 유용한 재정 혜택을 시기를 놓치지 않고 꼼꼼히 챙길 수 있도록 실시간 밀착 맞춤 정보를 제공합니다.
              </p>
            </div>

            {/* 2. 공식 공공데이터 기반 정보 제공 */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>🏛️</span> 검증된 공공데이터포털(data.go.kr) 공식 API 연동
              </h3>
              <p className="font-bold pl-7">
                본 웹사이트에 수록되는 모든 공모, 정부지원사업, 재정 보조금 정보는 행정안전부가 운영하는 **대한민국 공공데이터포털(data.go.kr)**의 공인된 오픈 API와 법적 고시 데이터를 바탕으로 자동 수집됩니다. 출처가 불분명한 헛소문이나 사설 정보를 완벽히 차단하고, 가장 권위 있고 투명한 국가 표준 정보를 가감 없이 그대로 정제하여 전달해 드립니다.
              </p>
            </div>

            {/* 3. 인공지능(AI) 기반 콘텐츠 정제 공정 */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>🤖</span> 구글 제미나이(Gemini AI) 기반 콘텐츠 생성 및 검증
              </h3>
              <p className="font-bold pl-7">
                소방 법규 및 국가 지원 정책 문서는 법률 용어가 너무나도 난해하고 복잡하여 일반 실무자들이 이해하기 매우 어렵습니다. 이에 본 서비스는 최첨단 인공지능인 **구글 제미나이 AI(Gemini 2.5 Flash)** 기술을 결합하여, 딱딱하고 복잡한 행정 텍스트를 누구나 이해하기 쉬운 친근한 블로그 톤의 요약문으로 재가공하여 가독성을 극대화합니다.
              </p>
            </div>

            {/* E-E-A-T 가이드라인에 따른 법적 면책 공지 */}
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50 text-[#3F37C9] text-xs sm:text-sm font-extrabold leading-relaxed mt-10">
              ⚖️ <strong>법적 고지 (Disclaimer)</strong><br className="mb-2 block" />
              본 사이트가 제공하는 자동화 서식 및 각종 지원금 요약 정보는 오픈 데이터를 기반으로 인공지능 기술이 가공한 단순 참고용 정보이며, 법적 효력을 가지지 않습니다. 개별 공종의 구체적인 소방 법적 인허가 및 최종 지원금 신청 적격성 여부는 반드시 원문 출처에 기재된 소관 관공서 및 소방서, 지자체 실무 주관 부서에 2차 교차 확인을 하셔야 함을 명백히 고지합니다.
            </div>

          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-between items-center border-t border-slate-100 pt-8">
            <Link
              href="/"
              className="px-6 py-3.5 text-sm font-extrabold rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
            >
              ← 메인 화면으로 돌아가기
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
}
