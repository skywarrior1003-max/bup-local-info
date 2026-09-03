'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AttendanceStatusPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen text-on-surface font-body-main">
      <div className="w-full max-w-[390px] min-h-screen bg-[#F5F6F8] relative pb-24 pt-[56px] shadow-lg flex flex-col">
        {/* TopAppBar */}
        <header className="bg-surface text-primary font-headline-display text-headline-display-mobile flex justify-between items-center h-[56px] px-screen-margin w-full max-w-[390px] fixed top-0 z-50 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <Link
              href={`/sites/${id}`}
              aria-label="이전 화면으로"
              className="text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full p-1 -ml-1 active:opacity-70 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </Link>
            <h1 className="text-primary font-bold text-[18px] tracking-tight">팀별 출역 현황</h1>
          </div>
          <button
            type="button"
            aria-label="알림"
            className="text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-full p-1 -mr-1 active:opacity-70 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
        </header>

        {/* Main Content Canvas */}
        <main className="w-full px-screen-margin pt-4 flex flex-col gap-section-gap">
          {/* Dashboard Header: Date & Total Worker Count */}
          <section className="flex justify-between items-end pb-2 border-b-2 border-primary">
            <div>
              <p className="font-body-sub text-outline mb-1 font-medium tracking-wide">
                2026년 08월 28일 (금)
              </p>
              <h2 className="font-section-title text-on-surface font-semibold">
                금일 총 출역 인원
              </h2>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-number-highlight text-primary text-[32px] leading-none font-bold">
                42
              </span>
              <span className="font-button-text text-on-surface-variant font-medium">명</span>
            </div>
          </section>

          {/* Team List Area */}
          <div className="flex flex-col gap-card-gap">
            {/* Team Card 1: 배관팀 */}
            <article
              className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-4 cursor-pointer active:bg-surface-container-low transition-colors shadow-sm"
              tabIndex={0}
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm">
                    배관
                  </div>
                  <div>
                    <h3 className="font-section-title text-on-surface leading-tight font-semibold">
                      A구역 배관팀
                    </h3>
                    <p className="font-body-sub text-outline mt-1 line-clamp-1">
                      지하 2층 소방 배관 행거 설치
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-number-highlight text-primary font-bold">12</span>
                  <span className="font-body-main text-on-surface-variant">명</span>
                </div>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mb-1 overflow-hidden flex">
                <div className="bg-primary h-full" style={{ width: '28.5%' }} />
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-[4px] font-caption text-caption font-medium">
                    <span className="material-symbols-outlined text-[14px]">engineering</span> 배관공
                    10
                  </span>
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-[4px] font-caption text-caption font-medium">
                    <span className="material-symbols-outlined text-[14px]">supervisor_account</span>{' '}
                    반장 2
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[20px]">
                  chevron_right
                </span>
              </div>
            </article>

            {/* Team Card 2: 용접팀 */}
            <article
              className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-4 cursor-pointer active:bg-surface-container-low transition-colors shadow-sm"
              tabIndex={0}
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E3A5F] text-white border border-[#1E3A5F] flex items-center justify-center font-bold text-sm">
                    용접
                  </div>
                  <div>
                    <h3 className="font-section-title text-on-surface leading-tight font-semibold">
                      A구역 용접팀
                    </h3>
                    <p className="font-body-sub text-outline mt-1 line-clamp-1">
                      지상 1층 스프링클러 주배관 용접
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-number-highlight text-primary font-bold">15</span>
                  <span className="font-body-main text-on-surface-variant">명</span>
                </div>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mb-1 overflow-hidden flex">
                <div className="bg-surface-tint h-full" style={{ width: '35.7%' }} />
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-[4px] font-caption text-caption font-medium">
                    <span className="material-symbols-outlined text-[14px]">handyman</span> 용접공 13
                  </span>
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-[4px] font-caption text-caption font-medium">
                    <span className="material-symbols-outlined text-[14px]">
                      precision_manufacturing
                    </span>{' '}
                    용접기 4대
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[20px]">
                  chevron_right
                </span>
              </div>
            </article>

            {/* Team Card 3: 설비팀 */}
            <article
              className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-4 cursor-pointer active:bg-surface-container-low transition-colors shadow-sm"
              tabIndex={0}
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                    설비
                  </div>
                  <div>
                    <h3 className="font-section-title text-on-surface leading-tight font-semibold">
                      소방설비팀
                    </h3>
                    <p className="font-body-sub text-outline mt-1 line-clamp-1">
                      지하 1층 배관 슬리브 매립
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-number-highlight text-primary font-bold">8</span>
                  <span className="font-body-main text-on-surface-variant">명</span>
                </div>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mb-1 overflow-hidden flex">
                <div className="bg-outline h-full" style={{ width: '19%' }} />
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-[4px] font-caption text-caption font-medium">
                    <span className="material-symbols-outlined text-[14px]">plumbing</span> 배관공 8
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[20px]">
                  chevron_right
                </span>
              </div>
            </article>

            {/* Team Card 4: 전기팀 */}
            <article
              className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-4 cursor-pointer active:bg-surface-container-low transition-colors shadow-sm"
              tabIndex={0}
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm">
                    전기
                  </div>
                  <div>
                    <h3 className="font-section-title text-on-surface leading-tight font-semibold">
                      전기팀
                    </h3>
                    <p className="font-body-sub text-outline mt-1 line-clamp-1">
                      지상 1층 소방 전선관 배선
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-number-highlight text-primary font-bold">7</span>
                  <span className="font-body-main text-on-surface-variant">명</span>
                </div>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mb-1 overflow-hidden flex">
                <div className="bg-outline h-full" style={{ width: '16.6%' }} />
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-[4px] font-caption text-caption font-medium">
                    <span className="material-symbols-outlined text-[14px]">electric_bolt</span> 전공
                    7
                  </span>
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-[4px] font-caption text-caption font-medium">
                    <span className="material-symbols-outlined text-[14px]">rv_hookup</span>{' '}
                    고소작업대 1대
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[20px]">
                  chevron_right
                </span>
              </div>
            </article>
          </div>
        </main>

        {/* BottomNavBar */}
        <nav className="fixed bottom-0 w-full max-w-[390px] h-16 z-50 flex justify-around items-center bg-surface px-4 border-t border-outline-variant shadow-lg">
          <Link
            href={`/sites/${id}`}
            className="flex flex-col items-center justify-center text-secondary font-button-text text-caption hover:bg-secondary-container/50 transition-colors active:scale-95 duration-100 p-2 w-full h-full rounded-lg cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[24px] mb-1"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              home
            </span>
            <span>홈</span>
          </Link>
          <button
            type="button"
            className="flex flex-col items-center justify-center text-primary font-bold font-button-text text-caption hover:bg-secondary-container/50 transition-colors active:scale-95 duration-100 p-2 w-full h-full rounded-lg bg-surface-container-low cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[24px] mb-1 text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_tree
            </span>
            <span>공정</span>
          </button>
          <Link
            href={`/sites/${id}/report`}
            className="flex flex-col items-center justify-center text-secondary font-button-text text-caption hover:bg-secondary-container/50 transition-colors active:scale-95 duration-100 p-2 w-full h-full rounded-lg cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[24px] mb-1"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              description
            </span>
            <span>서류</span>
          </Link>
          <button
            type="button"
            className="flex flex-col items-center justify-center text-secondary font-button-text text-caption hover:bg-secondary-container/50 transition-colors active:scale-95 duration-100 p-2 w-full h-full rounded-lg cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[24px] mb-1"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              settings
            </span>
            <span>설정</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
