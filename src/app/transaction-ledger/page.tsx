"use client";

import { useState } from "react";
import Link from "next/link";

const SITES = [
  "부산 해운대구 신축 공사현장",
  "창원 소방시설 교체 현장",
  "김해 상업시설 리모델링 현장",
  "부산 사하구 증축 공사현장",
  "거제 산업단지 소방배관 공사",
];

interface LedgerEntry {
  month: string;
  supplier: string;
  purchaseAmount: number;
  paidAmount: number;
}

const SITE_DATA: { [site: string]: LedgerEntry[] } = {
  "부산 해운대구 신축 공사현장": [
    { month: "2026-03", supplier: "한국자재(주)", purchaseAmount: 1250000, paidAmount: 1250000 },
    { month: "2026-03", supplier: "대성건자재", purchaseAmount: 830000, paidAmount: 0 },
    { month: "2026-04", supplier: "한국자재(주)", purchaseAmount: 2100000, paidAmount: 2100000 },
    { month: "2026-04", supplier: "동양소방기자재", purchaseAmount: 560000, paidAmount: 560000 },
    { month: "2026-04", supplier: "신한철강", purchaseAmount: 980000, paidAmount: 0 },
    { month: "2026-05", supplier: "한국자재(주)", purchaseAmount: 1750000, paidAmount: 0 },
    { month: "2026-05", supplier: "대성건자재", purchaseAmount: 620000, paidAmount: 0 },
    { month: "2026-05", supplier: "동양소방기자재", purchaseAmount: 430000, paidAmount: 0 },
  ],
  "창원 소방시설 교체 현장": [
    { month: "2026-04", supplier: "부산소방자재", purchaseAmount: 3200000, paidAmount: 3200000 },
    { month: "2026-04", supplier: "대한철물", purchaseAmount: 450000, paidAmount: 450000 },
    { month: "2026-05", supplier: "부산소방자재", purchaseAmount: 1800000, paidAmount: 0 },
    { month: "2026-05", supplier: "창원자재상", purchaseAmount: 720000, paidAmount: 720000 },
    { month: "2026-05", supplier: "대한철물", purchaseAmount: 380000, paidAmount: 0 },
  ],
  "김해 상업시설 리모델링 현장": [
    { month: "2026-05", supplier: "김해자재마트", purchaseAmount: 2500000, paidAmount: 1000000 },
    { month: "2026-05", supplier: "신성건자재", purchaseAmount: 890000, paidAmount: 890000 },
  ],
  "부산 사하구 증축 공사현장": [
    { month: "2026-04", supplier: "부산종합자재", purchaseAmount: 1650000, paidAmount: 1650000 },
    { month: "2026-05", supplier: "부산종합자재", purchaseAmount: 2300000, paidAmount: 0 },
    { month: "2026-05", supplier: "대성건자재", purchaseAmount: 750000, paidAmount: 0 },
  ],
  "거제 산업단지 소방배관 공사": [
    { month: "2026-03", supplier: "거제자재(주)", purchaseAmount: 4500000, paidAmount: 4500000 },
    { month: "2026-04", supplier: "거제자재(주)", purchaseAmount: 3200000, paidAmount: 3200000 },
    { month: "2026-05", supplier: "거제자재(주)", purchaseAmount: 2800000, paidAmount: 0 },
    { month: "2026-05", supplier: "경남소방기자재", purchaseAmount: 1100000, paidAmount: 0 },
  ],
};

type TabType = "total" | "monthly" | "purchase" | "payment";

const TABS: { id: TabType; label: string }[] = [
  { id: "total", label: "총 사용 누계" },
  { id: "monthly", label: "월별 사용 누계" },
  { id: "purchase", label: "자재상별 구매금액" },
  { id: "payment", label: "지급해야할 금액" },
];

const fmt = (amount: number) => `₩${amount.toLocaleString("ko-KR")}`;

export default function TransactionLedgerPage() {
  const [selectedSite, setSelectedSite] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("total");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const entries = selectedSite ? (SITE_DATA[selectedSite] ?? []) : [];

  const totalPurchase = entries.reduce((sum, e) => sum + e.purchaseAmount, 0);
  const totalPaid = entries.reduce((sum, e) => sum + e.paidAmount, 0);
  const totalUnpaid = totalPurchase - totalPaid;
  const uniqueSuppliers = [...new Set(entries.map((e) => e.supplier))];

  const monthlyTotals = entries.reduce<{ [month: string]: number }>((acc, e) => {
    acc[e.month] = (acc[e.month] ?? 0) + e.purchaseAmount;
    return acc;
  }, {});

  const unpaidEntries = entries
    .filter((e) => e.purchaseAmount > e.paidAmount)
    .map((e) => ({ ...e, unpaidAmount: e.purchaseAmount - e.paidAmount }));

  const handleQuery = () => {
    if (!selectedSite) return;
    setShowResults(true);
    setActiveTab("total");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files).map((f) => f.name));
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] font-sans antialiased pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <Link href="/" className="text-sm font-black tracking-widest text-[#10B981] uppercase hover:opacity-80 transition-opacity">
            ← BUP LOCAL · HOME
          </Link>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            거래명세표 집계 관리
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-10 space-y-8">

        {/* 페이지 타이틀 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1 w-8 bg-[#10B981] rounded-full"></span>
            <span className="text-sm font-black tracking-widest text-[#10B981] uppercase">
              자동 집계 시스템
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A]">
            현장별 거래명세표 집계
          </h1>
          <p className="text-slate-500 font-bold text-base">
            현장을 선택하고 거래명세표 사진을 업로드하면 자동으로 비용을 집계합니다.
          </p>
        </div>

        {/* 입력 영역 */}
        <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">

          {/* 현장 선택 */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-800 block">📍 현장 선택</label>
            <select
              value={selectedSite}
              onChange={(e) => { setSelectedSite(e.target.value); setShowResults(false); }}
              className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-base font-bold focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors"
            >
              <option value="">현장을 선택하세요</option>
              {SITES.map((site) => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>
          </div>

          {/* 파일 업로드 */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-800 block">📸 거래명세표 업로드 (사진 / 스캔)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-emerald-50 border-2 border-dashed border-slate-300 hover:border-[#10B981] rounded-2xl cursor-pointer transition-all group">
                <svg className="w-8 h-8 text-slate-400 group-hover:text-[#10B981] transition-colors mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-sm font-black text-slate-700">파일 업로드</span>
                <span className="text-xs text-slate-400 font-bold mt-1">사진, 스캔 PDF 첨부</span>
                <input type="file" className="hidden" multiple accept="image/*,application/pdf" onChange={handleFileChange} />
              </label>

              <button className="flex flex-col items-center justify-center p-6 bg-emerald-50/60 hover:bg-emerald-100 border-2 border-dashed border-emerald-300 hover:border-[#10B981] rounded-2xl transition-all group">
                <svg className="w-8 h-8 text-[#10B981] mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.573c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <span className="text-sm font-black text-[#10B981]">카메라 촬영</span>
                <span className="text-xs text-slate-400 font-bold mt-1">현장에서 즉시 촬영</span>
              </button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {uploadedFiles.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <span>✓</span> {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 집계 버튼 */}
          <button
            onClick={handleQuery}
            disabled={!selectedSite}
            className="w-full py-4 text-base font-black rounded-2xl bg-gradient-to-r from-[#059669] to-[#10B981] text-white hover:from-[#047857] hover:to-[#059669] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
          >
            📊 집계 조회하기
          </button>
        </div>

        {/* 결과 영역 */}
        {showResults && (
          <div className="space-y-6">

            {/* 요약 카드 3개 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-1">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider">현장 총 구매금액</p>
                <p className="text-2xl font-black text-[#0F172A]">{fmt(totalPurchase)}</p>
              </div>
              <div className="bg-white rounded-2xl border border-red-100 p-6 space-y-1">
                <p className="text-xs font-black text-red-400 uppercase tracking-wider">총 미지급액</p>
                <p className="text-2xl font-black text-red-600">{fmt(totalUnpaid)}</p>
              </div>
              <div className="bg-white rounded-2xl border border-emerald-100 p-6 space-y-1">
                <p className="text-xs font-black text-emerald-500 uppercase tracking-wider">거래 자재상 수</p>
                <p className="text-2xl font-black text-emerald-700">{uniqueSuppliers.length}개사</p>
              </div>
            </div>

            {/* 탭 + 테이블 */}
            <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100 overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[130px] py-4 px-4 text-sm font-black transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-[#10B981] border-b-2 border-[#10B981] bg-emerald-50/50"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8">

                {/* 탭 1: 현장별 총 사용 누계 */}
                {activeTab === "total" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-[#0F172A]">현장별 총 사용 누계</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider">
                            <th className="text-left py-3 px-4 rounded-l-xl">현장명</th>
                            <th className="text-right py-3 px-4">총 구매금액</th>
                            <th className="text-right py-3 px-4">총 지급금액</th>
                            <th className="text-right py-3 px-4 rounded-r-xl">미지급 잔액</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="font-bold">
                            <td className="py-4 px-4 text-[#0F172A]">{selectedSite}</td>
                            <td className="py-4 px-4 text-right text-[#0F172A]">{fmt(totalPurchase)}</td>
                            <td className="py-4 px-4 text-right text-emerald-600">{fmt(totalPaid)}</td>
                            <td className="py-4 px-4 text-right text-red-500 font-black">{fmt(totalUnpaid)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 탭 2: 월별 사용 누계 */}
                {activeTab === "monthly" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-[#0F172A]">월별 사용 누계</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider">
                            <th className="text-left py-3 px-4 rounded-l-xl">월</th>
                            <th className="text-right py-3 px-4 rounded-r-xl">월 구매 합계</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(monthlyTotals)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([month, amount]) => (
                              <tr key={month} className="border-b border-slate-50 font-bold hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-4 text-[#0F172A]">{month}</td>
                                <td className="py-4 px-4 text-right text-[#0F172A]">{fmt(amount)}</td>
                              </tr>
                            ))}
                          <tr className="bg-emerald-50 font-black">
                            <td className="py-4 px-4 text-emerald-800 rounded-l-xl">합계</td>
                            <td className="py-4 px-4 text-right text-emerald-800 rounded-r-xl">{fmt(totalPurchase)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 탭 3: 월별 자재상별 구매 금액 */}
                {activeTab === "purchase" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-[#0F172A]">월별 자재상별 구매 금액</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider">
                            <th className="text-left py-3 px-4 rounded-l-xl">월</th>
                            <th className="text-left py-3 px-4">자재상</th>
                            <th className="text-right py-3 px-4 rounded-r-xl">구매 금액</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...entries]
                            .sort((a, b) => a.month.localeCompare(b.month))
                            .map((entry, i) => (
                              <tr key={i} className="border-b border-slate-50 font-bold hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-4 text-slate-500">{entry.month}</td>
                                <td className="py-4 px-4 text-[#0F172A]">{entry.supplier}</td>
                                <td className="py-4 px-4 text-right text-[#0F172A]">{fmt(entry.purchaseAmount)}</td>
                              </tr>
                            ))}
                          <tr className="bg-emerald-50 font-black">
                            <td className="py-4 px-4 text-emerald-800 rounded-l-xl" colSpan={2}>합계</td>
                            <td className="py-4 px-4 text-right text-emerald-800 rounded-r-xl">{fmt(totalPurchase)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 탭 4: 월별 자재상별 지급해야할 금액 */}
                {activeTab === "payment" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-[#0F172A]">월별 자재상별 지급해야할 금액</h4>
                    {unpaidEntries.length === 0 ? (
                      <div className="text-center py-10 text-emerald-600 font-black text-lg">
                        ✅ 모든 금액이 지급 완료되었습니다.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-red-50 text-red-400 text-xs font-black uppercase tracking-wider">
                              <th className="text-left py-3 px-4 rounded-l-xl">월</th>
                              <th className="text-left py-3 px-4">자재상</th>
                              <th className="text-right py-3 px-4">구매금액</th>
                              <th className="text-right py-3 px-4">기지급금액</th>
                              <th className="text-right py-3 px-4 rounded-r-xl">미지급 잔액</th>
                            </tr>
                          </thead>
                          <tbody>
                            {unpaidEntries
                              .sort((a, b) => a.month.localeCompare(b.month))
                              .map((entry, i) => (
                                <tr key={i} className="border-b border-slate-50 font-bold hover:bg-red-50/30 transition-colors">
                                  <td className="py-4 px-4 text-slate-500">{entry.month}</td>
                                  <td className="py-4 px-4 text-[#0F172A]">{entry.supplier}</td>
                                  <td className="py-4 px-4 text-right text-slate-600">{fmt(entry.purchaseAmount)}</td>
                                  <td className="py-4 px-4 text-right text-emerald-600">{fmt(entry.paidAmount)}</td>
                                  <td className="py-4 px-4 text-right text-red-600 font-black">{fmt(entry.unpaidAmount)}</td>
                                </tr>
                              ))}
                            <tr className="bg-red-50 font-black">
                              <td className="py-4 px-4 text-red-800 rounded-l-xl" colSpan={4}>미지급 총액</td>
                              <td className="py-4 px-4 text-right text-red-700 rounded-r-xl">{fmt(totalUnpaid)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
