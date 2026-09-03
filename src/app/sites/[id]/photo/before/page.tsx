'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function PhotoBeforePage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '3';
  const router = useRouter();

  const handleCapture = () => {
    router.push(`/sites/${id}/photo/after`);
  };

  return (
    <div className="w-full flex justify-center bg-[#000000] min-h-screen text-on-surface">
      <div className="w-full max-w-[390px] h-screen relative bg-black flex flex-col justify-between overflow-hidden shadow-2xl select-none">
        {/* Background Camera Viewport Simulation */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNe9knz6mvyfKetRpEWcltZwpa4oT2oI6M5JZK8OaO_kThOmXT2QAvTtTPCHXgOgLoBF0nkY2AuuHEDzUgZKKuLw41NHUbPJ9Pq_03I_RfAEudCaG2kfAuIwSfD2Lw1oW3UGx7YZuiMrAzXjEeRsuJSiStLpkhKEjjylxgjsBhf2dDsR_oPgIeQg7WFhVQ2YiJHHzdI6tbqOXrvDSkRLHJwIK0J4F8MZ331ecccRQDAc9wlDUzSejM')`,
          }}
        />

        {/* Full screen gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />

        {/* Top App Bar Area (Custom for Camera) */}
        <header className="relative z-20 w-full px-screen-margin py-4 flex items-center justify-between">
          {/* Back Button */}
          <Link
            href={`/sites/${id}/worker`}
            aria-label="뒤로가기"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm active:scale-95 transition-transform text-white cursor-pointer hover:bg-black/60"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </Link>
          {/* Stage Badge */}
          <div className="bg-primary-container px-4 py-1.5 rounded-full flex items-center justify-center shadow-md">
            <span className="font-button-text text-button-text text-on-primary font-bold text-[14px]">
              작업 전
            </span>
          </div>
          {/* Placeholder for symmetry */}
          <div className="w-10 h-10" />
        </header>

        {/* Center Guide and Text */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pointer-events-none">
          {/* Instruction Text */}
          <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-lg mb-8 shadow-lg">
            <p className="font-section-title text-section-title text-white text-center font-medium text-[16px]">
              작업 전 상태가 보이도록 찍어주세요
            </p>
          </div>
          {/* Guide Frame */}
          <div className="w-[85%] aspect-square border-[1.5px] border-white/80 rounded-lg relative shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
            {/* Corner markers for technical feel */}
            <div className="absolute -top-[1.5px] -left-[1.5px] w-4 h-4 border-t-2 border-l-2 border-white" />
            <div className="absolute -top-[1.5px] -right-[1.5px] w-4 h-4 border-t-2 border-r-2 border-white" />
            <div className="absolute -bottom-[1.5px] -left-[1.5px] w-4 h-4 border-b-2 border-l-2 border-white" />
            <div className="absolute -bottom-[1.5px] -right-[1.5px] w-4 h-4 border-b-2 border-r-2 border-white" />
          </div>
        </main>

        {/* Bottom Action Area */}
        <footer className="relative z-20 w-full px-screen-margin pb-12 pt-6 flex items-center justify-between">
          {/* Thumbnail Placeholder */}
          <div className="w-14 h-14 bg-black/50 border border-white/30 rounded-lg backdrop-blur-sm flex items-center justify-center overflow-hidden" />

          {/* Capture Button */}
          <button
            type="button"
            onClick={handleCapture}
            className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center p-1 active:scale-90 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer group"
            aria-label="촬영하기"
          >
            <div className="w-full h-full rounded-full border-2 border-black/10 group-hover:bg-gray-100 transition-colors" />
          </button>

          {/* Empty space for symmetry */}
          <div className="w-14 h-14" />
        </footer>
      </div>
    </div>
  );
}
