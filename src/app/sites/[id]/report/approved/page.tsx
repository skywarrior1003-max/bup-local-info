'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function DailyReportApprovedPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen text-on-surface">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-[390px] min-h-screen bg-[#F5F6F8] relative pb-[100px] shadow-lg flex flex-col font-body-main">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full h-[64px] bg-surface border-b border-outline-variant flex items-center px-[20px] max-w-[390px] z-50">
          <Link
            href={`/sites/${id}/report`}
            aria-label="뒤로가기"
            className="w-10 h-10 flex items-center justify-center text-primary active:scale-95 transition-transform duration-100 mr-2 -ml-2 rounded-full hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined" data-icon="arrow_back">
              arrow_back
            </span>
          </Link>
          <h1 className="flex-1 text-center font-headline-display text-[18px] font-bold text-primary">
            일일 보고서
          </h1>
          <button
            type="button"
            aria-label="PDF"
            className="w-10 h-10 flex items-center justify-center text-primary active:scale-95 transition-transform duration-100 ml-2 -mr-2 rounded-full hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined" data-icon="picture_as_pdf">
              picture_as_pdf
            </span>
          </button>
        </header>

        {/* Main Content Canvas */}
        <main className="w-full mt-[64px] px-screen-margin pt-section-gap flex flex-col gap-section-gap pb-12">
          {/* Header Info */}
          <div className="flex justify-between items-start">
            <div>
              <p className="font-body-sub text-body-sub text-secondary">2026-08-28</p>
              <p className="font-caption text-caption text-secondary mt-1">
                2026-08-28 18:32 김O수 승인
              </p>
            </div>
            <div className="h-[28px] px-3 flex items-center justify-center border border-[#1B873F] text-[#1B873F] rounded-full font-button-text text-caption font-semibold bg-white">
              승인 완료
            </div>
          </div>

          {/* Section 1: 날씨 및 출력 인원 */}
          <section className="flex flex-col gap-card-gap">
            <h2 className="font-section-title text-section-title text-primary font-semibold">
              기본 현황
            </h2>
            <div className="bg-surface-container-lowest p-card-padding rounded border border-surface-variant flex flex-col gap-3 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-surface-variant">
                <span className="font-body-sub text-body-sub text-secondary">날씨</span>
                <span className="font-body-main text-body-main font-medium">
                  맑음 (24℃ / 31℃)
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-surface-variant">
                <span className="font-body-sub text-body-sub text-secondary">출력 인원</span>
                <span className="font-body-main text-body-main font-medium">총 8명</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-sub text-body-sub text-secondary">장비 투입</span>
                <span className="font-body-main text-body-main font-medium">
                  고소작업대 1대, 용접기 2대
                </span>
              </div>
            </div>
          </section>

          {/* Section 2: 주요 작업 내용 */}
          <section className="flex flex-col gap-card-gap">
            <h2 className="font-section-title text-section-title text-primary font-semibold">
              주요 작업 내용
            </h2>
            <div className="bg-surface-container-lowest p-card-padding rounded border border-surface-variant flex flex-col gap-3 shadow-sm">
              <ul className="list-disc pl-5 font-body-main text-body-main space-y-2">
                <li>1층 주차장 소방 메인배관 45m 설치</li>
                <li>지하 2층 스프링클러 배관 행거 설치</li>
                <li>수압 테스트 준비 및 잔여 자재 정리</li>
              </ul>
            </div>
          </section>

          {/* Section 3: 특기 사항 */}
          <section className="flex flex-col gap-card-gap">
            <h2 className="font-section-title text-section-title text-primary font-semibold">
              특기 사항
            </h2>
            <div className="bg-surface-container-lowest p-card-padding rounded border border-surface-variant shadow-sm">
              <p className="font-body-main text-body-main">
                오후 2시경 강우로 인해 1시간 작업 중지됨. 이후 배수 조치 완료 후 재개.
              </p>
            </div>
          </section>

          {/* Section 4: 현장 사진 */}
          <section className="flex flex-col gap-card-gap">
            <h2 className="font-section-title text-section-title text-primary font-semibold">
              현장 사진
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative w-full h-32 rounded border border-surface-variant overflow-hidden shadow-sm">
                <Image
                  alt="현장 굴삭 작업 사진"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvGg7E82hRJcydChLUjY6GjHvB82zQlsPPoNT8x2JWJ7jJkr_jW3XXwfYieT4fGUOgfHTG8NiAFfK2L9la3gb-Elhd19XDb8zXS2lKV-UtnF8tAtgDeEJ3SP3Dqr59z7henRirBbS4PTFKaCXZb3If0ao0grhmKVldYhuXaEcXs3qFwEgSmprxcJL_Py2tn6iPJVODS-3U1BE2d6Y-t8WEPftaNJadLJLvOZ0qA2iD0S7Pq38V_Ray"
                  fill
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative w-full h-32 rounded border border-surface-variant overflow-hidden shadow-sm">
                <Image
                  alt="철근 설치 배근 사진"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEbPwj0mAzXYM-pN_wHWKliTkYLHQczvQ9bbFXzOwyIYUX9bkH7qWEOZ22qi-R9O0lzCWpCi_vZLqdtcfbJQkB6RZTxfb9VAnjtbdfOdBEf2ZYhgt1BxEFCA3yyXC9Zcc3otW_5ft0FHJKdBOqayMnpEDIvDyF-hTXAF4-XP4dqE8PQOz3l8VXqdAb2kT4eVNARCAtUdapVEj7QR9-WRkmydzoAIuEbd15jA3DbXL_1cI9SMguVit4"
                  fill
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Action Area */}
        <div className="fixed bottom-0 w-full max-w-[390px] bg-surface border-t border-outline-variant p-screen-margin z-50">
          <button
            type="button"
            className="w-full h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined" data-icon="share">
              share
            </span>
            PDF 공유하기
          </button>
        </div>
      </div>
    </div>
  );
}
