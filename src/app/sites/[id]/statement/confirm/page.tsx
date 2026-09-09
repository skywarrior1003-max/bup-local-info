'use client';

import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {statement} from '../statement-data';

export default function StatementConfirmPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';
  const router = useRouter();

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen">
      <div className="bg-[#F5F6F8] text-on-surface antialiased min-h-screen flex flex-col max-w-[390px] w-full relative pb-[104px] shadow-lg shadow-outline-variant/20 font-body-main">
        {/* TopAppBar */}
        <header className="bg-surface border-b border-outline-variant fixed top-0 w-full max-w-[390px] mx-auto h-[56px] flex items-center justify-between px-screen-margin z-50">
          <div className="flex items-center">
            <Link
              href={`/sites/${id}/statement/verify`}
              aria-label="뒤로가기"
              className="text-on-surface-variant hover:bg-surface-container p-2 -ml-2 rounded-full active:opacity-70 flex items-center justify-center mr-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="font-headline-display text-[20px] font-bold text-primary tracking-tight">
              확정
            </h1>
          </div>
          <span className="font-caption text-caption text-secondary border border-outline-variant rounded px-2 py-1">
            {statement.confirmedBy}
          </span>
        </header>

        <main className="pt-[72px] px-screen-margin flex flex-col gap-card-gap">
          {/* 수정한 값 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding">
            <div className="font-caption text-caption text-secondary">수정한 값</div>
            <div className="flex items-center gap-2.5 mt-2 [font-variant-numeric:tabular-nums]">
              <span className="font-body-main text-body-main text-outline line-through">
                {statement.fix.from}
              </span>
              <span className="text-outline">→</span>
              <span className="font-section-title text-[18px] font-bold text-on-surface border-b-[2.5px] border-error pb-px">
                {statement.fix.to}
              </span>
            </div>
          </div>

          {/* 저장되는 라벨 */}
          <div className="bg-success/10 border border-success/40 rounded-lg p-card-padding">
            <div className="font-caption text-caption text-secondary">저장되는 라벨</div>
            <div className="font-body-sub text-[14px] font-bold text-on-surface mt-1 [font-variant-numeric:tabular-nums]">
              {statement.label}
            </div>
            <div className="mt-2">
              <span className="inline-block bg-success text-on-primary font-caption text-caption font-bold rounded px-2.5 py-1">
                {statement.labelTag}
              </span>
            </div>
          </div>

          {/* 합계 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5 [font-variant-numeric:tabular-nums]">
            {statement.totals.map(([label, value], i) => {
              const last = i === statement.totals.length - 1;
              return (
                <div
                  key={label}
                  className={`flex justify-between items-center gap-3 py-1.5 ${
                    last ? 'border-t border-outline-variant mt-1 pt-2.5' : ''
                  }`}
                >
                  <span className="font-caption text-caption text-on-surface-variant">{label}</span>
                  <span className="font-body-sub text-body-sub font-bold text-on-surface">{value}</span>
                </div>
              );
            })}
          </div>

          {/* 확정 전 안내 */}
          <div className="bg-warning/10 border border-tertiary-fixed-dim rounded-lg p-card-padding">
            <div className="font-caption text-caption text-on-tertiary-fixed-variant">
              {statement.hold.title}
            </div>
            <div className="font-body-sub text-[14px] font-bold text-on-tertiary-fixed-variant mt-1">
              {statement.hold.detail}
            </div>
          </div>

          <p className="font-caption text-caption text-secondary leading-relaxed">
            사람이 확정해야 원가 현황에 들어갑니다. AI 값은 단독으로 숫자가 되지 않습니다.
          </p>
        </main>

        {/* Bottom Fixed Action Button */}
        <div className="fixed bottom-0 w-full max-w-[390px] p-screen-margin pb-6 bg-gradient-to-t from-[#F5F6F8] via-[#F5F6F8] to-transparent z-40 pt-6">
          <button
            type="button"
            onClick={() => router.push(`/sites/${id}/material`)}
            className="w-full h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded-lg flex items-center justify-center shadow-md active:scale-[0.98] transition-transform cursor-pointer"
          >
            확정하고 자재원장에 반영
          </button>
        </div>
      </div>
    </div>
  );
}
