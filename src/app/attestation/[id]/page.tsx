'use client';

import {useParams, useRouter} from 'next/navigation';

export default function AttestationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  return (
    <div className="app-container">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full max-w-[390px] h-[64px] bg-surface flex items-center justify-between px-[20px] border-b border-outline-variant z-50">
        <div className="flex items-center gap-2">
          <button
            aria-label="Go back"
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
              검수검측서
            </span>
            <span className="font-caption text-caption text-secondary">v1</span>
          </div>
          <div className="font-section-title text-section-title text-on-surface leading-[26px]">
            3층 소화배관 수압시험 검측서
          </div>
          <div className="font-caption text-caption text-secondary">동래 A현장 · 2026-08-29</div>
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
              문서 해시 a3f19c7e2b8d4051 · 08-29 16:05 고정
            </p>
          </div>
        </section>

        {/* ③ 서명 대상 내용 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">서명 대상 내용</h2>
          <div className="card-level-1 p-0 overflow-hidden">
            <table className="w-full text-left border-collapse font-body-sub text-body-sub">
              <tbody className="text-on-surface">
                <tr className="border-b border-outline-variant">
                  <td className="py-3 px-4 text-secondary w-[36%]">시험 구간</td>
                  <td className="py-3 px-4 text-right">3층 스프링클러 주배관</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="py-3 px-4 text-secondary">시험 압력</td>
                  <td className="py-3 px-4 text-right">12.0 kgf/cm²</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="py-3 px-4 text-secondary">유지 시간</td>
                  <td className="py-3 px-4 text-right">60분</td>
                </tr>
                <tr className="border-b border-outline-variant">
                  <td className="py-3 px-4 text-secondary">압력 강하</td>
                  <td className="py-3 px-4 text-right">0.0 kgf/cm²</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-secondary">판정</td>
                  <td className="py-3 px-4 text-right font-semibold text-success">합격</td>
                </tr>
              </tbody>
            </table>
            <div className="border-t border-outline-variant p-4 bg-surface-container-lowest flex items-center justify-between">
              <span className="font-body-sub text-body-sub text-secondary">첨부 사진 4장</span>
              <button className="font-caption text-caption text-primary border border-primary px-3 py-1 rounded">
                전체 보기
              </button>
            </div>
          </div>
        </section>

        {/* ④ 서명 순서 */}
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-section-title text-section-title text-on-surface">서명 순서</h2>
          <div className="card-level-1 p-0 flex flex-col">
            <div className="p-4 border-b border-outline-variant flex items-start gap-3">
              <span
                className="material-symbols-outlined text-success shrink-0 mt-[2px]"
                style={{fontVariationSettings: "'FILL' 1"}}
              >
                check_circle
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-body-main text-body-main text-on-surface">① 시공 팀장</div>
                <div className="font-caption text-caption text-secondary mt-1">김O수 · ㈜비유피 소방팀</div>
              </div>
              <div className="shrink-0 font-caption text-caption text-secondary text-right">
                08-29
                <br />
                14:20
              </div>
            </div>

            <div className="p-4 border-b border-outline-variant flex items-start gap-3">
              <span
                className="material-symbols-outlined text-success shrink-0 mt-[2px]"
                style={{fontVariationSettings: "'FILL' 1"}}
              >
                check_circle
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-body-main text-body-main text-on-surface">② 현장 관리자</div>
                <div className="font-caption text-caption text-secondary mt-1">윤O태 · ㈜비유피</div>
              </div>
              <div className="shrink-0 font-caption text-caption text-secondary text-right">
                08-29
                <br />
                16:05
              </div>
            </div>

            <div className="p-4 border-b border-outline-variant bg-secondary-container flex items-start gap-3">
              <span
                className="material-symbols-outlined text-warning shrink-0 mt-[2px]"
                style={{fontVariationSettings: "'FILL' 1"}}
              >
                radio_button_checked
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-body-main text-body-main font-semibold text-on-surface">
                  ③ 상위공종 담당자
                </div>
                <div className="font-caption text-caption text-on-secondary-container mt-1">
                  최O석 · 대성종합건설 기계팀
                </div>
              </div>
              <div className="shrink-0 font-caption text-caption text-warning font-bold">내 차례</div>
            </div>

            <div className="p-4 flex items-start gap-3">
              <span
                className="material-symbols-outlined text-outline shrink-0 mt-[2px]"
                style={{fontVariationSettings: "'FILL' 0"}}
              >
                radio_button_unchecked
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-body-main text-body-main text-secondary">④ 감리</div>
                <div className="font-caption text-caption text-secondary mt-1">한O중 · 동남감리단</div>
                <div className="font-caption text-caption text-secondary mt-[2px]">
                  계정 없이 링크로 서명
                </div>
              </div>
              <div className="shrink-0 font-caption text-caption text-secondary text-right">대기</div>
            </div>
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
