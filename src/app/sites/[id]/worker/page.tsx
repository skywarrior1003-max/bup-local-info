'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function WorkerHomePage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '3';

  return (
    <div className="w-full flex justify-center bg-[#e3e2e6] min-h-screen text-on-surface">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-[390px] min-h-screen bg-background relative pt-[64px] pb-[64px] shadow-sm overflow-hidden flex flex-col">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[390px] h-[64px] bg-surface flex items-center px-[20px] border-b border-outline-variant z-50">
          <Link
            href="/sites"
            aria-label="뒤로가기"
            className="mr-4 text-primary active:scale-95 transition-transform duration-100 flex items-center justify-center cursor-pointer p-1 -ml-1 rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-display text-headline-display text-primary tracking-tight font-bold">
            현장 관리
          </h1>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-1 flex flex-col p-screen-margin gap-section-gap overflow-y-auto">
          {/* Project Header & Role Badge */}
          <section className="flex justify-between items-center mt-2">
            <h2 className="font-section-title text-section-title text-on-surface font-semibold">
              동래 A현장
            </h2>
            {/* Worker Badge: Light Gray background, dark text */}
            <div className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full border border-outline-variant font-caption text-caption font-semibold flex items-center justify-center">
              작업자
            </div>
          </section>

          {/* Center Highlight: Today's Tasks */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding flex flex-col items-center justify-center py-8 shadow-sm">
            <p className="font-body-sub text-body-sub text-on-surface-variant mb-2">오늘 내 작업</p>
            <div className="flex items-baseline gap-1">
              <span className="font-number-highlight text-number-highlight text-primary font-bold">
                2
              </span>
              <span className="font-button-text text-button-text text-on-surface font-medium">
                건 기록됨
              </span>
            </div>
          </section>

          {/* Giant Action Button */}
          <section>
            <Link
              href={`/sites/${id}/photo/before`}
              className="w-full h-[96px] bg-primary text-on-primary rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform duration-100 shadow-sm border border-transparent focus:ring-2 focus:ring-primary-fixed focus:outline-none cursor-pointer hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[32px]">photo_camera</span>
              <span className="font-button-text text-button-text font-semibold">
                작업 사진 찍기
              </span>
            </Link>
          </section>

          {/* Today's Session List */}
          <section className="flex flex-col gap-3 mt-2">
            <h3 className="font-section-title text-section-title text-on-surface font-semibold">
              오늘의 기록
            </h3>
            <div className="flex flex-col gap-card-gap">
              {/* List Item 1 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-card-padding flex items-center gap-4 shadow-sm">
                <Image
                  alt="배전반 기본 틀 설치 작업 사진"
                  className="w-[60px] h-[60px] bg-surface-variant rounded-DEFAULT object-cover flex-shrink-0 border border-outline-variant"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOle_27z_M6VYzEL-41l7U23EzNbaLMJv3UBiHmO5YDszlGUUdFjbhKtGdicXilaCAKJk0JKNXL4mh7Ppie2fTG_4wvrFwM5-DEQR85bx2pguz3KREK3-W8JV8jJvKbY2stDDKSCR5nCaPeQvh1Be2N_T7RdrvwwVito8rH7N_Xqs8nUykI41-APoves_gPj6B9TTERZ2Cd14PP8Yr4Sdt_ffB1u-7H9jXSx9j9KmkA3Tb5bQXtbCV"
                  width={60}
                  height={60}
                  unoptimized
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-body-main text-body-main font-semibold text-on-surface">
                      08:12
                    </span>
                    {/* Status Badge: Capsule shape, 28px height */}
                    <span className="h-[28px] px-3 flex items-center justify-center bg-surface-container text-on-surface-variant rounded-full font-caption text-caption font-semibold">
                      작업 전
                    </span>
                  </div>
                  <p className="font-body-sub text-body-sub text-on-surface-variant line-clamp-1">
                    배전반 기본 틀 설치 작업
                  </p>
                </div>
              </div>

              {/* List Item 2 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-card-padding flex items-center gap-4 shadow-sm">
                <Image
                  alt="1층 복도 가벽 마감 완료 사진"
                  className="w-[60px] h-[60px] bg-surface-variant rounded-DEFAULT object-cover flex-shrink-0 border border-outline-variant"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAWUDvAYJZFCAja4dijPkDl7teDdIPsta8fNbbihwl_aMVaFS8rjJgSG_LTDSgQ4ZxzP-shpw5QA0eSuLC64ZaE2PyXIfszgQMfQ-JaSP-7zBB9KiqwDeI0_6WK-uxZLFFvj6oMv3IUB8itJVrYCig62qyBdKPiUsAgez3iaNfi34ZYBPOyaIVvRtIXIIGtk2jLzbZUBN4t3K4wJpcWlCLe02aaOSOcdSmakfTJ1bxvP9qdRvwuqWE"
                  width={60}
                  height={60}
                  unoptimized
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-body-main text-body-main font-semibold text-on-surface">
                      11:45
                    </span>
                    <span className="h-[28px] px-3 flex items-center justify-center bg-surface-container text-on-surface-variant rounded-full font-caption text-caption font-semibold">
                      작업 후
                    </span>
                  </div>
                  <p className="font-body-sub text-body-sub text-on-surface-variant line-clamp-1">
                    1층 복도 가벽 마감 완료
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* BottomNavBar */}
        <nav className="fixed bottom-0 w-full max-w-[390px] h-[64px] bg-surface border-t border-outline-variant flex justify-around items-center px-[20px] z-50">
          {/* Tab 1: 홈 (Active) */}
          <Link
            href={`/sites/${id}/worker`}
            className="flex flex-col items-center justify-center text-primary font-bold h-full w-full hover:bg-surface-container-low active:bg-surface-container-highest transition-colors duration-200 cursor-pointer"
          >
            <span
              className="material-symbols-outlined mb-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              home
            </span>
            <span className="font-caption text-caption">홈</span>
          </Link>
          {/* Tab 2: 공정 (Inactive) */}
          <button
            type="button"
            className="flex flex-col items-center justify-center text-secondary h-full w-full hover:bg-surface-container-low active:bg-surface-container-highest transition-colors duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined mb-1">architecture</span>
            <span className="font-caption text-caption">공정</span>
          </button>
          {/* Tab 3: 서류 (Inactive) */}
          <button
            type="button"
            className="flex flex-col items-center justify-center text-secondary h-full w-full hover:bg-surface-container-low active:bg-surface-container-highest transition-colors duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined mb-1">description</span>
            <span className="font-caption text-caption">서류</span>
          </button>
          {/* Tab 4: 설정 (Inactive) */}
          <button
            type="button"
            className="flex flex-col items-center justify-center text-secondary h-full w-full hover:bg-surface-container-low active:bg-surface-container-highest transition-colors duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined mb-1">settings</span>
            <span className="font-caption text-caption">설정</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
