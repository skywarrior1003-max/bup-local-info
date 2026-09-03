'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CostStatusPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen text-on-surface">
      <div className="w-full max-w-[390px] min-h-screen bg-[#F5F6F8] relative pb-[84px] shadow-lg shadow-outline-variant/20 font-body-main">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[390px] h-[64px] bg-surface flex items-center justify-between px-[20px] border-b border-outline-variant z-50">
          <div className="flex items-center gap-2">
            <Link
              href={`/sites/${id}`}
              aria-label="뒤로가기"
              className="text-primary active:scale-95 transition-transform duration-100 flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </Link>
            <h1 className="font-headline-display text-headline-display text-primary font-bold tracking-tight">
              원가 현황
            </h1>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-on-surface-variant text-body-sub font-semibold py-1.5 px-3 border border-outline-variant rounded bg-surface active:bg-surface-container cursor-pointer"
          >
            2026년 8월
            <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="pt-[64px] pb-[80px] px-screen-margin flex flex-col gap-section-gap mt-[20px]">
          {/* ① 큰 숫자 카드 */}
          <section className="bg-white border border-[#E3E6EA] rounded p-card-padding flex flex-col gap-1 shadow-sm">
            <div className="text-secondary font-body-sub text-body-sub mb-2">동래 A현장</div>
            <div className="text-secondary font-caption text-caption">누적 지출</div>
            <div className="font-number-highlight text-number-highlight text-primary">
              90,430,000원
            </div>
            <div className="text-secondary font-body-sub text-body-sub mt-1">
              계약금액 200,000,000원의 45.2%
            </div>
          </section>

          {/* ② 주황 알림 띠 */}
          <section className="bg-warning text-on-primary p-3 rounded flex items-start gap-2 shadow-sm">
            <span
              className="material-symbols-outlined shrink-0 text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
            <p className="font-body-sub text-body-sub font-semibold mt-[2px]">
              노무비가 공정률보다 6.5%p 앞섭니다
            </p>
          </section>

          {/* ③ "계약 대비" 섹션 */}
          <section className="flex flex-col gap-card-gap">
            <h2 className="font-section-title text-section-title text-on-surface font-semibold">
              계약 대비
            </h2>
            <div className="bg-white border border-[#E3E6EA] rounded p-0 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low text-secondary font-caption text-caption">
                    <th className="py-3 px-4 font-normal">구분</th>
                    <th className="py-3 px-4 text-right font-normal">계약</th>
                    <th className="py-3 px-4 text-right font-normal">투입</th>
                    <th className="py-3 px-4 text-right font-normal">소진율</th>
                  </tr>
                </thead>
                <tbody className="font-body-sub text-body-sub text-on-surface">
                  <tr className="border-b border-outline-variant">
                    <td className="py-3 px-4 font-medium">노무비</td>
                    <td className="py-3 px-4 text-right">80,000천원</td>
                    <td className="py-3 px-4 text-right">45,200천원</td>
                    <td className="py-3 px-4 text-right text-warning font-semibold">56.5%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">자재비</td>
                    <td className="py-3 px-4 text-right">120,000천원</td>
                    <td className="py-3 px-4 text-right">45,230천원</td>
                    <td className="py-3 px-4 text-right">37.7%</td>
                  </tr>
                </tbody>
              </table>
              <div className="border-t border-outline-variant p-4 flex items-center justify-between bg-surface-container-lowest">
                <span className="font-body-sub text-body-sub text-secondary font-medium">
                  공정률(입력) 50%
                </span>
                <button
                  type="button"
                  className="font-caption text-caption text-primary border border-primary px-3 py-1 rounded active:bg-surface-container transition-colors cursor-pointer"
                >
                  수정
                </button>
              </div>
            </div>
          </section>

          {/* ④ "이번 달" 섹션 */}
          <section className="flex flex-col gap-card-gap">
            <h2 className="font-section-title text-section-title text-on-surface font-semibold">
              이번 달
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E6EA] rounded p-4 flex flex-col gap-1 justify-between min-h-[100px] shadow-sm">
                <div className="text-secondary font-caption text-caption">자재비</div>
                <div className="font-bold text-[20px] leading-[28px] text-primary">12,340,000원</div>
                <div className="text-secondary font-caption text-caption mt-auto">명세서 16건</div>
              </div>
              <div className="bg-white border border-[#E3E6EA] rounded p-4 flex flex-col gap-1 justify-between min-h-[100px] shadow-sm">
                <div className="text-secondary font-caption text-caption">노무비</div>
                <div className="font-bold text-[20px] leading-[28px] text-primary">8,760,000원</div>
                <div className="text-secondary font-caption text-caption mt-auto">출역 74인</div>
              </div>
            </div>
          </section>

          {/* ⑤ "거래처별 (8월)" 섹션 */}
          <section className="flex flex-col gap-card-gap">
            <div className="flex items-center justify-between">
              <h2 className="font-section-title text-section-title text-on-surface font-semibold">
                거래처별 (8월)
              </h2>
              <button
                type="button"
                className="font-body-sub text-body-sub text-primary font-semibold underline underline-offset-2 cursor-pointer"
              >
                전체
              </button>
            </div>
            <div className="bg-white border border-[#E3E6EA] rounded p-0 flex flex-col shadow-sm">
              {/* Item 1 */}
              <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                <div>
                  <div className="font-body-main text-body-main text-on-surface font-medium">
                    (주)대한자재
                  </div>
                  <div className="font-caption text-caption text-secondary mt-1">명세서 8건</div>
                </div>
                <div className="font-body-main text-body-main font-semibold text-on-surface">
                  8,500,000원
                </div>
              </div>
              {/* Item 2 */}
              <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                <div>
                  <div className="font-body-main text-body-main text-on-surface font-medium">
                    남부파이프
                  </div>
                  <div className="font-caption text-caption text-secondary mt-1">명세서 5건</div>
                </div>
                <div className="font-body-main text-body-main font-semibold text-on-surface">
                  2,340,000원
                </div>
              </div>
              {/* Item 3 */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-body-main text-body-main text-on-surface font-medium">
                    우성상사
                  </div>
                  <div className="font-caption text-caption text-secondary mt-1">명세서 3건</div>
                </div>
                <div className="font-body-main text-body-main font-semibold text-on-surface">
                  1,500,000원
                </div>
              </div>
            </div>
          </section>

          {/* ⑥ "작업자별 (8월)" 섹션 */}
          <section className="flex flex-col gap-card-gap">
            <div className="flex items-center justify-between">
              <h2 className="font-section-title text-section-title text-on-surface font-semibold">
                작업자별 (8월)
              </h2>
              <button
                type="button"
                className="font-body-sub text-body-sub text-primary font-semibold underline underline-offset-2 cursor-pointer"
              >
                전체
              </button>
            </div>
            <div className="bg-white border border-[#E3E6EA] rounded p-0 flex flex-col shadow-sm">
              {/* Item 1 */}
              <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                <div>
                  <div className="font-body-main text-body-main text-on-surface font-medium">
                    김O수 (배관)
                  </div>
                  <div className="font-caption text-caption text-secondary mt-1">출역 22일</div>
                </div>
                <div className="font-body-main text-body-main font-semibold text-on-surface">
                  4,840,000원
                </div>
              </div>
              {/* Item 2 */}
              <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                <div>
                  <div className="font-body-main text-body-main text-on-surface font-medium">
                    박O민 (전공)
                  </div>
                  <div className="font-caption text-caption text-secondary mt-1">출역 20일</div>
                </div>
                <div className="font-body-main text-body-main font-semibold text-on-surface">
                  4,200,000원
                </div>
              </div>
              {/* Item 3 */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-body-main text-body-main text-on-surface font-medium">
                    이O호 (보통인부)
                  </div>
                  <div className="font-caption text-caption text-secondary mt-1">출역 18일</div>
                </div>
                <div className="font-body-main text-body-main font-semibold text-on-surface">
                  2,700,000원
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ⑦ 화면 하단 고정 버튼 */}
        <div className="fixed bottom-0 w-full max-w-[390px] h-[64px] z-50 bg-primary flex items-center justify-center active:bg-primary-fixed-variant transition-colors cursor-pointer border-t-0 shadow-none">
          <button
            type="button"
            className="w-full h-full font-button-text text-button-text text-on-primary cursor-pointer"
          >
            월별 정산서 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
