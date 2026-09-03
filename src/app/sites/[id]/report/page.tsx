'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

export default function DailyReportPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';
  const router = useRouter();

  const handleApprove = () => {
    router.push(`/sites/${id}/report/approved`);
  };

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen text-on-surface">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-[390px] min-h-screen bg-[#F5F6F8] relative pb-[100px] shadow-lg flex flex-col font-body-main">
        {/* Top App Bar */}
        <header className="fixed top-0 w-full h-[64px] bg-surface border-b border-outline-variant z-50 flex items-center px-[20px] max-w-[390px]">
          <Link
            href={`/sites/${id}`}
            aria-label="뒤로가기"
            className="text-on-surface-variant hover:bg-surface-container active:scale-95 transition-transform duration-100 p-2 -ml-2 rounded-full cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined" data-icon="arrow_back">
              arrow_back
            </span>
          </Link>
          <h1 className="flex-1 text-center font-headline-display text-[18px] font-bold text-primary">
            일일 보고서
          </h1>
          <Link
            href={`/sites/${id}`}
            aria-label="닫기"
            className="text-on-surface-variant hover:bg-surface-container active:scale-95 transition-transform duration-100 p-2 -mr-2 rounded-full cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined" data-icon="close">
              close
            </span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="pt-[84px] px-screen-margin max-w-[390px] w-full space-y-section-gap">
          {/* Header Info */}
          <div className="flex justify-between items-end border-b border-outline-variant pb-4">
            <div>
              <p className="font-body-sub text-body-sub text-secondary">보고 일자</p>
              <p className="font-section-title text-[20px] font-bold mt-1 text-on-surface">
                2026-08-28
              </p>
            </div>
            <div className="h-[28px] px-3 rounded-full border border-[#C77700] text-[#C77700] bg-white flex items-center justify-center font-caption text-caption font-semibold">
              승인 대기
            </div>
          </div>

          {/* Section 1: 노무 */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding shadow-sm">
            <h2 className="font-section-title text-section-title text-primary mb-3 font-semibold">
              노무
            </h2>
            <div className="bg-surface-container-low p-3 rounded-DEFAULT border border-outline-variant">
              <p className="font-body-sub text-[15px] text-on-surface">
                출역 8명 · 총 근무 64시간 · 노무비 1,840,000원
              </p>
            </div>
          </section>

          {/* Section 2: 자재 */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding shadow-sm">
            <h2 className="font-section-title text-section-title text-primary mb-3 font-semibold">
              자재
            </h2>
            <div className="bg-surface-container-low p-3 rounded-DEFAULT border border-outline-variant">
              <p className="font-body-sub text-[15px] text-on-surface">
                입고 3건 · 공급가액 2,064,000원 · 부가세 206,400원
              </p>
            </div>
          </section>

          {/* Section 3: 금일 작업내용 */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding shadow-sm">
            <h2 className="font-section-title text-section-title text-primary mb-3 font-semibold">
              금일 작업내용
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-container-low p-3 rounded-DEFAULT border border-outline-variant">
                <p className="font-caption text-secondary mb-1">공종</p>
                <p className="font-body-main text-on-surface font-medium">소방배관</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-DEFAULT border border-outline-variant">
                <p className="font-caption text-secondary mb-1">위치</p>
                <p className="font-body-main text-on-surface font-medium">1층 주차장</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-DEFAULT border border-outline-variant">
                <p className="font-caption text-secondary mb-1">수량</p>
                <p className="font-body-main text-on-surface font-medium">45</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-DEFAULT border border-outline-variant">
                <p className="font-caption text-secondary mb-1">단위</p>
                <p className="font-body-main text-on-surface font-medium">m</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-3 rounded-DEFAULT border border-outline-variant">
              <p className="font-caption text-secondary mb-1">비고</p>
              <p className="font-body-main text-on-surface">
                메인 배관 설치 완료 및 수압 테스트 준비
              </p>
            </div>
          </section>

          {/* Section 4: 현장 사진 */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding shadow-sm overflow-hidden">
            <h2 className="font-section-title text-section-title text-primary mb-3 font-semibold">
              현장 사진
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex-shrink-0 w-[140px]">
                <div className="h-[140px] rounded-DEFAULT border border-outline-variant overflow-hidden mb-2 bg-surface-container-low flex items-center justify-center relative">
                  <Image
                    alt="작업 전 사진"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh5RWyoFJr5xC0T6Ekd8Fn9JxfUflZssVyT3eH-ImDvA5EsmBOuan-Ttbfrh5N9v09blSrxPJVI_hmkjkqG7wdIOy6jQK79dO69A89vrAcpWOrX-yBEppoNoEcspmbQ_9eTgjNurBHNFct6Qz0bqeUWGCDpvrRv4iT8N7OXv_J4ZGXDuSAeieJ1m2r7Uw-IVoIgcilDpM5wf_BC0pkXnFSWPHdAXtw2gERp6O1S2yWZrwIqAUesXXh"
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-caption text-center text-secondary">작업 전</p>
              </div>
              <div className="flex-shrink-0 w-[140px]">
                <div className="h-[140px] rounded-DEFAULT border border-outline-variant overflow-hidden mb-2 bg-surface-container-low flex items-center justify-center relative">
                  <Image
                    alt="작업 중 사진"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZF4EleZm6v0AtsLfxIIJ_T6G5etlKL-befxJuY7Gy0idHHYtgEDER435C0iaGoAoA-WzZIbimUdxEKIr_dd1EaAkhJbVYykoywW_4b8RLqTAeOdzlcvLui6-V21GMtAv_tJAg7WCsZddSdqPLSrpfrxTNYCVjr3OfTtuVyTDF1ffgGEXQPsDnG3yc6734_UfTq4OFacVuzK7n_01jV67GDLwRLT-cRUsmxYJWepHxtbipUVGHPCGn"
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-caption text-center text-secondary">작업 중</p>
              </div>
              <div className="flex-shrink-0 w-[140px]">
                <div className="h-[140px] rounded-DEFAULT border border-outline-variant overflow-hidden mb-2 bg-surface-container-low flex items-center justify-center relative">
                  <Image
                    alt="작업 완료 사진"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgNkI5apy-PraTke-1tH3imHlbXZwWQSyb3_5x1Oxbt6UK5muoaFXJZ2D1Ti5hbp_P-RrNF1RkHQ20FSLpTtoA0tZMFD_1L1o-Zh7JFbfYubU-YLwe0t7GNf4FlL0V_PR935ya276MZc-JcPgYW795RWQIgQ2WcTmwxibH5xt3QD5-rWVcncQBhulH6nJdQntkZ3W0K36hzLLtjN-u2RGDkbNbUim9ecZPJg_NGbB0ojyru0RUnYMb"
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-caption text-center text-secondary">작업 완료</p>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Fixed Action Button */}
        <div className="fixed bottom-0 w-full max-w-[390px] p-screen-margin bg-surface bg-opacity-95 backdrop-blur-sm border-t border-outline-variant z-50">
          <button
            type="button"
            onClick={handleApprove}
            className="w-full h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded-DEFAULT shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer"
          >
            승인하고 PDF 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
