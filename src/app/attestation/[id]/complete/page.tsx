export default function AttestationCompletePage() {
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
          <h1 className="font-headline-display text-headline-display text-primary">인증 완료</h1>
        </div>
      </header>

      {/* Main */}
      <main className="pt-[64px] pb-[96px] px-screen-margin flex flex-col gap-section-gap mt-[20px]">
        {/* ① 완료 배너 */}
        <section className="bg-success text-on-primary p-4 rounded flex items-start gap-3">
          <span className="material-symbols-outlined shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>
            verified
          </span>
          <div>
            <p className="font-section-title text-section-title">상호 인증 완료</p>
            <p className="font-body-sub text-body-sub mt-1">서명 4건 · 해시 체인 검증 통과</p>
          </div>
        </section>

        {/* ② 문서 */}
        <section className="card-level-1 p-card-padding flex flex-col gap-1">
          <div className="font-section-title text-section-title text-on-surface leading-[26px]">
            3층 소화배관 수압시험 검측서
          </div>
          <div className="font-caption text-caption text-secondary mt-1">
            동래 A현장 · v1 · 완료 2026-08-30 09:12
          </div>
          <div className="border-t border-outline-variant mt-3 pt-3">
            <div className="font-caption text-caption text-secondary">최종 체인 해시</div>
            <div className="font-caption text-caption text-on-surface break-all mt-[2px]">
              9af6b3d1c05e47a2f8e91d6b0c3a57e4
            </div>
          </div>
        </section>

        {/* ③ 서명 이력 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">서명 이력</h2>
          <div className="card-level-1 p-0 flex flex-col">
            <div className="p-4 border-b border-outline-variant">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-body-main text-body-main text-on-surface">① 시공 팀장</div>
                  <div className="font-caption text-caption text-secondary mt-1">
                    김O수 · ㈜비유피 소방팀
                  </div>
                </div>
                <div className="shrink-0 font-caption text-caption text-secondary text-right">
                  08-29 14:20
                </div>
              </div>
              <div className="font-caption text-caption text-secondary mt-2 break-all">
                화면 필기 · 체인 7c1e4b90
              </div>
            </div>

            <div className="p-4 border-b border-outline-variant">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-body-main text-body-main text-on-surface">② 현장 관리자</div>
                  <div className="font-caption text-caption text-secondary mt-1">윤O태 · ㈜비유피</div>
                </div>
                <div className="shrink-0 font-caption text-caption text-secondary text-right">
                  08-29 16:05
                </div>
              </div>
              <div className="font-caption text-caption text-secondary mt-2 break-all">
                화면 필기 · 체인 2b90f3ac
              </div>
            </div>

            <div className="p-4 border-b border-outline-variant">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-body-main text-body-main text-on-surface">③ 상위공종 담당자</div>
                  <div className="font-caption text-caption text-secondary mt-1">
                    최O석 · 대성종합건설 기계팀
                  </div>
                </div>
                <div className="shrink-0 font-caption text-caption text-secondary text-right">
                  08-30 08:47
                </div>
              </div>
              <div className="font-caption text-caption text-secondary mt-2 break-all">
                화면 필기 · 체인 e4d37f18
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-body-main text-body-main text-on-surface">④ 감리</div>
                  <div className="font-caption text-caption text-secondary mt-1">한O중 · 동남감리단</div>
                </div>
                <div className="shrink-0 font-caption text-caption text-secondary text-right">
                  08-30 09:12
                </div>
              </div>
              <div className="font-caption text-caption text-secondary mt-2 break-all">
                1회용 링크 서명 (계정 없음) · 체인 9af6b3d1
              </div>
            </div>
          </div>
        </section>

        {/* ④ 후행공정 안내 */}
        <section className="bg-secondary-container p-3 rounded flex items-start gap-2">
          <span
            className="material-symbols-outlined shrink-0 text-primary text-[20px]"
            style={{fontVariationSettings: "'FILL' 1"}}
          >
            lock_open
          </span>
          <div className="min-w-0">
            <p className="font-body-sub text-body-sub font-semibold text-on-secondary-fixed">
              후행공정 입력이 열렸습니다
            </p>
            <p className="font-caption text-caption text-on-secondary-container mt-[2px]">
              3층 배관 보온 · 마감 작업 등록 가능
            </p>
          </div>
        </section>

        {/* ⑤ 회람 이력 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">회람 이력</h2>
          <div className="card-level-1 p-4 flex flex-col gap-2 font-caption text-caption text-secondary">
            <div className="flex justify-between gap-3">
              <span>회람 시작 · 내용 고정</span>
              <span className="shrink-0">08-29 16:05</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>감리 링크 발송</span>
              <span className="shrink-0">08-30 08:47</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>감리 문서 열람</span>
              <span className="shrink-0">08-30 09:03</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>체인 재검증 통과</span>
              <span className="shrink-0">08-30 09:12</span>
            </div>
          </div>
        </section>
      </main>

      {/* 하단 고정 */}
      <div className="fixed bottom-0 w-full max-w-[390px] h-[64px] z-50 bg-primary flex items-center justify-center active:bg-primary-fixed-variant transition-colors cursor-pointer">
        <button className="w-full h-full font-button-text text-button-text text-on-primary">
          완료본 PDF 받기
        </button>
      </div>
    </div>
  );
}
