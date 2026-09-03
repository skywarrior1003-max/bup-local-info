'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MaterialCaptureWarnPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';

  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center overflow-hidden font-body-main">
      {/* Mobile Container */}
      <div
        className="relative w-full max-w-[390px] h-full flex flex-col bg-gray-900 bg-cover bg-center select-none"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSEauVULatL87aP6ZLcOMbyBpZWnWasMLlipqvu6pIUEH6R7p6mHnNdmjXClz_XMu2LtorBUqwvxZsh0dKhTjYHqlbS3XHqbMKe2AQRi-Z1cSVCryh-x89ZerQwhXLhKE3Reg8CtXgzlXgsyzx6OiolBj-bSTlBRpY6jzC2SZzOcvBdURp93SLtoDifVM_REJo1ELocqo6yDZueTmzPUMhcH5zHiPEDaxMSi5Ozc8iCriE1G52CdIB')",
        }}
      >
        {/* Camera Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-10" />

        {/* Top App Bar */}
        <header className="relative z-50 flex items-center justify-between px-screen-margin py-4 w-full">
          <Link
            href={`/sites/${id}/material/capture`}
            aria-label="뒤로 가기"
            className="text-white hover:bg-white/10 rounded-full p-2 transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]" data-icon="arrow_back">
              arrow_back
            </span>
          </Link>
          <h1 className="font-section-title text-section-title text-white font-semibold">
            명세서 촬영
          </h1>
          <Link
            href={`/sites/${id}`}
            aria-label="닫기"
            className="text-white hover:bg-white/10 rounded-full p-2 transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]" data-icon="close">
              close
            </span>
          </Link>
        </header>

        {/* Camera Viewfinder / Guide */}
        <main className="flex-1 relative z-20 flex flex-col items-center justify-center px-6 pb-20 pointer-events-none">
          {/* Guide Text Top */}
          <p className="text-[15px] font-body-main mb-6 text-white text-center drop-shadow-md">
            명세서 네 모서리를 프레임 안에 맞춰주세요
          </p>

          {/* Document Guide Frame with overlay shadow */}
          <div className="w-full aspect-[3/4] border-2 border-white rounded-lg relative shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white -mt-1 -ml-1 rounded-tl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white -mt-1 -mr-1 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white -mb-1 -ml-1 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white -mb-1 -mr-1 rounded-br" />
          </div>

          {/* Warning Status (Shadow Detected) */}
          <div className="mt-8 flex items-center justify-center bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm border border-[#C77700]/30 animate-pulse pointer-events-auto">
            <span
              className="material-symbols-outlined text-[#C77700] mr-2 text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
            <span className="text-[16px] font-semibold text-[#C77700]">그림자가 있습니다</span>
          </div>
        </main>

        {/* Bottom Controls */}
        <footer className="relative z-50 w-full pb-10 pt-4 px-screen-margin flex items-center justify-between">
          {/* Multiple Shot Toggle */}
          <div className="flex flex-col items-center justify-center w-20">
            <span className="font-caption text-caption text-white/80 mb-2">여러 장 찍기</span>
            <button
              type="button"
              className="w-12 h-6 bg-white/20 rounded-full relative flex items-center border border-white/40 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 shadow-sm" />
            </button>
          </div>

          {/* Capture Button */}
          <Link
            href={`/sites/${id}/material/confirm`}
            className="w-[72px] h-[72px] rounded-full bg-white border-4 border-gray-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
            aria-label="촬영하기"
          >
            <div className="w-[60px] h-[60px] rounded-full border border-gray-200" />
          </Link>

          {/* Gallery/Preview Spacer */}
          <div className="w-20 flex justify-end">
            <div
              className="w-12 h-12 rounded bg-white/10 border border-white/20 overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDz5FTAjYBlWgxgYFWHFk2DbFBZBIXQUGQP2ycOOQmhUtQbkhyYK70M1Zc8dB3inkPlpZqi4Ju5E45CZrQS17Tr3ehN1y51vrADmE9MA71sxhoEG9NpyDVEOFjdpzD6m4jCei_6mEoASad23kpcom9dbqJXZKkMUMB1gw-YUg3dtEhbhpxyl0nUkbPxVg8zWNU8gRfTX6B8J55PLgPPIGsCNbNbtdUtE04BWT7VcFXVeW_ZmS4xnZSH')",
              }}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
