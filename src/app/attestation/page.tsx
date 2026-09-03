'use client';

import {useRouter} from 'next/navigation';

export default function AttestationInboxPage() {
  const router = useRouter();

  return (
    <div className="app-container">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] h-[64px] bg-surface flex items-center justify-between px-[20px] border-b border-outline-variant z-50">
        <div className="flex items-center gap-2">
          <button
            aria-label="Go back"
            className="text-primary active:scale-95 transition-transform duration-100 flex items-center justify-center p-2 -ml-2"
          >
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>
              arrow_back
            </span>
          </button>
          <h1 className="font-headline-display text-headline-display text-primary">서명 요청함</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="fixed top-[64px] w-full max-w-[390px] h-[48px] bg-surface border-b border-outline-variant z-40 flex items-stretch px-[20px]">
        <button className="flex-1 flex items-center justify-center gap-1 border-b-2 border-primary text-primary font-body-sub text-body-sub font-semibold">
          내 차례
          <span className="bg-warning text-on-primary text-[11px] leading-none font-bold rounded-full px-[6px] py-[3px]">
            2
          </span>
        </button>
        <button className="flex-1 flex items-center justify-center border-b-2 border-transparent text-secondary font-body-sub text-body-sub">
          보낸 요청
        </button>
        <button className="flex-1 flex items-center justify-center border-b-2 border-transparent text-secondary font-body-sub text-body-sub">
          완료
        </button>
      </div>

      {/* Main */}
      <main className="pt-[112px] pb-[96px] px-screen-margin flex flex-col gap-section-gap mt-[20px]">
        {/* ① 내 차례 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">내 차례 · 2건</h2>

          <div
            className="card-level-1 p-card-padding flex flex-col gap-2"
            style={{borderLeft: '4px solid #C77700'}}
          >
            <div className="flex items-center justify-between">
              <span className="bg-secondary-container text-on-secondary-fixed font-caption text-caption font-semibold px-2 py-[3px] rounded">
                검수검측서
              </span>
              <span className="text-warning font-caption text-caption font-bold">3 / 4 번째</span>
            </div>
            <div className="font-body-main text-body-main font-semibold text-on-surface leading-[24px]">
              3층 소화배관 수압시험 검측서
            </div>
            <div className="font-caption text-caption text-secondary">동래 A현장 · v1 · 2026-08-29</div>
            <div className="border-t border-outline-variant pt-2 mt-1 flex items-center justify-between">
              <span className="font-caption text-caption text-secondary">앞 순서 2인 서명 완료</span>
              <span className="font-caption text-caption text-secondary">요청 08-29 16:05</span>
            </div>
            <button
              onClick={() => router.push('/attestation/1')}
              className="mt-1 w-full h-[44px] bg-primary text-on-primary font-button-text text-button-text rounded active:opacity-90"
            >
              확인하고 서명
            </button>
          </div>

          <div
            className="card-level-1 p-card-padding flex flex-col gap-2"
            style={{borderLeft: '4px solid #C77700'}}
          >
            <div className="flex items-center justify-between">
              <span className="bg-secondary-container text-on-secondary-fixed font-caption text-caption font-semibold px-2 py-[3px] rounded">
                안전점검표
              </span>
              <span className="text-secondary font-caption text-caption font-semibold">동시 서명 · 3인</span>
            </div>
            <div className="font-body-main text-body-main font-semibold text-on-surface leading-[24px]">
              08-30 용접작업 전 안전점검표
            </div>
            <div className="font-caption text-caption text-secondary">동래 A현장 · v1 · 2026-08-30</div>
            <div className="border-t border-outline-variant pt-2 mt-1 flex items-center justify-between">
              <span className="font-caption text-caption text-secondary">순서 없음 (병렬)</span>
              <span className="font-caption text-caption text-secondary">요청 08-30 07:10</span>
            </div>
            <button
              onClick={() => router.push('/attestation/2')}
              className="mt-1 w-full h-[44px] bg-primary text-on-primary font-button-text text-button-text rounded active:opacity-90"
            >
              확인하고 서명
            </button>
          </div>
        </section>

        {/* ② 내가 보낸 요청 */}
        <section className="flex flex-col gap-card-gap">
          <div className="flex items-center justify-between">
            <h2 className="font-section-title text-section-title text-on-surface">내가 보낸 요청</h2>
            <a
              className="font-body-sub text-body-sub text-primary font-semibold underline underline-offset-2"
              href="#"
            >
              전체
            </a>
          </div>
          <div className="card-level-1 p-0 flex flex-col">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-body-main text-body-main text-on-surface truncate">
                  지하 1층 소화전 설치 검측서
                </div>
                <div className="font-caption text-caption text-secondary mt-1">
                  감리 서명 대기 · 08-28 발송
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-body-sub text-body-sub font-semibold text-warning">3 / 4</div>
                <div className="font-caption text-caption text-secondary mt-[2px]">회람 중</div>
              </div>
            </div>

            <div className="p-4 border-b border-outline-variant flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-body-main text-body-main text-on-surface truncate">
                  8월 3주차 공사일보
                </div>
                <div className="font-caption text-caption text-secondary mt-1">현장 관리자 서명 대기</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-body-sub text-body-sub font-semibold text-warning">1 / 3</div>
                <div className="font-caption text-caption text-secondary mt-[2px]">회람 중</div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-body-main text-body-main text-on-surface truncate">
                  2층 스프링클러 헤드 검측서
                </div>
                <div className="font-caption text-caption text-secondary mt-1">감리 반려 · 재기안 필요</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-body-sub text-body-sub font-semibold text-error">반려</div>
                <div className="font-caption text-caption text-secondary mt-[2px]">08-27</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 하단 고정 */}
      <div className="fixed bottom-0 w-full max-w-[390px] h-[64px] z-50 bg-primary flex items-center justify-center active:bg-primary-fixed-variant transition-colors cursor-pointer">
        <button className="w-full h-full font-button-text text-button-text text-on-primary">
          새 문서 회람 시작
        </button>
      </div>
    </div>
  );
}
