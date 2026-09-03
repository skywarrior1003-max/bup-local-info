'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MaterialStatusPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen">
      <div className="font-body-main text-on-surface flex flex-col min-h-screen max-w-[390px] w-full relative bg-[#F5F6F8] shadow-lg shadow-outline-variant/20">
        {/* TopAppBar */}
        <header className="bg-surface fixed top-0 w-full max-w-[390px] z-50 border-b border-outline-variant flex items-center justify-between px-screen-margin h-14">
          <Link
            href={`/sites/${id}`}
            aria-label="현장 홈으로 이동"
            className="active:scale-95 transition-transform text-on-surface-variant hover:bg-surface-container-low p-2 -ml-2 rounded-full flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined" data-icon="construction">
              construction
            </span>
          </Link>
          <h1 className="font-headline-display text-[18px] font-bold text-primary truncate">
            자재관리 시스템
          </h1>
          <button
            type="button"
            aria-label="알림"
            className="active:scale-95 transition-transform text-on-surface-variant hover:bg-surface-container-low p-2 -mr-2 rounded-full flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined" data-icon="notifications">
              notifications
            </span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-18 pb-24 px-screen-margin flex flex-col gap-section-gap">
          {/* Header Title */}
          <div className="mt-2 flex items-center justify-between">
            <div>
              <h2 className="font-headline-display text-[22px] font-bold text-on-surface">
                자재 입고 현황
              </h2>
            </div>
            <Link
              href={`/sites/${id}/cost`}
              className="flex items-center gap-1 text-primary text-body-sub font-semibold py-1.5 px-3 border border-primary/40 rounded-lg bg-white shadow-sm active:bg-surface-container hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">analytics</span>
              원가 현황
            </Link>
          </div>

          {/* Monthly Summary Card */}
          <section className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-4 shadow-sm">
            <h3 className="font-section-title text-section-title text-on-surface">8월 입고 총괄</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-body-sub text-body-sub text-secondary">총 입고 수량</span>
                <span className="font-number-highlight text-number-highlight text-primary">
                  4,520
                  <span className="text-lg font-normal ml-1 text-on-surface-variant">점</span>
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-body-sub text-body-sub text-secondary">목표 달성률</span>
                <span className="font-number-highlight text-number-highlight text-primary">85%</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-surface-container-highest rounded-full h-3 mt-2 overflow-hidden border border-outline-variant">
              <div className="bg-primary h-3 rounded-full" style={{ width: '85%' }} />
            </div>
          </section>

          {/* Chart Section Placeholder (Bento Style) */}
          <section className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-section-title text-section-title text-on-surface">
                주간 자재 입고 추이
              </h3>
              <span className="font-body-sub text-caption text-secondary border border-outline px-2 py-0.5 rounded bg-surface">
                최근 4주
              </span>
            </div>
            <div
              aria-label="주간 자재 입고 막대 그래프"
              className="h-48 w-full border border-outline-variant bg-surface flex items-end justify-around pb-4 px-2 relative"
            >
              {/* Mock Chart Bars */}
              <div className="w-8 bg-surface-tint border border-primary h-24 flex items-center justify-center text-on-secondary font-caption text-caption -mb-4 relative">
                <span className="absolute bottom-1 text-on-surface text-[11px]">1주</span>
              </div>
              <div className="w-8 bg-surface-tint border border-primary h-32 flex items-center justify-center text-on-secondary font-caption text-caption -mb-4 relative">
                <span className="absolute bottom-1 text-on-surface text-[11px]">2주</span>
              </div>
              <div className="w-8 bg-surface-tint border border-primary h-20 flex items-center justify-center text-on-secondary font-caption text-caption -mb-4 relative">
                <span className="absolute bottom-1 text-on-surface text-[11px]">3주</span>
              </div>
              <div className="w-8 bg-surface-tint border border-primary h-40 flex items-center justify-center text-on-secondary font-caption text-caption -mb-4 relative">
                <span className="absolute bottom-1 text-on-surface text-[11px]">4주</span>
              </div>
              {/* Y-axis lines */}
              <div className="absolute left-0 w-full h-full border-b border-dashed border-outline-variant top-1/4 pointer-events-none" />
              <div className="absolute left-0 w-full h-full border-b border-dashed border-outline-variant top-2/4 pointer-events-none" />
              <div className="absolute left-0 w-full h-full border-b border-dashed border-outline-variant top-3/4 pointer-events-none" />
            </div>
            <div className="flex gap-4 justify-center mt-2">
              <div className="flex items-center gap-1 font-caption text-caption">
                <div className="w-3 h-3 bg-surface-tint border border-primary" />
                헤드
              </div>
              <div className="flex items-center gap-1 font-caption text-caption">
                <div className="w-3 h-3 border border-outline bg-surface-container-highest" />
                강관
              </div>
              <div className="flex items-center gap-1 font-caption text-caption">
                <div className="w-3 h-3 border border-outline bg-surface-container" />
                밸브
              </div>
            </div>
          </section>

          {/* Critical Inventory Status */}
          <section className="flex flex-col gap-card-gap">
            <h3 className="font-section-title text-section-title text-on-surface px-1">
              주요 자재 재고 현황
            </h3>
            <div className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex justify-between items-center shadow-sm">
              <div className="flex flex-col">
                <span className="font-body-main text-body-main text-on-surface font-bold">
                  스프링클러 헤드 15A
                </span>
                <span className="font-body-sub text-body-sub text-secondary">
                  현재 450개 / 필요 500개
                </span>
              </div>
              <div className="px-3 py-1 rounded-full border border-[#1B873F] bg-white text-[#1B873F] font-button-text text-caption h-[28px] flex items-center font-semibold">
                안전
              </div>
            </div>
            <div className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex justify-between items-center border-l-4 border-l-[#d48806] shadow-sm">
              <div className="flex flex-col">
                <span className="font-body-main text-body-main text-on-surface font-bold">
                  강관 100A
                </span>
                <span className="font-body-sub text-body-sub text-secondary">
                  현재 120본 / 필요 300본
                </span>
              </div>
              <div className="px-3 py-1 rounded-full border border-[#d48806] bg-white text-[#d48806] font-button-text text-caption h-[28px] flex items-center font-semibold">
                주의
              </div>
            </div>
            <div className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex justify-between items-center border-l-4 border-l-error shadow-sm">
              <div className="flex flex-col">
                <span className="font-body-main text-body-main text-on-surface font-bold">
                  밸브 50A
                </span>
                <span className="font-body-sub text-body-sub text-secondary">
                  현재 50개 / 필요 200개
                </span>
              </div>
              <div className="px-3 py-1 rounded-full border border-error bg-error text-white font-button-text text-caption h-[28px] flex items-center font-semibold">
                부족
              </div>
            </div>
          </section>

          {/* Recent History */}
          <section className="flex flex-col gap-card-gap">
            <h3 className="font-section-title text-section-title text-on-surface px-1">
              최근 입고 내역
            </h3>
            <div className="bg-white border border-[#E3E6EA] rounded-lg divide-y divide-outline-variant shadow-sm overflow-hidden">
              <div className="p-card-padding flex justify-between items-center active:bg-surface-container-low cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-body-main text-body-main text-on-surface font-bold">
                    스프링클러 헤드 15A
                  </span>
                  <span className="font-body-sub text-body-sub text-secondary">08.24 14:30</span>
                </div>
                <span className="font-body-main text-body-main text-primary font-bold">50 개</span>
              </div>
              <div className="p-card-padding flex justify-between items-center active:bg-surface-container-low cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-body-main text-body-main text-on-surface font-bold">
                    강관 100A
                  </span>
                  <span className="font-body-sub text-body-sub text-secondary">08.24 10:15</span>
                </div>
                <span className="font-body-main text-body-main text-primary font-bold">20 본</span>
              </div>
              <div className="p-card-padding flex justify-between items-center active:bg-surface-container-low cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-body-main text-body-main text-on-surface font-bold">
                    밸브 50A
                  </span>
                  <span className="font-body-sub text-body-sub text-secondary">08.23 16:45</span>
                </div>
                <span className="font-body-main text-body-main text-primary font-bold">30 개</span>
              </div>
            </div>
          </section>
        </main>

        {/* BottomNavBar */}
        <nav className="bg-surface fixed bottom-0 w-full max-w-[390px] z-50 h-16 border-t border-outline-variant flex justify-around items-center px-2 shadow-lg">
          <Link
            aria-label="홈"
            className="flex flex-col items-center justify-center text-primary font-button-text hover:bg-surface-container-low active:opacity-80 transition-opacity w-full h-full cursor-pointer"
            href={`/sites/${id}`}
          >
            <span
              className="material-symbols-outlined mb-0.5 text-[22px]"
              data-icon="home"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              home
            </span>
            <span className="font-caption text-[11px] leading-tight">홈</span>
          </Link>
          <button
            type="button"
            aria-label="공정"
            className="flex flex-col items-center justify-center text-secondary font-caption hover:bg-surface-container-low active:opacity-80 transition-opacity w-full h-full cursor-pointer"
          >
            <span className="material-symbols-outlined mb-0.5 text-[22px]" data-icon="trending_up">
              trending_up
            </span>
            <span className="font-caption text-[11px] leading-tight">공정</span>
          </button>
          <button
            type="button"
            aria-label="문서"
            className="flex flex-col items-center justify-center text-secondary font-caption hover:bg-surface-container-low active:opacity-80 transition-opacity w-full h-full cursor-pointer"
          >
            <span className="material-symbols-outlined mb-0.5 text-[22px]" data-icon="description">
              description
            </span>
            <span className="font-caption text-[11px] leading-tight">문서</span>
          </button>
          <button
            type="button"
            aria-label="설정"
            className="flex flex-col items-center justify-center text-secondary font-caption hover:bg-surface-container-low active:opacity-80 transition-opacity w-full h-full cursor-pointer"
          >
            <span className="material-symbols-outlined mb-0.5 text-[22px]" data-icon="settings">
              settings
            </span>
            <span className="font-caption text-[11px] leading-tight">설정</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
