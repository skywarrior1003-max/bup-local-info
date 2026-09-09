'use client';

import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {statement} from './statement-data';

export default function StatementExtractPage() {
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
              href={`/sites/${id}`}
              aria-label="뒤로가기"
              className="text-on-surface-variant hover:bg-surface-container p-2 -ml-2 rounded-full active:opacity-70 flex items-center justify-center mr-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="font-headline-display text-[20px] font-bold text-primary tracking-tight">
              거래명세서
            </h1>
          </div>
          <span className="font-caption text-caption text-secondary border border-outline-variant rounded px-2 py-1">
            {statement.date}
          </span>
        </header>

        <main className="pt-[72px] px-screen-margin flex flex-col gap-card-gap">
          {/* 촬영된 사진 */}
          <div
            className="h-[112px] rounded-lg border border-outline-variant flex flex-col items-center justify-center gap-1"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg,#EEF1F5 0 9px,#F7F9FB 9px 18px)',
            }}
          >
            <span className="font-body-sub text-body-sub font-bold text-on-surface-variant">
              {statement.photo.name}
            </span>
            <span className="font-caption text-caption text-secondary">{statement.photo.note}</span>
          </div>

          {/* 거래처 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding">
            <div className="font-caption text-caption text-secondary">거래처</div>
            <div className="font-section-title text-[16px] font-bold text-on-surface mt-0.5">
              {statement.vendor}
            </div>
          </div>

          {/* 추출된 표 */}
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
                {statement.rows.map((r) => (
                  <tr key={r.item} className="border-b border-outline-variant/60">
                    <td className="text-left text-on-surface px-3 py-2.5">{r.item}</td>
                    <td className="text-right text-on-surface-variant px-3 py-2.5">{r.qty}</td>
                    <td className="text-right text-on-surface-variant px-3 py-2.5">{r.unit}</td>
                    <td className="text-right text-on-surface px-3 py-2.5">{r.amount}</td>
                  </tr>
                ))}
                {statement.totals.map(([label, value], i) => (
                  <tr
                    key={label}
                    className={i === statement.totals.length - 1 ? '' : 'border-b border-outline-variant/60'}
                  >
                    <td colSpan={3} className="text-left text-secondary px-3 py-2.5">
                      {label}
                    </td>
                    <td className="text-right text-on-surface font-semibold px-3 py-2.5">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 추출 완료 표시 */}
          <div>
            <span className="inline-block bg-primary text-on-primary font-caption text-caption font-bold rounded px-2.5 py-1">
              {statement.extractedTag}
            </span>
          </div>

          <p className="font-caption text-caption text-secondary leading-relaxed">
            멀티모달 LLM이 표 구조 인식과 필드 배정을 동시에 수행합니다.
          </p>
        </main>

        {/* Bottom Fixed Action Button */}
        <div className="fixed bottom-0 w-full max-w-[390px] p-screen-margin pb-6 bg-gradient-to-t from-[#F5F6F8] via-[#F5F6F8] to-transparent z-40 pt-6">
          <button
            type="button"
            onClick={() => router.push(`/sites/${id}/statement/verify`)}
            className="w-full h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded-lg flex items-center justify-center shadow-md active:scale-[0.98] transition-transform cursor-pointer"
          >
            검증 결과 보기
          </button>
        </div>
      </div>
    </div>
  );
}
