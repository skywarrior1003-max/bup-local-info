'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

interface MaterialItem {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  writtenAmount: number; // Recognition error original amount
  hasMismatch: boolean;
  statusText: string;
}

export default function MaterialConfirmPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';
  const router = useRouter();

  // State for items
  const [items, setItems] = useState<MaterialItem[]>([
    {
      id: '1',
      name: '스프링클러 헤드 15A',
      qty: 120,
      unitPrice: 3200,
      writtenAmount: 384000,
      hasMismatch: false,
      statusText: 'AI',
    },
    {
      id: '2',
      name: '강관 100A',
      qty: 40,
      unitPrice: 28500,
      writtenAmount: 1040000, // 40 * 28500 = 1,140,000인데 1,040,000으로 인식되어 mismatch
      hasMismatch: true,
      statusText: 'AI',
    },
    {
      id: '3',
      name: '밸브 50A',
      qty: 12,
      unitPrice: 45000,
      writtenAmount: 540000,
      hasMismatch: false,
      statusText: '확인',
    },
  ]);

  // Editing state for item 2 (or any item)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState<string>('40');
  const [editUnitPrice, setEditUnitPrice] = useState<string>('28500');

  const startEdit = (item: MaterialItem) => {
    setEditingId(item.id);
    setEditQty(item.qty.toString());
    setEditUnitPrice(item.unitPrice.toString());
  };

  const applyEdit = (itemId: string) => {
    const q = parseInt(editQty, 10) || 0;
    const p = parseInt(editUnitPrice, 10) || 0;
    const calc = q * p;

    setItems((prev) =>
      prev.map((it) => {
        if (it.id === itemId) {
          // If edited, recalculate and dismiss mismatch error if solved or matched
          const isFixed = it.hasMismatch ? true : it.hasMismatch;
          return {
            ...it,
            qty: q,
            unitPrice: p,
            writtenAmount: calc,
            hasMismatch: false, // calculation is now aligned
            statusText: '수정됨',
          };
        }
        return it;
      })
    );
    setEditingId(null);
  };

  // Calculations
  const totalSupply = items.reduce((acc, it) => acc + it.qty * it.unitPrice, 0);
  const totalVat = Math.round(totalSupply * 0.1);
  const grandTotal = totalSupply + totalVat;
  const mismatchCount = items.filter((it) => it.hasMismatch).length;

  const handleSave = () => {
    router.push(`/sites/${id}/material/inspect`);
  };

  return (
    <div className="w-full flex justify-center bg-[#F5F6F8] min-h-screen">
      <div className="w-full max-w-[390px] min-h-screen bg-[#F5F6F8] relative pb-[84px] text-on-surface font-body-main shadow-lg shadow-outline-variant/20">
        {/* TopAppBar */}
        <header className="bg-surface border-b border-outline-variant flex items-center justify-between px-screen-margin w-full h-[64px] sticky top-0 z-10">
          <Link
            href={`/sites/${id}/material/capture`}
            aria-label="뒤로가기"
            className="text-on-surface flex items-center justify-center p-2 -ml-2 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </Link>
          <h1 className="font-section-title text-section-title text-on-surface">자재 입고 확인</h1>
          <Link
            href={`/sites/${id}`}
            aria-label="닫기"
            className="text-on-surface flex items-center justify-center p-2 -mr-2 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </Link>
        </header>

        {/* Main Content Canvas */}
        <main className="px-screen-margin pt-6 flex flex-col gap-section-gap">
          {/* ① 상단 카드 */}
          <section className="bg-on-tertiary border border-outline-variant rounded p-card-padding flex gap-4">
            <div className="shrink-0">
              <Image
                alt="문서 사진 썸네일"
                className="w-[80px] h-[110px] rounded-lg object-cover border border-outline-variant"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEOgkcImzmSbIiWM8tOVaNOuZdf9SwiPaQdx7AoDtB4lrclFkYnNdHPn0GQhy_wZpzLnUSuZ2n5C-TWhJ5z7SntDN2ljCI6hkBy1GaHmgufjHNgfC_upVaipIpca63K7pQq6bhx4arflKBYzRv2LAfzj3gMsozBtWlcbsnRHduiZCVh7ZIIhC4CNCQW1rg7f3rJ-LuR2GqDnik_Uyr2EPcQHJN9k5fEU6ZtOR0DzfWM7hrVUS0PsDG"
                width={80}
                height={110}
                unoptimized
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col flex-grow py-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-section-title text-section-title text-on-surface">(주)대한자재</h2>
                <span className="border border-inverse-primary text-inverse-primary font-caption text-caption px-1.5 py-0.5 rounded text-[11px] leading-tight flex items-center">
                  AI
                </span>
              </div>
              <p className="font-body-sub text-body-sub text-on-surface-variant mb-auto">2026-08-28</p>
              <Link
                className="font-body-sub text-body-sub text-inverse-primary underline mt-2 inline-block cursor-pointer"
                href={`/sites/${id}/material/capture`}
              >
                다시 찍기
              </Link>
            </div>
          </section>

          {/* ② 주황/빨강 알림 띠 (오류가 있을 때만 표시, 계산 일치 시 자동 해제) */}
          {mismatchCount > 0 ? (
            <div className="bg-warning/10 border border-warning rounded p-3 flex items-center gap-2 transition-all">
              <span
                className="material-symbols-outlined text-warning text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
              <p className="font-body-sub text-body-sub text-warning font-semibold">
                확인이 필요한 항목이 {mismatchCount}건 있습니다
              </p>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-500/30 rounded p-3 flex items-center gap-2 transition-all">
              <span
                className="material-symbols-outlined text-[#1B873F] text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <p className="font-body-sub text-body-sub text-[#1B873F] font-semibold">
                모든 항목의 수량·단가 계산이 검증되었습니다
              </p>
            </div>
          )}

          {/* ③ 품목 리스트 섹션 */}
          <section>
            <h3 className="font-section-title text-section-title text-on-surface mb-4">
              품목 {items.length}건
            </h3>
            <div className="flex flex-col gap-card-gap">
              {items.map((item) => {
                const isEditing = editingId === item.id;
                const calculated = item.qty * item.unitPrice;

                // 카드 편집 모드
                if (isEditing) {
                  const tempCalc = (parseInt(editQty, 10) || 0) * (parseInt(editUnitPrice, 10) || 0);
                  return (
                    <article
                      key={item.id}
                      className="bg-white border-2 border-primary rounded p-card-padding shadow-md flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-body-main text-body-main text-on-surface font-bold">
                          {item.name} <span className="text-xs text-primary font-medium">(수정 중)</span>
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[12px] font-semibold text-secondary block mb-1">
                            수량
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={editQty}
                              onChange={(e) => setEditQty(e.target.value)}
                              className="w-full bg-[#f4f3f7] border border-outline-variant rounded px-2.5 py-1.5 text-[15px] font-semibold text-on-surface focus:bg-white focus:outline-none focus:border-primary"
                            />
                            <span className="absolute right-2.5 top-2 text-[13px] text-secondary">
                              개
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="text-[12px] font-semibold text-secondary block mb-1">
                            단가
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={editUnitPrice}
                              onChange={(e) => setEditUnitPrice(e.target.value)}
                              className="w-full bg-[#f4f3f7] border border-outline-variant rounded px-2.5 py-1.5 text-[15px] font-semibold text-on-surface focus:bg-white focus:outline-none focus:border-primary"
                            />
                            <span className="absolute right-2.5 top-2 text-[13px] text-secondary">
                              원
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#f4f3f7] p-2.5 rounded text-right flex justify-between items-center text-[14px]">
                        <span className="text-secondary font-medium">재계산 공급가액:</span>
                        <span className="font-bold text-primary text-[16px]">
                          {tempCalc.toLocaleString()}원
                        </span>
                      </div>

                      <div className="flex gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-surface-container border border-outline-variant text-secondary font-caption text-caption py-2 rounded text-center cursor-pointer hover:bg-surface-variant"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={() => applyEdit(item.id)}
                          className="flex-1 bg-primary text-white font-caption text-caption py-2 rounded text-center font-bold cursor-pointer hover:bg-primary-container active:scale-[0.98] transition-all shadow-sm"
                        >
                          완료
                        </button>
                      </div>
                    </article>
                  );
                }

                // 일반 카드 (오류 상태)
                if (item.hasMismatch) {
                  return (
                    <article
                      key={item.id}
                      className="bg-on-tertiary border-2 border-warning rounded p-card-padding transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-body-main text-body-main text-on-surface font-semibold">
                          {item.name}
                        </h4>
                        <span className="border border-inverse-primary text-inverse-primary font-caption text-caption px-1.5 py-0.5 rounded text-[11px] leading-tight">
                          {item.statusText}
                        </span>
                      </div>
                      <p className="font-body-sub text-[15px] leading-snug text-on-surface-variant mb-1">
                        {item.qty}개 × {item.unitPrice.toLocaleString()}원
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="material-symbols-outlined text-warning text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          error
                        </span>
                        <p className="font-body-sub text-body-sub">
                          <span className="text-on-surface-variant line-through">
                            {item.writtenAmount.toLocaleString()}원
                          </span>
                          <span className="text-warning ml-1">
                            (계산: {calculated.toLocaleString()}원)
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="flex-1 bg-surface-container border border-outline-variant text-on-surface-variant font-caption text-caption py-2 rounded text-center cursor-pointer hover:bg-surface-variant active:scale-[0.98] transition-all"
                        >
                          사진 다시 보기
                        </button>
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="flex-1 bg-surface-container border border-outline-variant text-primary font-caption text-caption py-2 rounded text-center font-bold cursor-pointer hover:bg-primary-fixed/20 active:scale-[0.98] transition-all"
                        >
                          수정
                        </button>
                      </div>
                    </article>
                  );
                }

                // 정상 카드
                return (
                  <article
                    key={item.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded p-card-padding flex justify-between items-center transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="font-body-main text-body-main text-on-surface font-semibold">
                          {item.name}
                        </h4>
                        <span
                          className={`font-caption text-caption px-1.5 py-0.5 rounded text-[11px] leading-tight border ${
                            item.statusText === '수정됨' || item.statusText === '확인'
                              ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                              : 'border-inverse-primary text-inverse-primary'
                          }`}
                        >
                          {item.statusText}
                        </span>
                      </div>
                      <p className="font-body-sub text-[15px] leading-snug text-on-surface-variant">
                        {item.qty}개 × {item.unitPrice.toLocaleString()}원 ={' '}
                        {calculated.toLocaleString()}원
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="text-secondary hover:text-primary p-1.5 rounded active:scale-95 text-[13px] font-medium"
                    >
                      수정
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ④ 합계 카드 (실시간 계산 연동) */}
          <section className="bg-on-tertiary border border-outline-variant rounded p-card-padding flex flex-col gap-2 text-right mb-6">
            <div className="flex justify-between items-center">
              <span className="font-body-main text-body-main text-on-surface-variant">공급가액</span>
              <span className="font-body-main text-body-main text-on-surface font-medium">
                {totalSupply.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-body-main text-body-main text-on-surface-variant">부가세</span>
              <span className="font-body-main text-body-main text-on-surface font-medium">
                {totalVat.toLocaleString()}원
              </span>
            </div>
            <hr className="border-t border-outline-variant my-1" />
            <div className="flex justify-between items-end mt-2">
              <span className="font-body-main text-body-main text-on-surface font-semibold pb-1">
                합계
              </span>
              <span className="font-number-highlight text-number-highlight text-primary">
                {grandTotal.toLocaleString()}원
              </span>
            </div>
          </section>
        </main>

        {/* ⑤ 하단 고정 버튼 */}
        <div className="fixed bottom-0 w-full max-w-[390px] bg-surface p-screen-margin border-t border-outline-variant z-50">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded flex items-center justify-center active:scale-95 transition-transform duration-100 cursor-pointer shadow-sm"
          >
            확인하고 저장
          </button>
        </div>
      </div>
    </div>
  );
}
