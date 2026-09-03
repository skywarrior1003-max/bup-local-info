import Link from 'next/link';

interface SiteData {
  name: string;
  location: string;
  role: string;
  attendance: number;
  pending: number;
  unapprovedReport: number;
}

const siteDataMap: Record<string, SiteData> = {
  '1': {
    name: '동래 A현장',
    location: '부산 동래구 · 소방설비',
    role: '현장소장',
    attendance: 8,
    pending: 2,
    unapprovedReport: 1,
  },
  '2': {
    name: '해운대 B현장',
    location: '부산 해운대구 · 소방설비',
    role: '공무',
    attendance: 3,
    pending: 0,
    unapprovedReport: 0,
  },
  '3': {
    name: '사상 C현장',
    location: '부산 사상구 · 전기',
    role: '작업자',
    attendance: 4,
    pending: 1,
    unapprovedReport: 0,
  },
};

export default async function SiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = siteDataMap[id] || siteDataMap['1'];

  return (
    <div className="max-w-[390px] w-full mx-auto bg-background min-h-screen relative overflow-hidden shadow-lg shadow-outline-variant/20">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full h-[64px] bg-surface border-b border-outline-variant flex items-center px-[20px] max-w-[390px] z-50">
        <Link
          href="/sites"
          className="active:scale-95 transition-transform duration-100 mr-4 flex items-center justify-center text-primary hover:bg-surface-container rounded-full p-2 -ml-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </Link>
        <h1 className="font-headline-display text-headline-display text-primary tracking-tight">현장 관리</h1>
      </header>

      {/* Main Scrollable Content Area */}
      <main className="pt-[64px] pb-[80px]">
        {/* Context Header */}
        <section className="px-screen-margin pt-6 pb-4 flex justify-between items-center">
          <h2 className="font-headline-display text-headline-display text-on-surface tracking-tight">{site.name}</h2>
          {/* Role Badge: 현장소장 */}
          <div className="border border-primary-container text-primary-container bg-surface-container-lowest px-2.5 py-1 rounded-full font-caption text-caption font-bold tracking-wide flex items-center shadow-sm">
            {site.role}
          </div>
        </section>

        {/* Top Summary (3 Slots) */}
        <section className="px-screen-margin grid grid-cols-3 gap-card-gap mb-section-gap">
          {/* Slot 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="font-caption text-caption text-on-surface-variant mb-1 font-semibold">출역</span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-number-highlight text-number-highlight text-primary">{site.attendance}</span>
              <span className="font-caption text-caption text-on-surface-variant font-medium">명</span>
            </div>
          </div>

          {/* Slot 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="font-caption text-caption text-on-surface-variant mb-1 font-semibold">확인 대기</span>
            <div className="flex items-baseline gap-0.5">
              <span className={`font-number-highlight text-number-highlight ${site.pending > 0 ? 'text-error' : 'text-primary'}`}>
                {site.pending}
              </span>
              <span className="font-caption text-caption text-on-surface-variant font-medium">건</span>
            </div>
          </div>

          {/* Slot 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="font-caption text-caption text-on-surface-variant mb-1 font-semibold">미승인 일보</span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-number-highlight text-number-highlight text-primary">{site.unapprovedReport}</span>
              <span className="font-caption text-caption text-on-surface-variant font-medium">건</span>
            </div>
          </div>
        </section>

        {/* Main Action Cards (2x2 Grid) */}
        <section className="px-screen-margin grid grid-cols-2 gap-card-gap mb-4">
          <Link
            href={`/sites/${id}/material/capture`}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding flex flex-col items-center justify-center aspect-square active:bg-surface-container-low transition-colors duration-200 shadow-sm hover:border-primary/30 cursor-pointer"
          >
            <div className="bg-primary-fixed/20 p-3 rounded-full mb-3">
              <span className="material-symbols-outlined text-[32px] text-primary">inventory_2</span>
            </div>
            <span className="font-body-main text-body-main font-semibold text-on-surface">자재 입고</span>
          </Link>

          <Link
            href={`/sites/${id}/cost`}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding flex flex-col items-center justify-center aspect-square active:bg-surface-container-low transition-colors duration-200 shadow-sm hover:border-primary/30 cursor-pointer"
          >
            <div className="bg-primary-fixed/20 p-3 rounded-full mb-3">
              <span className="material-symbols-outlined text-[32px] text-primary">analytics</span>
            </div>
            <span className="font-body-main text-body-main font-semibold text-on-surface">원가 현황</span>
          </Link>

          <Link
            href={`/sites/${id}/attendance`}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding flex flex-col items-center justify-center aspect-square active:bg-surface-container-low transition-colors duration-200 shadow-sm hover:border-primary/30 cursor-pointer"
          >
            <div className="bg-primary-fixed/20 p-3 rounded-full mb-3">
              <span className="material-symbols-outlined text-[32px] text-primary">how_to_reg</span>
            </div>
            <span className="font-body-main text-body-main font-semibold text-on-surface">출역 확인</span>
          </Link>

          <Link
            href={`/sites/${id}/report`}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-card-padding flex flex-col items-center justify-center aspect-square active:bg-surface-container-low transition-colors duration-200 shadow-sm hover:border-primary/30 cursor-pointer"
          >
            <div className="bg-primary-fixed/20 p-3 rounded-full mb-3">
              <span className="material-symbols-outlined text-[32px] text-primary">article</span>
            </div>
            <span className="font-body-main text-body-main font-semibold text-on-surface">일일 보고서</span>
          </Link>
        </section>

        {/* Cost Status & Kiosk Banners */}
        <section className="px-screen-margin mb-section-gap flex flex-col gap-2.5">
          <Link
            href="/kiosk"
            className="bg-white border border-[#E3E6EA] rounded-xl p-3.5 flex items-center justify-between shadow-sm active:bg-surface-container-low transition-colors hover:border-primary/40 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#022448] p-2 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">badge</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-body-main text-[15px] font-bold text-on-surface">출입 단말 (KIOSK)</span>
                  <span className="text-[#1B873F] text-[11px] font-bold bg-[#1B873F]/10 px-1.5 py-0.5 rounded">
                    단말 가동중
                  </span>
                </div>
                <p className="font-caption text-[12px] text-secondary mt-0.5">현장 입구 태블릿 · 스캔 및 자동 출결</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </Link>

          <Link
            href={`/sites/${id}/cost`}
            className="bg-white border border-[#E3E6EA] rounded-xl p-3.5 flex items-center justify-between shadow-sm active:bg-surface-container-low transition-colors hover:border-primary/40 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary-fixed/30 p-2 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">monitoring</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-body-main text-[15px] font-bold text-on-surface">원가 분석 리포트</span>
                  <span className="text-warning text-[11px] font-bold bg-warning/15 px-1.5 py-0.5 rounded">
                    누적 45.2%
                  </span>
                </div>
                <p className="font-caption text-[12px] text-secondary mt-0.5">8월 누적 90,430,000원 · 소진율 확인</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </Link>
        </section>

        {/* Pending List Area */}
        <section className="px-screen-margin">
          <div className="flex justify-between items-end mb-4 border-b border-outline-variant pb-2">
            <h3 className="font-section-title text-section-title text-on-surface tracking-tight">확인 대기 목록</h3>
            <span className="font-body-sub text-body-sub text-error font-bold bg-error-container/30 px-2 py-0.5 rounded-full">
              총 {site.pending}건
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* List Item 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding flex items-center justify-between active:bg-surface-container-low cursor-pointer transition-colors shadow-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded-md font-caption text-[11px] font-bold border border-error/20">
                    결재 요망
                  </span>
                  <span className="font-body-sub text-body-sub text-on-surface-variant">금일 자재반입 내역서</span>
                </div>
                <p className="font-body-main text-body-main font-bold text-on-surface">강관 100A 40본 외 3건 입고</p>
              </div>
              <span className="material-symbols-outlined text-outline ml-2">chevron_right</span>
            </div>

            {/* List Item 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding flex items-center justify-between active:bg-surface-container-low cursor-pointer transition-colors shadow-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded-md font-caption text-[11px] font-bold border border-error/20">
                    결재 요망
                  </span>
                  <span className="font-body-sub text-body-sub text-on-surface-variant">어제 야간작업 승인요청</span>
                </div>
                <p className="font-body-main text-body-main font-bold text-on-surface">배관팀 야간 연장근로 확인</p>
              </div>
              <span className="material-symbols-outlined text-outline ml-2">chevron_right</span>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full h-[64px] z-50 bg-surface border-t border-outline-variant flex justify-around items-center max-w-[390px] px-[20px]">
        {/* Active Tab */}
        <button
          type="button"
          className="active:bg-surface-container-highest transition-colors duration-200 h-full w-full flex flex-col items-center justify-center text-primary font-bold hover:bg-surface-container-low rounded-lg mt-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>
            home
          </span>
          <span className="font-caption text-caption mt-1 tracking-tight">홈</span>
        </button>

        {/* Inactive Tabs */}
        <button
          type="button"
          className="active:bg-surface-container-highest transition-colors duration-200 h-full w-full flex flex-col items-center justify-center text-secondary hover:bg-surface-container-low rounded-lg mt-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">architecture</span>
          <span className="font-caption text-caption mt-1 tracking-tight font-medium">공정</span>
        </button>

        <button
          type="button"
          className="active:bg-surface-container-highest transition-colors duration-200 h-full w-full flex flex-col items-center justify-center text-secondary hover:bg-surface-container-low rounded-lg mt-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">description</span>
          <span className="font-caption text-caption mt-1 tracking-tight font-medium">서류</span>
        </button>

        <button
          type="button"
          className="active:bg-surface-container-highest transition-colors duration-200 h-full w-full flex flex-col items-center justify-center text-secondary hover:bg-surface-container-low rounded-lg mt-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="font-caption text-caption mt-1 tracking-tight font-medium">설정</span>
        </button>
      </nav>
    </div>
  );
}
