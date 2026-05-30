import fs from "fs";
import path from "path";
import Link from "next/link";

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

// 1. 빌드(static export) 시 모든 상세 페이지 경로를 미리 만들어두기 위한 설정
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "local-info.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data: InfoItem[] = JSON.parse(fileContent);
    return data.map((item) => ({
      id: item.id,
    }));
  } catch (error) {
    console.error("generateStaticParams 에러:", error);
    return [];
  }
}

// 2. ID에 맞는 상세 데이터를 가져오는 함수
function getDetailData(id: string): InfoItem | null {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "local-info.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data: InfoItem[] = JSON.parse(fileContent);
    return data.find((item) => item.id === id) || null;
  } catch (error) {
    console.error("데이터 읽기 에러:", error);
    return null;
  }
}

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getDetailData(id);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] text-slate-800 font-sans">
        <h2 className="text-2xl font-black mb-4">해당 정보를 찾을 수 없습니다.</h2>
        <Link href="/" className="px-6 py-3 bg-black text-white rounded-full font-bold">
          메인 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  const isDocAutomation = item.id === "doc-auto";

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] font-sans antialiased pb-20">
      
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-black tracking-widest text-[#4F46E5] uppercase">
              ← BUP LOCAL · HOME
            </span>
          </Link>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">
            {isDocAutomation ? "스마트 업무 자동화" : item.category === "행사" ? "정부지원사업" : "지원금 정보"}
          </span>
        </div>
      </header>

      {/* 메인 상세 페이지 본문 */}
      <main className="max-w-4xl mx-auto px-6 mt-10">
        <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-10 space-y-8">
          
          {/* ====================================================
              타입 1: '문서 자동화' 상세 페이지 구성 (업로드 및 양식 선택 포함)
              ==================================================== */}
          {isDocAutomation ? (
            <div className="space-y-8">
              
              {/* 1. 문서/공종 이름 (크게) */}
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black tracking-widest uppercase rounded-full bg-[#4F46E5]/10 text-[#4F46E5] border border-indigo-400/20">
                  ⚡ INSTANT GENERATOR
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                  {item.name}
                </h2>
              </div>

              {/* 2. 날짜, 장소, 대상 정보 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 font-extrabold text-sm text-slate-800">
                <div className="space-y-1">
                  <span className="text-[#4F46E5] text-xs font-black block tracking-wider uppercase">🗓️ 서비스 기간</span>
                  <span>{item.startDate} ~ {item.endDate}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[#4F46E5] text-xs font-black block tracking-wider uppercase">📍 서비스 장소</span>
                  <span>{item.location}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[#4F46E5] text-xs font-black block tracking-wider uppercase">👥 권장 대상</span>
                  <span>{item.target}</span>
                </div>
              </div>

              {/* 3. 상세 설명 전문 */}
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <h4 className="text-lg font-black text-slate-900">📖 서비스 안내 및 상세 내용</h4>
                <p className="text-[#374151] text-base sm:text-lg font-bold leading-relaxed">
                  {item.summary} 본 자동 생성기는 건설 현장의 실무 행정 마찰을 최소화하기 위한 법률 기반 자동 보정 알고리즘을 사용합니다. 현장에서 스마트폰으로 업로드하거나 서류 스캔본을 바로 첨부하여 표준 서식 양식을 단 10초 만에 추출할 수 있습니다.
                </p>
              </div>

              {/* 4. 사진, 영상, 문서 업로드 또는 카메라 촬영 선택창 */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h4 className="text-lg font-black text-slate-900">📸 현장 증빙 자료 업로드 및 촬영</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* 옵션 A: 파일 찾기 업로드 */}
                  <label className="flex flex-col items-center justify-center p-8 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-300 hover:border-[#4F46E5] rounded-2xl cursor-pointer transition-all group">
                    <svg className="w-10 h-10 text-slate-400 group-hover:text-[#4F46E5] transition-colors mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    <span className="text-base font-black text-slate-800">내 컴퓨터에서 파일 찾기</span>
                    <span className="text-xs text-slate-500 font-bold mt-1">사진, 동영상, 스캔 문서 첨부 가능</span>
                    <input type="file" className="hidden" multiple accept="image/*,video/*,application/pdf" />
                  </label>

                  {/* 옵션 B: 모바일 실시간 카메라 촬영 */}
                  <button className="flex flex-col items-center justify-center p-8 bg-[#4F46E5]/5 hover:bg-[#4F46E5]/10 border-2 border-dashed border-[#4F46E5]/30 hover:border-[#4F46E5] rounded-2xl transition-all group">
                    <svg className="w-10 h-10 text-[#4F46E5] mb-3 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.573c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <span className="text-base font-black text-[#4F46E5]">실시간 카메라 촬영</span>
                    <span className="text-xs text-slate-500 font-bold mt-1">현장에서 스마트폰 카메라 즉시 연결</span>
                  </button>

                </div>
              </div>

              {/* 5. 공종선택 및 문서 양식 선택Dropdown */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h4 className="text-lg font-black text-slate-900">📂 문서 발급 양식 정의</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 공종 선택 */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black text-slate-800 block">공종 (공사 종류) 선택</label>
                    <select className="w-full p-4 border border-slate-300 rounded-2xl bg-white text-base font-bold focus:outline-none focus:border-[#4F46E5]">
                      <option>소방 배관 공사</option>
                      <option>전기 감리 보조</option>
                      <option>건설 토목 공정</option>
                      <option>기타 소방 법령 현장점검</option>
                    </select>
                  </div>

                  {/* 문서 양식 선택 */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black text-slate-800 block">문서 발급 서식 선택</label>
                    <select className="w-full p-4 border border-slate-300 rounded-2xl bg-white text-base font-bold focus:outline-none focus:border-[#4F46E5]">
                      <option>소방시설 검사 표준보고서</option>
                      <option>건설 공정 준공 점검 대장</option>
                      <option>정부 지원 제출용 현장 점검 대장</option>
                      <option>공종 사진대지 서식</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 6. 하단 버튼 목록 */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-8">
                <Link
                  href="/"
                  className="w-full sm:w-auto text-center px-6 py-4 text-sm font-extrabold rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                >
                  ← 목록으로 돌아가기
                </Link>
                <button
                  type="button"
                  className="w-full sm:w-auto text-center px-8 py-4 text-sm font-black rounded-2xl bg-[#4F46E5] text-white hover:bg-[#3F37C9] shadow-lg shadow-indigo-500/25 active:scale-98 transition-all"
                >
                  ✨ 문서 자동 생성 및 추가하기
                </button>
              </div>

            </div>
          ) : (
            
            /* ====================================================
                타입 2: '정부지원사업 / 지원금 혜택' 상세 페이지 구성
                ==================================================== */
            <div className="space-y-8">
              
              {/* 1. 공모/지원금 이름 (크게) */}
              <div className="space-y-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black tracking-widest uppercase rounded-full ${
                  item.category === "행사"
                    ? "bg-[#2563EB]/10 text-[#2563EB] border border-blue-400/20"
                    : "bg-[#F97316]/10 text-[#F97316] border border-orange-400/20"
                }`}>
                  {item.category === "행사" ? "🏛️ GOVERNMENT PROJECT" : "💰 CASH BENEFITS"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                  {item.name}
                </h2>
              </div>

              {/* 2. 공모기간, 주관사, 공모대상 */}
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl border font-extrabold text-sm text-slate-800 ${
                item.category === "행사" 
                  ? "bg-blue-50/50 border-blue-100" 
                  : "bg-orange-50/50 border-orange-100"
              }`}>
                <div className="space-y-1">
                  <span className={`text-xs font-black block tracking-wider uppercase ${
                    item.category === "행사" ? "text-[#2563EB]" : "text-[#F97316]"
                  }`}>🗓️ 신청/공모 기간</span>
                  <span>{item.startDate} ~ {item.endDate}</span>
                </div>
                <div className="space-y-1">
                  <span className={`text-xs font-black block tracking-wider uppercase ${
                    item.category === "행사" ? "text-[#2563EB]" : "text-[#F97316]"
                  }`}>🏢 주관사 / 시행처</span>
                  <span>{item.location}</span>
                </div>
                <div className="space-y-1">
                  <span className={`text-xs font-black block tracking-wider uppercase ${
                    item.category === "행사" ? "text-[#2563EB]" : "text-[#F97316]"
                  }`}>👥 지원 대상요건</span>
                  <span>{item.target}</span>
                </div>
              </div>

              {/* 3. 상세 설명 전문 */}
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <h4 className="text-lg font-black text-slate-900">📖 공고 안내 상세 안내문</h4>
                <p className="text-[#374151] text-base sm:text-lg font-bold leading-relaxed">
                  {item.summary} 정부 및 지자체 소방 관련 산업 육성을 촉진하기 위해 무상 출연금 지원 및 특별 가점 혜택을 부여합니다. 모집 마감일까지 필요한 현장 정보와 사업 계획서를 구비하여 주관기관 공식 접수 사이트를 통해 서류를 차질 없이 접수하시기 바랍니다.
                </p>
              </div>

              {/* 4. 목록 돌아가기 및 원본 링크 버튼 */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-8">
                <Link
                  href="/"
                  className="w-full sm:w-auto text-center px-6 py-4 text-sm font-extrabold rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                >
                  ← 목록으로 돌아가기
                </Link>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto text-center px-8 py-4 text-sm font-black rounded-2xl text-white shadow-lg transition-all active:scale-98 ${
                    item.category === "행사"
                      ? "bg-[#2563EB] hover:bg-[#1D4ED8] shadow-blue-500/25"
                      : "bg-[#F97316] hover:bg-[#EA580C] shadow-orange-500/25"
                  }`}
                >
                  자세히 보기 (공식 홈페이지로 이동) →
                </a>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}
