'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KioskScanPage() {
  const router = useRouter();
  const [timeString, setTimeString] = useState('2026-08-28 (금) 07:12');

  useEffect(() => {
    // Current time or default demo time
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      const dayName = days[now.getDay()];
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeString(`${year}-${month}-${day} (${dayName}) ${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {
    router.push('/kiosk/checkin');
  };

  return (
    <div
      onClick={handleScan}
      className="w-screen h-screen bg-[#faf9fc] text-[#1a1c1e] flex flex-col justify-between overflow-hidden select-none cursor-pointer font-sans"
    >
      {/* 1. Top Bar */}
      <div className="h-[40px] bg-[#E3E6EA] flex items-center justify-center shrink-0">
        <span className="text-[#5F6672] text-[14px] font-semibold">오프라인 — 12건 대기 중</span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative py-4">
        {/* 2. Header Section */}
        <div className="text-center mb-8 flex flex-col gap-2">
          <h1 className="text-[32px] leading-tight font-bold text-[#1a1c1e]">동래 A현장</h1>
          <p className="text-[20px] text-[#43474e] font-medium tracking-wide">{timeString}</p>
        </div>

        {/* 3. Central Camera View */}
        <div className="w-[360px] h-[360px] md:w-[420px] md:h-[420px] bg-black rounded-2xl relative overflow-hidden flex items-center justify-center shadow-lg border border-[#c4c6cf]/30 shrink-0">
          {/* Simulated Camera Feed */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />

          {/* White solid scan frame overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] border-[3px] border-white rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] pointer-events-none z-10">
            {/* Corner Indicators */}
            <div className="absolute -top-[3px] -left-[3px] w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-[8px]" />
            <div className="absolute -top-[3px] -right-[3px] w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-[8px]" />
            <div className="absolute -bottom-[3px] -left-[3px] w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-[8px]" />
            <div className="absolute -bottom-[3px] -right-[3px] w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-[8px]" />
          </div>

          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#adc8f5] shadow-[0_0_12px_rgba(173,200,245,0.9)] z-20 animate-pulse animate-bounce" />
        </div>

        {/* 4. Instruction Text */}
        <div className="mt-8">
          <p className="text-[24px] font-semibold text-[#1a1c1e]">배지를 화면에 보여주세요</p>
        </div>
      </main>

      {/* 5. Footer Section */}
      <footer className="w-full flex flex-col items-center pb-8 px-6 shrink-0">
        <div className="w-full max-w-[600px] h-[1px] bg-[#c4c6cf] mb-4" />
        <p className="text-[18px] text-[#43474e] font-medium mb-3">오늘 출근 8명 · 퇴근 3명</p>

        {/* Demo Switcher for 4 screens */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 bg-white/90 backdrop-blur border border-[#c4c6cf] px-3 py-1.5 rounded-full shadow-sm text-[13px]"
        >
          <span className="text-[#585f6b] font-semibold mr-1">화면 전환 데모:</span>
          <button
            type="button"
            onClick={() => router.push('/kiosk/checkin')}
            className="px-2.5 py-1 bg-[#022448] text-white rounded-md font-medium hover:opacity-90 active:scale-95 transition"
          >
            18. 출근 성공
          </button>
          <button
            type="button"
            onClick={() => router.push('/kiosk/checkout')}
            className="px-2.5 py-1 bg-[#1B873F] text-white rounded-md font-medium hover:opacity-90 active:scale-95 transition"
          >
            19. 퇴근 성공
          </button>
          <button
            type="button"
            onClick={() => router.push('/kiosk/fail')}
            className="px-2.5 py-1 bg-[#ba1a1a] text-white rounded-md font-medium hover:opacity-90 active:scale-95 transition"
          >
            20. 인식 실패
          </button>
          <button
            type="button"
            onClick={() => router.push('/sites/1')}
            className="px-2.5 py-1 bg-[#e3e2e6] text-[#1a1c1e] rounded-md font-medium hover:bg-[#dad9dd] active:scale-95 transition ml-2"
          >
            ← 현장 홈 복귀
          </button>
        </div>
      </footer>
    </div>
  );
}
