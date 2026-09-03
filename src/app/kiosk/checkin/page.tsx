'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KioskCheckinPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/kiosk');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleReturn = () => {
    router.push('/kiosk');
  };

  return (
    <div
      onClick={handleReturn}
      className="w-screen h-screen bg-[#F5F6F8] text-[#1a1c1e] flex flex-col justify-between overflow-hidden select-none cursor-pointer font-sans"
    >
      {/* Header */}
      <header className="bg-[#022448] text-white p-5 flex flex-col justify-center items-center h-24 border-b border-[#e3e2e6] z-10 shrink-0 shadow-sm">
        <h1 className="text-[24px] font-bold text-white">동래 A현장</h1>
        <p className="text-[14px] text-white/80 mt-1">2026-08-28 (금) 07:12</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="bg-white max-w-[700px] w-full rounded-2xl border border-[#e3e2e6] p-8 flex flex-col items-center shadow-sm">
          {/* Success Icon */}
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-green-50 flex items-center justify-center mb-6 border border-green-200 animate-pulse">
            <span
              className="material-symbols-outlined text-[72px] md:text-[80px] text-green-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          {/* Main Message */}
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#1a1c1e] text-center leading-tight mb-4 tracking-tight">
            출근이
            <br />
            확인되었습니다
          </h2>

          {/* User Info */}
          <div className="bg-[#f4f3f7] w-full rounded-xl p-6 mt-2 border border-[#e3e2e6] flex flex-col items-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e3e2e6] text-[#43474e] text-[13px] mb-2 font-semibold">
              배관팀
            </span>
            <p className="text-[28px] font-bold text-[#022448]">김O수</p>
          </div>
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="bg-white border-t border-[#e3e2e6] p-5 pb-8 shrink-0 flex justify-center">
        <div className="bg-[#f4f3f7] max-w-[700px] w-full rounded-xl border border-[#e3e2e6] p-4 flex justify-around">
          <div className="flex flex-col items-center">
            <span className="text-[14px] text-[#43474e] mb-1 font-medium">오늘 출근</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[32px] font-bold text-[#022448]">9</span>
              <span className="text-[16px] text-[#43474e]">명</span>
            </div>
          </div>
          <div className="w-px bg-[#c4c6cf] my-2" />
          <div className="flex flex-col items-center">
            <span className="text-[14px] text-[#43474e] mb-1 font-medium">퇴근</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[32px] font-bold text-[#585f6b]">3</span>
              <span className="text-[16px] text-[#43474e]">명</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
