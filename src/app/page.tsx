import fs from "fs";
import path from "path";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

interface InfoItem {
  id: string;
  name: string;
  category: "행사" | "혜택";
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  link: string;
}

function getLocalInfoData(): InfoItem[] {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "local-info.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("데이터를 읽어오는 중 에러 발생:", error);
    return [];
  }
}

export default function Home() {
  const data = getLocalInfoData();

  // 정부지원사업 (행사 카테고리 중 문서 자동화 제외한 것)
  const governmentProjects = data.filter(
    (item) => item.category === "행사" && item.id !== "doc-auto"
  );
  
  // 지원금/혜택 정보
  const benefits = data.filter((item) => item.category === "혜택");

  // 독보적으로 다르게 표현할 '문서 자동화' 데이터 찾기
  const docAutomation = data.find((item) => item.id === "doc-auto");

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] font-sans antialiased selection:bg-[#6366F1]/10 selection:text-[#6366F1]">
      
      {/* 상단 미니멀 브랜드 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-widest text-[#4F46E5] uppercase">
              BUP LOCAL · TOOLS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm font-extrabold text-slate-700 hover:text-black transition-all"
            >
              블로그
            </Link>
            <Link
              href="/about"
              className="text-sm font-extrabold text-slate-700 hover:text-black transition-all"
            >
              소개
            </Link>
            <Link
              href="/login"
              className="text-sm font-extrabold text-slate-700 hover:text-black transition-all"
            >
              로그인
            </Link>
            {docAutomation ? (
              <Link
                href={`/detail/${docAutomation.id}`}
                className="px-5 py-2.5 text-sm font-black rounded-full bg-black text-white hover:bg-slate-800 transition-all shadow-sm"
              >
                시작하기
              </Link>
            ) : (
              <Link
                href="/blog"
                className="px-5 py-2.5 text-sm font-black rounded-full bg-black text-white hover:bg-slate-800 transition-all shadow-sm"
              >
                시작하기
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-6xl mx-auto px-6 py-12 sm:py-16 space-y-20">
        
        {/* 상단 텍스트 헤더 */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-1 w-8 bg-[#4F46E5] rounded-full"></span>
            <span className="text-sm sm:text-base font-black tracking-widest text-[#4F46E5] uppercase">
              BUP LOCAL SOLUTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              실무자가 원하던
            </span>{" "}
            무료 행정 도구
          </h2>
          <p className="text-[#374151] text-base sm:text-lg font-bold leading-relaxed">
            건설 및 소방 현장의 모든 행정 문서를 손쉽게 자동 생성하고,<br className="hidden sm:inline" />
            이번 달 정부지원사업 및 지원금 혜택 정보까지 실시간으로 확인하세요.
          </p>
        </div>

        {/* ==========================================
            🔥 [SUPER SPECIAL] 1순위: 문서 자동화 생성하기 카드
            ========================================== */}
        {docAutomation && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-7 rounded-full bg-gradient-to-b from-[#6366F1] to-[#8B5CF6]"></span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A]">
                초고속 문서 자동 생성기 (가장 강력한 핵심 기능)
              </h3>
            </div>

            <div className="relative group overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#090514] p-8 sm:p-12 text-white shadow-2xl shadow-indigo-950/20 border border-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#6366F1]/30 to-[#8B5CF6]/30 blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-6 max-w-xl">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black tracking-widest uppercase rounded-full bg-[#4F46E5] border border-indigo-400/30 text-white shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                    무료 자동 생성 시스템
                  </span>
                  
                  <Link href={`/detail/${docAutomation.id}`} className="block group-hover:text-[#818CF8] transition-colors">
                    <h4 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                      {docAutomation.name}
                    </h4>
                  </Link>
                  
                  <p className="text-slate-100 text-base sm:text-lg font-bold leading-relaxed">
                    {docAutomation.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300 font-extrabold pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#818CF8] text-lg">📍</span>
                      <span>지원형식: 사진 업로드 및 표준 서식 변환</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#818CF8] text-lg">👥</span>
                      <span>대상: {docAutomation.target}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full md:w-auto min-w-[220px] gap-4">
                  <div className="w-28 h-28 rounded-[24px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-indigo-400/40 relative group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 text-xl animate-bounce">⚡</span>
                  </div>
                  
                  <Link
                    href={`/detail/${docAutomation.id}`}
                    className="w-full md:w-auto text-center px-6 py-4 text-sm font-black tracking-wider uppercase rounded-full bg-[#818CF8] text-white hover:bg-[#6366F1] active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45"
                  >
                    1초 만에 문서 생성 시작하기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            💰 거래명세표 자동 집계 카드
            ========================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-7 rounded-full bg-gradient-to-b from-[#10B981] to-[#059669]"></span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A]">
              현장별 거래명세표 집계 관리
            </h3>
          </div>

          <div className="relative group overflow-hidden rounded-[32px] bg-gradient-to-br from-[#022C22] via-[#064E3B] to-[#022C22] p-8 sm:p-12 text-white shadow-2xl shadow-emerald-950/20 border border-emerald-500/20 transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#10B981]/30 to-[#059669]/30 blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-6 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black tracking-widest uppercase rounded-full bg-[#059669] border border-emerald-400/30 text-white shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping"></span>
                  무료 자동 집계 시스템
                </span>

                <h4 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  거래명세표 사진으로<br />자동 비용 집계
                </h4>

                <p className="text-slate-100 text-base sm:text-lg font-bold leading-relaxed">
                  현장별 거래명세표 사진을 찍거나 업로드하면 현장별 총 사용 누계, 월별 자재상별 구매·지급 금액을 자동으로 집계합니다.
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-300 font-extrabold pt-2">
                  <div className="flex items-center gap-2"><span className="text-[#34D399]">📊</span><span>현장별 총 사용 누계</span></div>
                  <div className="flex items-center gap-2"><span className="text-[#34D399]">📅</span><span>월별 사용 누계</span></div>
                  <div className="flex items-center gap-2"><span className="text-[#34D399]">🏪</span><span>자재상별 구매 금액</span></div>
                  <div className="flex items-center gap-2"><span className="text-[#34D399]">💳</span><span>월별 지급해야할 금액</span></div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full md:w-auto min-w-[220px] gap-4">
                <div className="w-28 h-28 rounded-[24px] bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg shadow-emerald-500/30 border border-emerald-400/40 relative group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                  <span className="absolute -top-2 -right-2 text-xl animate-bounce">💰</span>
                </div>

                <Link
                  href="/transaction-ledger"
                  className="w-full md:w-auto text-center px-6 py-4 text-sm font-black tracking-wider uppercase rounded-full bg-[#34D399] text-[#022C22] hover:bg-[#10B981] active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/45"
                >
                  거래명세표 집계 시작하기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            💼 [정부지원사업 카테고리] 신뢰성 높은 Cobalt Blue 일관된 테마
            ========================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-7 rounded-full bg-[#2563EB]"></span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A]">
              이번 달 정부지원사업
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {governmentProjects.map((item) => {
              // 각 정부지원사업용 GovernmentService 구조화 데이터 정의
              const serviceJsonLd = {
                "@context": "https://schema.org",
                "@type": "GovernmentService",
                "name": item.name,
                "description": item.summary,
                "provider": {
                  "@type": "GovernmentOrganization",
                  "name": item.location
                },
                "serviceOperator": {
                  "@type": "GovernmentOrganization",
                  "name": item.location
                },
                "startDate": item.startDate,
                "endDate": item.endDate
              };

              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-[#2563EB]/5 rounded-[32px] border border-[#2563EB]/15 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)] hover:border-[#2563EB]/40 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* GovernmentService 구조화 데이터 삽입 */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
                  />

                  {/* 상단 블루 그라데이션 */}
                  <div className="p-6 pb-8 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white relative min-h-[220px] flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="px-4 py-1.5 text-xs font-black rounded-full bg-white/20 backdrop-blur-md">
                        정부지원사업
                      </span>
                      <span className="text-white text-xs sm:text-sm font-black bg-black/20 px-3 py-1 rounded-md">
                        공식공고 ↗
                      </span>
                    </div>
                    {/* 중앙 라인 아이콘 */}
                    <div className="py-4 flex justify-center">
                      <svg className="w-20 h-20 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                    <div></div>
                  </div>
                  {/* 하단 화이트 텍스트 영역 */}
                  <div className="bg-white p-6 sm:p-8 rounded-b-[32px] border-t border-slate-100 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-3">
                      <Link href="/blog">
                        <h4 className="text-xl sm:text-2xl font-black text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors duration-200">
                          {item.name}
                        </h4>
                      </Link>
                      <p className="text-[#374151] text-sm sm:text-base font-bold leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm text-slate-800 font-extrabold border-t border-slate-100 pt-4">
                      <span className="bg-slate-100 px-3 py-1 rounded-md">마감기한: ~ {item.endDate.split("-")[1] || "05"}.{item.endDate.split("-")[2] || "30"}</span>
                      <Link href="/blog" className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-black text-sm sm:text-base flex items-center gap-1">
                        자세히 보기 →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </section>

        {/* AdSense 광고 배너 삽입 (정부지원사업 섹션과 지원금/혜택 섹션 사이) */}
        <AdBanner />

        {/* ==========================================
            💰 [지원금/혜택 카테고리] 풍성하고 긍정적인 Sunset Orange 일관된 테마
            ========================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-7 rounded-full bg-[#F97316]"></span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A]">
              지원금 & 혜택 정보
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {benefits.map((item) => {
              // 각 지원금 혜택용 GovernmentService 구조화 데이터 정의
              const benefitJsonLd = {
                "@context": "https://schema.org",
                "@type": "GovernmentService",
                "name": item.name,
                "description": item.summary,
                "provider": {
                  "@type": "GovernmentOrganization",
                  "name": item.location
                },
                "serviceOperator": {
                  "@type": "GovernmentOrganization",
                  "name": item.location
                }
              };

              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-[#F97316]/5 rounded-[32px] border border-[#F97316]/15 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.12)] hover:border-[#F97316]/40 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* GovernmentService 구조화 데이터 삽입 */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(benefitJsonLd) }}
                  />

                  {/* 상단 오렌지 그라데이션 */}
                  <div className="p-6 pb-8 bg-gradient-to-br from-[#FB923C] to-[#F97316] text-white relative min-h-[220px] flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="px-4 py-1.5 text-xs font-black rounded-full bg-white/20 backdrop-blur-md">
                        재정지원 및 혜택
                      </span>
                      <span className="text-white text-xs sm:text-sm font-black bg-black/20 px-3 py-1 rounded-md">
                        무상지원 ↗
                      </span>
                    </div>
                    {/* 중앙 라인 아이콘 */}
                    <div className="py-4 flex justify-center">
                      <svg className="w-20 h-20 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    <div></div>
                  </div>
                  {/* 하단 화이트 텍스트 영역 */}
                  <div className="bg-white p-6 sm:p-8 rounded-b-[32px] border-t border-slate-100 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-3">
                      <Link href="/blog">
                        <h4 className="text-xl sm:text-2xl font-black text-[#0F172A] leading-snug group-hover:text-[#F97316] transition-colors duration-200">
                          {item.name}
                        </h4>
                      </Link>
                      <p className="text-[#374151] text-sm sm:text-base font-bold leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm text-slate-800 font-extrabold border-t border-slate-100 pt-4">
                      <span className="bg-slate-100 px-3 py-1 rounded-md">수혜조건: 선정 및 당선 시 즉시</span>
                      <Link href="/blog" className="text-[#F97316] hover:text-[#EA580C] hover:underline font-black text-sm sm:text-base flex items-center gap-1">
                        신청방법 보기 →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </section>
      </main>

      {/* 하단 심플 푸터 */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-24 text-xs sm:text-sm text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="font-bold text-slate-800">소방·건설 행정 통합 포털</span>
            <p className="text-slate-400 font-medium">
              공공데이터포털(data.go.kr) API를 연동하여 안전하고 정확한 최신 행정 정보만을 제공합니다.
            </p>
          </div>
          <div className="text-slate-400 font-semibold space-y-1">
            <p>마지막 업데이트: 2026년 5월 30일 | Gemini AI 자동 분석 엔진 가동 중</p>
            <p>© 2026 BUP Inc. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
