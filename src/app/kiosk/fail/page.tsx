'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function KioskFailPage() {
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
      className="w-screen h-screen bg-[#f4f3f7] text-[#1a1c1e] flex flex-col justify-between items-center overflow-hidden select-none cursor-pointer font-sans"
    >
      <div className="w-full max-w-[1000px] h-full flex flex-col justify-between relative bg-[#f4f3f7] shadow-lg">
        {/* Top Header */}
        <header className="w-full px-6 py-4 flex justify-between items-center bg-[#faf9fc] border-b border-[#e3e2e6] shrink-0 z-10">
          <h1 className="text-[20px] font-bold text-[#1a1c1e] tracking-tight">동래 A현장</h1>
          <div className="flex items-center gap-2 bg-[#e3e2e6] px-3 py-1.5 rounded-full border border-[#e3e2e6]">
            <span className="w-2 h-2 rounded-full bg-[#c0c7d4] animate-pulse" />
            <span className="text-[13px] text-[#43474e] font-medium">오프라인 - 12건 대기 중</span>
          </div>
        </header>

        {/* Main Content Area - Error Focus */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div className="w-full max-w-[700px] flex flex-col items-center">
            {/* Large Warning Icon */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-6 border-4 border-[#ba1a1a]/20 shadow-[0_0_40px_rgba(186,26,26,0.15)] animate-bounce">
              <span
                className="material-symbols-outlined text-6xl md:text-7xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
            </div>

            {/* Bold Heading */}
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#1a1c1e] mb-2 text-center break-keep">
              인식에 실패했습니다
            </h2>

            {/* Sub-text */}
            <p className="text-[16px] text-[#43474e] text-center mb-6 break-keep">
              배지를 가이드 안에 다시 맞춰주세요.
            </p>

            {/* Troubleshooting Box */}
            <div className="w-full bg-[#faf9fc] border border-[#74777f]/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c0c7d4]" />
              <h3 className="text-[17px] font-bold text-[#1a1c1e] mb-3 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#585f6b]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lightbulb
                </span>
                도움말
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e3e2e6] text-[#43474e] flex items-center justify-center text-[13px] font-bold mt-0.5 border border-[#dad9dd]">
                    1
                  </div>
                  <span className="text-[15px] text-[#1a1c1e]">
                    배지에 이물질이 있는지 확인해 주세요.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e3e2e6] text-[#43474e] flex items-center justify-center text-[13px] font-bold mt-0.5 border border-[#dad9dd]">
                    2
                  </div>
                  <span className="text-[15px] text-[#1a1c1e]">
                    배지를 조금 더 멀리서 대어 보세요.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e3e2e6] text-[#43474e] flex items-center justify-center text-[13px] font-bold mt-0.5 border border-[#dad9dd]">
                    3
                  </div>
                  <span className="text-[15px] text-[#1a1c1e]">
                    지속적인 실패 시 현장 사무실에 문의해 주세요.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <p className="mt-8 text-[13px] text-[#43474e]">
            3초 뒤 자동으로 스캔 대기 화면으로 돌아갑니다
          </p>
        </main>

        {/* Footer */}
        <footer className="w-full h-16 bg-[#faf9fc] border-t border-[#e3e2e6] flex items-center justify-center px-6 shrink-0">
          <div className="text-[14px] text-[#43474e] font-medium">
            오늘 출근 <strong className="text-[#1a1c1e]">8명</strong> · 퇴근{' '}
            <strong className="text-[#1a1c1e]">3명</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}
