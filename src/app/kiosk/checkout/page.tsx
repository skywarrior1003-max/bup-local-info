'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KioskCheckoutPage() {
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
      {/* Header Info */}
      <div className="text-center pt-8 mb-2">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#022448] mb-1">동래 A현장</h1>
        <p className="text-[18px] text-[#43474e] font-medium">2026-08-28 (금) 17:40</p>
      </div>

      {/* Main Content (KIOSK View) */}
      <main className="w-full max-w-[800px] mx-auto px-6 flex flex-col justify-center gap-6 z-10">
        {/* Success Card */}
        <div className="bg-white rounded-2xl border border-[#e3e2e6] p-8 flex flex-col items-center justify-center gap-5 shadow-sm">
          <span
            className="material-symbols-outlined text-[72px] md:text-[80px] text-[#1B873F]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <h2 className="text-[28px] md:text-[32px] leading-[40px] font-bold text-[#022448] text-center">
            퇴근이 확인되었습니다
          </h2>
          <div className="bg-[#f4f3f7] rounded-xl py-4 px-6 w-full text-center border border-[#c4c6cf]/40">
            <p className="text-[26px] md:text-[28px] font-bold text-[#022448]">
              박O민 <span className="text-[18px] font-normal text-[#43474e]">(전기팀)</span>
            </p>
          </div>
          <div className="w-full flex justify-center mt-1">
            {/* Role Badge */}
            <span className="bg-[#e3e2e6] text-[#1a1c1e] px-3 py-1 rounded-full text-[13px] font-semibold border border-[#c4c6cf]">
              작업자
            </span>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl border border-[#e3e2e6] p-5 flex justify-around items-center gap-4 shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-[15px] text-[#43474e] mb-1 font-medium">오늘 출근</span>
            <span className="text-[28px] font-bold text-[#022448]">8명</span>
          </div>
          <div className="h-10 w-px bg-[#e3e2e6]" />
          <div className="flex flex-col items-center">
            <span className="text-[15px] text-[#43474e] mb-1 font-medium">오늘 퇴근</span>
            <span className="text-[28px] font-bold text-[#1B873F]">4명</span>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full text-center pb-8">
        <p className="text-[14px] text-[#585f6b]">3초 뒤 자동으로 스캔 대기 화면으로 돌아갑니다</p>
      </footer>
    </div>
  );
}
