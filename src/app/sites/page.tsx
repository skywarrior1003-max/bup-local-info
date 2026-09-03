import Link from 'next/link';

export default function SitesPage() {
  return (
    <div className="relative w-full max-w-mobile-width bg-background min-h-screen pb-[100px] shadow-lg shadow-outline-variant/20">
      {/* TopAppBar (Transactional/Task-Focused) */}
      <header className="w-full px-screen-margin pt-10 pb-6">
        <h1 className="font-headline-display text-headline-display text-primary">현장 선택</h1>
        <p className="font-body-sub text-body-sub text-on-surface-variant mt-2">참여 중인 현장입니다</p>
      </header>

      {/* Main Content Canvas */}
      <main className="w-full px-screen-margin flex flex-col gap-card-gap">
        {/* Card 1: 동래 A현장 */}
        <Link
          href="/sites/1"
          className="block transition-transform active:scale-[0.99]"
        >
          <article className="bg-surface-container-lowest border border-[#E3E6EA] rounded-card p-card-padding flex flex-col gap-3 hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-section-title text-section-title text-on-surface">동래 A현장</h2>
                <p className="font-body-sub text-body-sub text-on-surface-variant mt-1">부산 동래구 · 소방설비</p>
              </div>
              {/* Role Badge: 현장소장 (Navy Border + Navy Text) */}
              <span className="inline-flex items-center justify-center px-3 h-[28px] rounded-full border border-primary-container text-primary-container text-[13px] font-semibold bg-surface-container-lowest">
                현장소장
              </span>
            </div>
            <div className="mt-2 pt-3 border-t border-surface-variant flex justify-between items-center">
              <p className="font-body-main text-body-main text-on-surface">
                오늘 출역 <span className="text-primary-container font-semibold">8</span>명 · 확인 대기{' '}
                <span className="text-primary-container font-semibold">2</span>건
              </p>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </div>
          </article>
        </Link>

        {/* Card 2: 해운대 B현장 */}
        <Link
          href="/sites/2"
          className="block transition-transform active:scale-[0.99]"
        >
          <article className="bg-surface-container-lowest border border-[#E3E6EA] rounded-card p-card-padding flex flex-col gap-3 hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-section-title text-section-title text-on-surface">해운대 B현장</h2>
                <p className="font-body-sub text-body-sub text-on-surface-variant mt-1">부산 해운대구 · 소방설비</p>
              </div>
              {/* Role Badge: 공무 (Light Gray Background + Dark Text) */}
              <span className="inline-flex items-center justify-center px-3 h-[28px] rounded-full bg-surface-container text-on-surface text-[13px] font-semibold">
                공무
              </span>
            </div>
            <div className="mt-2 pt-3 border-t border-surface-variant flex justify-between items-center">
              <p className="font-body-main text-body-main text-on-surface">
                오늘 출역 <span className="text-primary-container font-semibold">3</span>명 · 확인 대기{' '}
                <span className="text-primary-container font-semibold">0</span>건
              </p>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </div>
          </article>
        </Link>

        {/* Card 3: 사상 C현장 (작업자) */}
        <Link
          href="/sites/3/worker"
          className="block transition-transform active:scale-[0.99]"
        >
          <article className="bg-surface-container-lowest border border-[#E3E6EA] rounded-card p-card-padding flex flex-col gap-3 hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-section-title text-section-title text-on-surface">사상 C현장</h2>
                <p className="font-body-sub text-body-sub text-on-surface-variant mt-1">부산 사상구 · 전기</p>
              </div>
              {/* Role Badge: 작업자 (Light Gray Background + Dark Text) */}
              <span className="inline-flex items-center justify-center px-3 h-[28px] rounded-full bg-surface-variant text-on-surface text-[13px] font-semibold">
                작업자
              </span>
            </div>
            <div className="mt-2 pt-3 border-t border-surface-variant flex justify-between items-center">
              <p className="font-body-main text-body-main text-on-surface">
                오늘 내 작업 <span className="text-primary-container font-semibold">2</span>건
              </p>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </div>
          </article>
        </Link>
      </main>

      {/* Fixed Bottom Action Button Area */}
      <div className="fixed bottom-0 w-full max-w-mobile-width bg-background pt-4 pb-8 px-screen-margin z-20">
        <button
          type="button"
          className="w-full h-[64px] bg-primary-container text-on-primary rounded-lg font-button-text text-button-text flex items-center justify-center gap-2 active:bg-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          현장 추가
        </button>
      </div>
    </div>
  );
}
