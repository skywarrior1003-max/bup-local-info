'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

export default function PhotoResultFailPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '3';
  const router = useRouter();

  const handleRetake = () => {
    router.push(`/sites/${id}/photo/after`);
  };

  return (
    <div className="w-full flex justify-center bg-surface-container-low min-h-screen text-on-surface">
      {/* Mobile Container */}
      <div className="w-full max-w-[390px] bg-surface min-h-screen relative shadow-lg overflow-x-hidden flex flex-col pb-[160px] font-body-main">
        {/* Top App Bar */}
        <header className="fixed top-0 w-full max-w-[390px] h-[64px] bg-surface flex items-center px-screen-margin border-b border-outline-variant z-40">
          <Link
            href={`/sites/${id}/photo/after`}
            aria-label="뒤로 가기"
            className="w-10 h-10 flex items-center justify-start text-primary active:scale-95 transition-transform duration-100 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
          </Link>
          <h1 className="flex-1 font-headline-display text-headline-display text-primary text-center mr-10 tracking-tight font-bold">
            촬영 결과 확인
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-screen-margin pt-[calc(64px+28px)]">
          <div className="flex flex-col gap-6">
            {/* Status Message */}
            <div className="flex flex-col items-center justify-center py-4">
              <span
                className="material-symbols-outlined text-on-tertiary-container text-[40px] mb-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                error
              </span>
              <h2 className="font-section-title text-section-title text-on-surface text-center font-semibold">
                사진 품질이 기준에 미달합니다.
              </h2>
              <p className="font-body-sub text-body-sub text-on-surface-variant text-center mt-1">
                흔들림 또는 초점 불량이 감지되었습니다.
              </p>
            </div>

            {/* Photo Comparison Grid */}
            <div className="grid grid-cols-2 gap-card-gap">
              {/* Before Photo */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-body-sub text-body-sub text-secondary font-semibold">
                    작업 전
                  </span>
                  <span className="font-caption text-caption text-outline px-2 py-0.5 bg-surface-container-high rounded-sm">
                    승인됨
                  </span>
                </div>
                <div className="aspect-[3/4] bg-surface-container-lowest border border-outline-variant rounded relative overflow-hidden shadow-sm">
                  <Image
                    alt="작업 전 선명한 기초 사진"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFrGwa_e7Iq0DbG1_25S7NN1ARszJZMtjtr5cPyq4eQ0WyEpPT5ljfDwuZkW8ovuz6_2I1Y0b7HnL5cQLga_6YRAvezaHKpi_AB4d9uxCOKa6a2HK9Gv9ENh20u8lXrFQaaXA3nDV0c1xESzreLjO5_V3QNwdemqIRz4S3K-vqn-oIwEknNsZWAU8agrwC4fhkOFi0oBjKDEDqI3l7_pcMiW-_cYw035emSvjAnGbS_aEc2qzrPqmP"
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* After Photo (Needs Retake) */}
              <div className="flex flex-col gap-2 relative">
                <div className="flex justify-between items-center">
                  <span className="font-body-sub text-body-sub text-on-tertiary-container font-semibold">
                    작업 후
                  </span>
                  {/* Status Badge: Retake Needed */}
                  <div className="h-[28px] px-2.5 inline-flex items-center justify-center border-2 border-on-tertiary-container bg-surface-container-lowest rounded-full">
                    <span className="font-caption text-caption text-on-tertiary-container font-bold">
                      다시 촬영 필요
                    </span>
                  </div>
                </div>
                {/* Photo with Warning Border */}
                <div className="aspect-[3/4] bg-surface-container-lowest border-4 border-on-tertiary-container rounded relative overflow-hidden shadow-sm">
                  <Image
                    alt="초점이 맞지 않은 흐릿한 작업 후 사진"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfDy87ZMCnAuqJKpMbvY2lYIJ-zAYFeAHtRl2Lq-PwiuHquQQQ7oDddiq0V2lgJ0gKnoleO7YhCNlsPuXF59ZZ8XkMNlYef1QCGyDoMzqChfn80Thc7EdIDm95Qc3wtIOLQsJ6k98XLXYEJbyazTPt-kIgEFwgN1VlWCY4b33RwtX7w_VTmtjb82I0xhk-4o_IV_7bOsdyfMhsddorvocT9QTHVEfBZRLb4xGEb37QYz0wBYqMWcjD"
                    fill
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Feedback Details Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-card-padding mt-2 shadow-sm">
              <h3 className="font-body-main text-body-main font-semibold text-on-surface mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  info
                </span>
                재촬영 가이드
              </h3>
              <ul className="list-disc pl-5 font-body-sub text-body-sub text-on-surface-variant space-y-1">
                <li>피사체에 정확히 초점을 맞춰주세요.</li>
                <li>카메라 렌즈의 이물질을 닦아주세요.</li>
                <li>그림자가 지지 않도록 밝은 곳에서 촬영하세요.</li>
              </ul>
            </div>
          </div>
        </main>

        {/* Bottom Fixed Action Area */}
        <div className="fixed bottom-0 w-full max-w-[390px] bg-surface border-t border-outline-variant px-screen-margin pt-4 pb-8 flex flex-col gap-3 z-50">
          {/* Retake Button */}
          <button
            type="button"
            onClick={handleRetake}
            className="w-full h-[56px] flex items-center justify-center border border-outline text-on-surface font-button-text text-button-text rounded active:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined mr-2">photo_camera</span>
            다시 찍기
          </button>
          {/* Save Button (Disabled) */}
          <button
            type="button"
            disabled
            className="w-full h-[64px] flex items-center justify-center bg-surface-dim text-on-surface-variant font-button-text text-button-text rounded cursor-not-allowed opacity-80"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
