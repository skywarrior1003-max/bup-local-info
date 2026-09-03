'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

export default function PhotoAfterPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '3';
  const router = useRouter();

  const handleCapture = () => {
    // Navigate to Screen 11 (촬영 결과 확인)
    router.push(`/sites/${id}/photo/result`);
  };

  return (
    <div className="w-full flex justify-center bg-black min-h-screen text-on-surface">
      <div className="w-full max-w-[390px] h-screen relative bg-black flex flex-col justify-between overflow-hidden shadow-2xl select-none font-body-main">
        {/* Camera Viewport Background (Simulated) */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="작업 후 벽면 시공 상태"
            className="w-full h-full object-cover opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbxmVhC1a5IG3YmM3IJF547m9MEPaQodui57Qdrq7d8JFwrHCO7M_mS-h97FvLGaJi0z7Hp5sA0EN4uLn13phR9_1Mo0A5Ehf6oaP86Bq7XuAYLMrXq_lKZoZsgX-BhmNIkDmlxFGmOlxahIBgoNmrMKH5L3eTiXw60VxCekD1pYomKw_syDnlssf_bTXh-vwAtnJnqfnPbYk7TGGd4FnV4s_ArjM6cxf21PJnRjKIUp5u6AqS0gIW"
            fill
            unoptimized
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Top App Bar (Custom Overlay) */}
        <header className="relative z-20 flex items-center justify-between px-[20px] h-[64px] w-full pt-4">
          <Link
            href={`/sites/${id}/photo/before`}
            aria-label="뒤로가기"
            className="w-12 h-12 flex items-center justify-start text-white active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]" data-icon="arrow_back">
              arrow_back
            </span>
          </Link>
          <div className="flex-1 flex justify-center">
            {/* Status Badge */}
            <div className="h-[28px] px-4 rounded-full bg-primary-container text-white flex items-center justify-center font-caption font-bold shadow-md text-[13px]">
              작업 후
            </div>
          </div>
          <div className="w-12" /> {/* Spacer for alignment */}
        </header>

        {/* Center Guide Area */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-[20px] pointer-events-none">
          {/* Instruction Text */}
          <div className="absolute top-[10%] bg-black/60 px-6 py-3 rounded-lg backdrop-blur-sm shadow-lg">
            <p className="font-section-title text-section-title text-white text-center font-medium text-[16px]">
              같은 위치에서 완료 상태를 찍어주세요
            </p>
          </div>
          {/* Guide Frame */}
          <div className="w-full aspect-square border-2 border-white/80 rounded-[8px] shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] relative">
            {/* Corner Indicators */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
          </div>
        </main>

        {/* Bottom Controls */}
        <footer className="relative z-20 h-[120px] w-full flex items-center justify-between px-[32px] pb-8 bg-gradient-to-t from-black/80 to-transparent">
          {/* Previous Photo Thumbnail */}
          <div className="relative w-[56px] h-[56px] rounded-lg overflow-hidden border-2 border-white shadow-md">
            <Image
              alt="작업 전 사진 썸네일"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2hMrlUdsx-b3rSAx9g2lyHdCD5OrJD0pK2U55fjEaZ_6pnLFRtFC8FETbdrURNv20zk-Fu584jGxhXk2sIOMyYTMPo-TuAcSZxcJjVX7bBjsZjaVhvPJe9vepqUXN6Eu4J-UFrVIRfmiuVnyiotTNjoHlDq9SX0UrTzqmaaQQOWZiUSaK2JvZpgrEGaZdWqe-bexlEW9zUsLnnqMRPBOAJPD4jBI_Q8f6hNmY4LPGVPXFw1OmswRr"
              width={56}
              height={56}
              unoptimized
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/60 py-[2px]">
              <p className="text-[10px] text-white text-center font-bold">작업 전</p>
            </div>
          </div>

          {/* Shutter Button */}
          <button
            type="button"
            onClick={handleCapture}
            className="w-[72px] h-[72px] rounded-full bg-white/30 border-[4px] border-white flex items-center justify-center active:scale-90 transition-transform shadow-lg relative group cursor-pointer"
            aria-label="촬영하기"
          >
            <div className="w-[56px] h-[56px] rounded-full bg-white group-active:bg-gray-200 transition-colors shadow-inner" />
          </button>

          {/* Camera switch toggle button */}
          <div className="w-[56px] h-[56px] flex items-center justify-center">
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center text-white active:scale-95 transition-transform rounded-full bg-white/15 backdrop-blur-sm cursor-pointer"
              aria-label="카메라 전환"
            >
              <span className="material-symbols-outlined text-[24px]" data-icon="cameraswitch">
                cameraswitch
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
