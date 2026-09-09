'use client';

import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {statement} from '../statement-data';

export default function StatementVerifyPage() {
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
              href={`/sites/${id}/statement`}
              aria-label="뒤로가기"
              className="text-on-surface-variant hover:bg-surface-container p-2 -ml-2 rounded-full active:opacity-70 flex items-center justify-center mr-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="font-headline-display text-[20px] font-bold text-primary tracking-tight">
              검증 결과
            </h1>
          </div>
          <span className="font-caption text-caption text-secondary border border-outline-variant rounded px-2 py-1">
            {statement.pending}
          </span>
        </header>

        <main className="pt-[72px] px-screen-margin flex flex-col gap-card-gap">
          {/* 경고 배너 */}
          <div className="bg-error text-on-error rounded-lg px-3.5 py-3 flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-[20px] shrink-0 mt-[1px]"
              style={{fontVariationSettings: "'FILL' 1"}}
            >
              error
            </span>
            <div className="min-w-0">
              <p className="font-body-sub text-body-sub font-bold leading-snug">
                {statement.alert.title}
              </p>
              <p className="font-caption text-caption opacity-90 mt-0.5">{statement.alert.detail}</p>
            </div>
          </div>

          {/* 등식 검증 결과 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3.5 py-2.5">
            {statement.checks.map((c) => (
              <div key={c.label} className="flex justify-between items-center gap-3 py-1.5">
                <span className="font-caption text-caption text-on-surface-variant">{c.label}</span>
                <span
                  className={`font-caption text-caption font-bold shrink-0 ${
                    c.matched ? 'text-success' : 'text-error'
                  }`}
                >
                  {c.result}
                </span>
              </div>
            ))}
          </div>

          {/* 문제가 된 행 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-x-auto">
            <table className="w-full border-collapse font-body-sub text-[13px]">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left font-medium text-secondary px-3 py-2.5">품목</th>
                  <th className="text-right font-medium text-secondary px-3 py-2.5">수량</th>
                  <th className="text-right font-medium text-secondary px-3 py-2.5">단가</th>
                  <th className="text-right font-medium text-secondary px-3 py-2.5">공급가액</th>
                </tr>
              </thead>
              <tbody className="[font-variant-numeric:tabular-nums]">
                <tr className="bg-warning/10">
                  <td className="text-left px-3 py-2.5 font-bold text-error">{statement.badRow.item}</td>
                  <td className="text-right px-3 py-2.5 font-bold text-error">{statement.badRow.qty}</td>
                  <td className="text-right px-3 py-2.5 font-bold text-error">{statement.badRow.unit}</td>
                  <td className="text-right px-3 py-2.5 font-bold text-error">
                    {statement.badRow.amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 등식으로 다시 계산한 값 */}
          <div className="bg-warning/10 border border-tertiary-fixed-dim rounded-lg p-card-padding">
            <div className="font-caption text-caption text-secondary">등식으로 계산하면</div>
            <div className="font-section-title text-[16px] font-bold text-on-surface mt-1 [font-variant-numeric:tabular-nums]">
              {statement.recalc.formula} <span className="text-error">{statement.recalc.value}</span>
            </div>
          </div>

          <p className="font-caption text-caption text-secondary leading-relaxed">
            정답 데이터 없이 거래명세서 자체의 등식만으로 오류를 찾아냅니다.
          </p>
        </main>

        {/* Bottom Fixed Action Buttons */}
        <div className="fixed bottom-0 w-full max-w-[390px] p-screen-margin pb-6 bg-gradient-to-t from-[#F5F6F8] via-[#F5F6F8] to-transparent z-40 pt-6 flex gap-2.5">
          <Link
            href={`/sites/${id}/statement`}
            className="flex-1 h-[64px] bg-surface border border-outline-variant text-on-surface-variant font-button-text text-button-text rounded-lg flex items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
          >
            사진 다시 보기
          </Link>
          <button
            type="button"
            onClick={() => router.push(`/sites/${id}/statement/confirm`)}
            className="flex-1 h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded-lg flex items-center justify-center shadow-md active:scale-[0.98] transition-transform cursor-pointer"
          >
            {statement.recalc.value}으로 수정
          </button>
        </div>
      </div>
    </div>
  );
}
