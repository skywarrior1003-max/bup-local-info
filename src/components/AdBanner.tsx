import React from "react";

export default function AdBanner() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // 광고 ID가 비어있거나 "나중에_입력" 상태면 광고 영역을 아예 생성하지 않음 (E-E-A-T 레이아웃 점검)
  if (!adsenseId || adsenseId === "나중에_입력" || adsenseId.trim() === "") {
    return null;
  }

  return (
    <div className="w-full my-8 py-4 flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
      <span className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase mb-2">
        SPONSORED ADVERTISEMENT
      </span>
      <div className="w-full max-w-[728px] min-h-[90px] flex items-center justify-center bg-white border border-slate-200/50 rounded-xl p-2 shadow-sm">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "90px" }}
          data-ad-client={adsenseId}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      {/* 구글 애드센스 인스턴스 활성화 스크립트 */}
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
}
