'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

export default function MaterialInspectPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';
  const router = useRouter();

  const [quantity, setQuantity] = useState(500);

  const handleComplete = () => {
    router.push(`/sites/${id}/material`);
  };

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen">
      <div className="bg-[#F5F6F8] text-on-surface antialiased min-h-screen flex flex-col max-w-[390px] w-full relative pb-[84px] shadow-lg shadow-outline-variant/20 font-body-main">
        {/* TopAppBar */}
        <header className="bg-surface border-b border-outline-variant fixed top-0 w-full max-w-[390px] mx-auto h-[56px] flex items-center justify-between px-screen-margin z-50">
          <div className="flex items-center">
            <Link
              href={`/sites/${id}/material/confirm`}
              aria-label="뒤로가기"
              className="text-on-surface-variant hover:bg-surface-container p-2 -ml-2 rounded-full active:opacity-70 flex items-center justify-center mr-2 cursor-pointer"
            >
              <span className="material-symbols-outlined" data-icon="arrow_back">
                arrow_back
              </span>
            </Link>
            <h1 className="font-headline-display text-[20px] font-bold text-primary tracking-tight">
              자재 입고 검수
            </h1>
          </div>
          <Link
            href={`/sites/${id}`}
            aria-label="닫기"
            className="text-on-surface-variant hover:bg-surface-container p-2 -mr-2 rounded-full active:opacity-70 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </Link>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-grow pt-[56px] px-screen-margin flex flex-col gap-section-gap py-6">
          {/* Section 1: Basic Info */}
          <section className="flex flex-col gap-3">
            <h2 className="font-section-title text-section-title text-primary">기본 정보</h2>
            <div className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-3 shadow-sm">
              <div className="flex justify-between items-center border-b border-surface-variant pb-2">
                <span className="font-body-sub text-body-sub text-on-surface-variant">입고 일시</span>
                <span className="font-body-main text-body-main font-semibold text-on-surface">
                  2026-08-28 10:45
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-sub text-body-sub text-on-surface-variant">운반 차량</span>
                <span className="font-body-main text-body-main font-semibold text-on-surface">
                  12가 3456
                </span>
              </div>
            </div>
          </section>

          {/* Section 2: Material Details Card */}
          <section className="flex flex-col gap-3">
            <h2 className="font-section-title text-section-title text-primary">자재 상세 내역</h2>
            <div className="bg-white border border-[#E3E6EA] rounded-lg p-card-padding flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="font-body-sub text-body-sub text-on-surface-variant">품목명</span>
                <div className="h-[56px] bg-surface-container-lowest border border-outline rounded flex items-center px-4">
                  <span className="font-body-main text-body-main font-semibold text-on-surface">
                    스프링클러 헤드 15A
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-body-sub text-body-sub text-on-surface-variant">규격</span>
                <div className="h-[56px] bg-surface-container-lowest border border-outline rounded flex items-center px-4">
                  <span className="font-body-main text-body-main text-on-surface">
                    15A / 하향식
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label className="font-body-sub text-body-sub text-on-surface-variant">
                  검수 수량
                </label>
                <div className="flex items-center gap-3">
                  <button
                    className="w-[56px] h-[56px] border border-outline bg-surface rounded-lg flex items-center justify-center text-primary active:bg-surface-variant transition-colors cursor-pointer"
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(0, prev - 10))}
                  >
                    <span className="material-symbols-outlined text-2xl">remove</span>
                  </button>
                  <input
                    aria-label="Quantity input"
                    className="flex-grow h-[56px] border-2 border-primary rounded-lg text-center font-number-highlight text-number-highlight text-on-surface focus:ring-0 focus:outline-none"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                  />
                  <button
                    className="w-[56px] h-[56px] border border-outline bg-surface rounded-lg flex items-center justify-center text-primary active:bg-surface-variant transition-colors cursor-pointer"
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 10)}
                  >
                    <span className="material-symbols-outlined text-2xl">add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Photo Upload */}
          <section className="flex flex-col gap-3">
            <h2 className="font-section-title text-section-title text-primary">검수 사진 및 증빙</h2>
            <div className="grid grid-cols-2 gap-card-gap">
              {/* Camera Button */}
              <button
                type="button"
                className="bg-white border-2 border-dashed border-outline-variant rounded-lg h-[120px] flex flex-col items-center justify-center gap-2 active:bg-surface-variant transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[32px] text-primary group-hover:scale-110 transition-transform">
                  photo_camera
                </span>
                <span className="font-body-sub text-body-sub text-on-surface-variant font-semibold">
                  검수 사진 촬영
                </span>
              </button>
              {/* Thumbnail Placeholder */}
              <div className="relative bg-white border border-[#E3E6EA] rounded-lg h-[120px] overflow-hidden group">
                <Image
                  alt="명세서 사진"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPv6XivhzOFZaiCYjOR7Pq85pKIwM8YsRtLbw4tGEqJV3zf0JrIPIYgw57XCvCwG7dgLcK_Fc_BGVHoG5CTq4Ju6Kpn_mmRkCPyeViSo2FHYOaPBPbv0Taf4kNT9J81Pc2hkXEJY4NogI0LLxJJ2eDByx4fj_FlEWX9aRggzk7IDBaN_x2h3FRDoonkXlYP1wFZnkwGrsfM-ggx0cS8edV59I_sok7uoGmTl5faXcbyFH--FSrPgxx"
                  width={160}
                  height={120}
                  unoptimized
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                </div>
                <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs text-center py-1 font-body-sub truncate px-2">
                  명세서_01.jpg
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Fixed Action Button */}
        <div className="fixed bottom-0 w-full max-w-[390px] p-screen-margin pb-6 bg-gradient-to-t from-[#F5F6F8] via-[#F5F6F8] to-transparent z-40 pt-6">
          <button
            type="button"
            onClick={handleComplete}
            className="w-full h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded-lg flex items-center justify-center shadow-md active:scale-[0.98] transition-transform cursor-pointer"
          >
            검수 완료
          </button>
        </div>
      </div>
    </div>
  );
}
