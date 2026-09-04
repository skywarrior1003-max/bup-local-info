'use client';

import {useParams, useRouter} from 'next/navigation';
import {getAttestationDoc} from '../../documents';

export default function AttestationCompletePage() {
  const params = useParams();
  const router = useRouter();
  const doc = getAttestationDoc(params.id as string);

  return (
    <div className="app-container">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] h-[64px] bg-surface flex items-center justify-between px-[20px] border-b border-outline-variant z-50">
        <div className="flex items-center gap-2">
          <button
            aria-label="Go back"
            onClick={() => router.back()}
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
            <p className="font-body-sub text-body-sub mt-1">{doc.completeSummary}</p>
          </div>
        </section>

        {/* ② 문서 */}
        <section className="card-level-1 p-card-padding flex flex-col gap-1">
          <div className="font-section-title text-section-title text-on-surface leading-[26px]">
            {doc.title}
          </div>
          <div className="font-caption text-caption text-secondary mt-1">{doc.completedAt}</div>
          <div className="border-t border-outline-variant mt-3 pt-3">
            <div className="font-caption text-caption text-secondary">최종 체인 해시</div>
            <div className="font-caption text-caption text-on-surface break-all mt-[2px]">
              {doc.finalHash}
            </div>
          </div>
        </section>

        {/* ③ 서명 이력 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">서명 이력</h2>
          <div className="card-level-1 p-0 flex flex-col">
            {doc.history.map((h, i) => (
              <div
                key={h.order}
                className={`p-4${i === doc.history.length - 1 ? '' : ' border-b border-outline-variant'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-body-main text-body-main text-on-surface">
                      {h.order} {h.role}
                    </div>
                    <div className="font-caption text-caption text-secondary mt-1">{h.person}</div>
                  </div>
                  <div className="shrink-0 font-caption text-caption text-secondary text-right">
                    {h.at}
                  </div>
                </div>
                <div className="font-caption text-caption text-secondary mt-2 break-all">{h.how}</div>
              </div>
            ))}
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
              {doc.nextStage.title}
            </p>
            <p className="font-caption text-caption text-on-secondary-container mt-[2px]">
              {doc.nextStage.detail}
            </p>
          </div>
        </section>

        {/* ⑤ 회람 이력 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">회람 이력</h2>
          <div className="card-level-1 p-4 flex flex-col gap-2 font-caption text-caption text-secondary">
            {doc.circulation.map(([what, at]) => (
              <div key={what} className="flex justify-between gap-3">
                <span>{what}</span>
                <span className="shrink-0">{at}</span>
              </div>
            ))}
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
