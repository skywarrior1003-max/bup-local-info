import React from "react";

export default function CoupangBanner() {
  const partnerId = process.env.NEXT_PUBLIC_COUPANG_PARTNER_ID;

  // 파트너스 ID가 비어있거나 "나중에_입력" 상태면 배너 영역을 아예 생성하지 않음 (E-E-A-T 레이아웃 점검)
  if (!partnerId || partnerId === "나중에_입력" || partnerId.trim() === "") {
    return null;
  }

  return (
    <div className="w-full my-6 py-4 flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
      <span className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase mb-2">
        RECOMMENDED PRODUCT
      </span>
      <div className="w-full max-w-[728px] min-h-[90px] flex items-center justify-center bg-white border border-slate-200/50 rounded-xl p-2 shadow-sm">
        {/* 쿠팡 파트너스 추천 광고 프레임 */}
        <iframe
          src={`https://coupa.ng/c/${partnerId}`}
          width="100%"
          height="90"
          frameBorder="0"
          scrolling="no"
          className="border-none rounded-lg"
          title="Coupang Advertisement"
        />
      </div>
      {/* 쿠팡 파트너스 필수 공정위 대가 표시 문구 */}
      <span className="text-[10px] text-slate-400 font-semibold mt-2.5 px-4 text-center">
        * 이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </span>
    </div>
  );
}
