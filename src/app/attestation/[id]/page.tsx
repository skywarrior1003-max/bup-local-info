'use client';

import {useParams, useRouter} from 'next/navigation';
import {getAttestationDoc, type SignState} from '../documents';

const ICON: Record<SignState, {name: string; className: string; fill: string}> = {
  done: {name: 'check_circle', className: 'text-success', fill: "'FILL' 1"},
  current: {name: 'radio_button_checked', className: 'text-warning', fill: "'FILL' 1"},
  waiting: {name: 'radio_button_unchecked', className: 'text-outline', fill: "'FILL' 0"},
};

export default function AttestationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const doc = getAttestationDoc(id);

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
          <h1 className="font-headline-display text-headline-display text-primary">검측서 확인</h1>
        </div>
      </header>

      {/* Main */}
      <main className="pt-[64px] pb-[96px] px-screen-margin flex flex-col gap-section-gap mt-[20px]">
        {/* ① 문서 머리 */}
        <section className="card-level-1 p-card-padding flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-secondary-container text-on-secondary-fixed font-caption text-caption font-semibold px-2 py-[3px] rounded">
              {doc.kind}
            </span>
            <span className="font-caption text-caption text-secondary">v1</span>
          </div>
          <div className="font-section-title text-section-title text-on-surface leading-[26px]">
            {doc.title}
          </div>
          <div className="font-caption text-caption text-secondary">{doc.site}</div>
        </section>

        {/* ② 내용 고정 안내 */}
        <section className="bg-secondary-container p-3 rounded flex items-start gap-2">
          <span
            className="material-symbols-outlined shrink-0 text-primary text-[20px]"
            style={{fontVariationSettings: "'FILL' 1"}}
          >
            lock
          </span>
          <div className="min-w-0">
            <p className="font-body-sub text-body-sub font-semibold text-on-secondary-fixed">
              회람 시작 시각에 내용이 고정되었습니다
            </p>
            <p className="font-caption text-caption text-on-secondary-container mt-[2px] break-all">
              {doc.hashNotice}
            </p>
          </div>
        </section>

        {/* ③ 서명 대상 내용 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">서명 대상 내용</h2>
          <div className="card-level-1 p-0 overflow-hidden">
            <table className="w-full text-left border-collapse font-body-sub text-body-sub">
              <tbody className="text-on-surface">
                {doc.rows.map(([label, value], i) => (
                  <tr key={label} className="border-b border-outline-variant">
                    <td className={`py-3 px-4 text-secondary${i === 0 ? ' w-[36%]' : ''}`}>{label}</td>
                    <td className="py-3 px-4 text-right">{value}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 px-4 text-secondary">{doc.verdict[0]}</td>
                  <td className="py-3 px-4 text-right font-semibold text-success">{doc.verdict[1]}</td>
                </tr>
              </tbody>
            </table>
            {doc.attachment && (
              <div className="border-t border-outline-variant p-4 bg-surface-container-lowest flex items-center justify-between">
                <span className="font-body-sub text-body-sub text-secondary">{doc.attachment}</span>
                <button className="font-caption text-caption text-primary border border-primary px-3 py-1 rounded">
                  전체 보기
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ④ 서명 순서 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">서명 순서</h2>
          {doc.parallelNote && (
            <p className="font-caption text-caption text-secondary -mt-1">{doc.parallelNote}</p>
          )}
          <div className="card-level-1 p-0 flex flex-col">
            {doc.signers.map((s, i) => {
              const icon = ICON[s.state];
              const last = i === doc.signers.length - 1;
              return (
                <div
                  key={s.order}
                  className={`p-4 flex items-start gap-3${last ? '' : ' border-b border-outline-variant'}${
                    s.state === 'current' ? ' bg-secondary-container' : ''
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${icon.className} shrink-0 mt-[2px]`}
                    style={{fontVariationSettings: icon.fill}}
                  >
                    {icon.name}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-body-main text-body-main ${
                        s.state === 'current'
                          ? 'font-semibold text-on-surface'
                          : s.state === 'waiting'
                            ? 'text-secondary'
                            : 'text-on-surface'
                      }`}
                    >
                      {s.order} {s.role}
                    </div>
                    <div
                      className={`font-caption text-caption mt-1 ${
                        s.state === 'current' ? 'text-on-secondary-container' : 'text-secondary'
                      }`}
                    >
                      {s.person}
                    </div>
                    {s.note && (
                      <div className="font-caption text-caption text-secondary mt-[2px]">{s.note}</div>
                    )}
                  </div>
                  {s.state === 'done' && (
                    <div className="shrink-0 font-caption text-caption text-secondary text-right">
                      {s.date}
                      <br />
                      {s.time}
                    </div>
                  )}
                  {s.state === 'current' && (
                    <div className="shrink-0 font-caption text-caption text-warning font-bold">내 차례</div>
                  )}
                  {s.state === 'waiting' && (
                    <div className="shrink-0 font-caption text-caption text-secondary text-right">대기</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ⑤ 서명 입력 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">서명</h2>
          <div className="flex items-stretch gap-2">
            <button className="flex-1 h-[40px] rounded border border-primary bg-primary text-on-primary font-body-sub text-body-sub font-semibold">
              화면 필기
            </button>
            <button className="flex-1 h-[40px] rounded border border-outline-variant bg-surface text-secondary font-body-sub text-body-sub">
              이름 입력
            </button>
          </div>
          <div
            className="h-[140px] flex items-center justify-center bg-surface-container-lowest rounded"
            style={{border: '2px dashed #C4C6CF'}}
          >
            <span className="font-body-sub text-body-sub text-secondary">
              이 안에 손가락으로 서명하세요
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary">
              서명 시각 · 접속 정보 · 위치가 함께 기록됩니다
            </span>
            <button className="font-caption text-caption text-primary underline underline-offset-2">
              지우기
            </button>
          </div>
        </section>
      </main>

      {/* 하단 고정 2버튼 */}
      <div className="fixed bottom-0 w-full max-w-[390px] h-[64px] z-50 flex items-stretch">
        <button className="w-[35%] h-full bg-error-container text-on-error-container font-button-text text-button-text">
          반려
        </button>
        <button
          onClick={() => router.push(`/attestation/${id}/complete`)}
          className="flex-1 h-full bg-primary text-on-primary font-button-text text-button-text active:opacity-90"
        >
          서명하기
        </button>
      </div>
    </div>
  );
}
