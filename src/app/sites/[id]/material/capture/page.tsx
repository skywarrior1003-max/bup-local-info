'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function MaterialCapturePage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '1';
  const router = useRouter();

  const [multiShot, setMultiShot] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const handleCapture = () => {
    router.push(`/sites/${id}/material/confirm`);
  };

  return (
    <div className="w-full flex justify-center bg-[#121212] min-h-screen">
      {/* Mobile App Container */}
      <div className="relative w-full max-w-[390px] min-h-screen bg-black flex flex-col justify-between overflow-hidden shadow-2xl text-white select-none">
        
        {/* Background Camera Viewfinder Simulation */}
        <div className="absolute inset-0 z-0 bg-[#1a1c1e] overflow-hidden">
          {/* Sample Invoice / Blueprint Texture Behind Camera */}
          <div
            className="w-full h-full bg-cover bg-center opacity-75 scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdSMBRhB5OHmEAso-VoDDMgsgI1jxxMMu3gorJx6_3oOYGlwG6owpnbok4zqoCsaMbDcqtT_sV9YRFV63uv0GiURcOWka045zTfo26pMkRwJX4KuPo8BAz_bQpJmEOWJgGzhhzE4C2vTTKIyrg-6FpuqFZvPEjV0cuuLu6nK-EU-OBsa3Wh6Xvg-3RDhiC9-k_KULLOkPs-WpGKPpK2cFv1hJAO17SpmjxNHb2BjiBYHNA2Fey7zjp')`,
            }}
          />
          {/* Subtle Grid overlay for camera feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* Top App Bar */}
        <header className="relative z-30 w-full h-[64px] flex items-center justify-between px-screen-margin bg-gradient-to-b from-black/80 to-transparent">
          <Link
            href={`/sites/${id}`}
            aria-label="뒤로가기"
            className="text-white active:scale-95 transition-transform flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </Link>
          <h1 className="font-section-title text-section-title text-white font-semibold tracking-tight">
            명세서 촬영
          </h1>
          <Link
            href={`/sites/${id}`}
            aria-label="닫기"
            className="text-white active:scale-95 transition-transform flex items-center justify-center p-2 -mr-2 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </Link>
        </header>

        {/* Central Guide Frame Area */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-2 pointer-events-none">
          {/* Guide Text Top */}
          <div className="mb-4 bg-black/65 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-white text-[14px] font-medium tracking-tight text-center">
              명세서 네 모서리를 프레임 안에 맞춰주세요
            </p>
          </div>

          {/* The Guide Frame (80x110 aspect ratio ~ 270x370) */}
          <div className="relative w-[270px] h-[370px] border-2 border-white/80 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]">
            {/* Corner Indicators */}
            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-[#1b873f] rounded-tl-sm" />
            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-[#1b873f] rounded-tr-sm" />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-[#1b873f] rounded-bl-sm" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-[#1b873f] rounded-br-sm" />

            {/* Document Detection Simulated Scan Line */}
            <div className="absolute inset-x-2 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#1b873f] to-transparent opacity-80 animate-pulse" />
          </div>

          {/* Status Guidance Bottom */}
          <div className="mt-5 flex items-center gap-1.5 bg-black/75 px-5 py-2.5 rounded-full border border-[#1b873f]/40 backdrop-blur-md shadow-lg">
            <span className="text-[#2bd064] text-[15px] font-bold">좋습니다</span>
            <span
              className="material-symbols-outlined text-[#2bd064] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
        </main>

        {/* Bottom Camera Controls */}
        <footer className="relative z-30 w-full bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-between px-8 pt-4 pb-8">
          {/* Multi-shot Toggle (Left) */}
          <div className="flex flex-col items-center gap-1.5 w-[72px]">
            <label className="flex items-center cursor-pointer" htmlFor="multi-shot-toggle">
              <div className="relative">
                <input
                  id="multi-shot-toggle"
                  type="checkbox"
                  className="sr-only"
                  checked={multiShot}
                  onChange={(e) => setMultiShot(e.target.checked)}
                />
                <div
                  className={`block w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                    multiShot ? 'bg-primary-container' : 'bg-white/30'
                  }`}
                />
                <div
                  className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow"
                  style={{
                    transform: multiShot ? 'translateX(20px)' : 'translateX(0)',
                  }}
                />
              </div>
            </label>
            <span className="text-white/90 text-[12px] font-medium tracking-tight">여러 장 찍기</span>
          </div>

          {/* Shutter Button (Center) */}
          <button
            type="button"
            onClick={handleCapture}
            className="relative w-[76px] h-[76px] rounded-full border-4 border-white/60 flex items-center justify-center active:scale-90 transition-transform duration-150 cursor-pointer shadow-xl group"
            aria-label="촬영하기"
          >
            <div className="w-[60px] h-[60px] bg-white rounded-full group-hover:bg-white/90 transition-colors shadow-inner" />
          </button>

          {/* Flash Control (Right) */}
          <button
            type="button"
            onClick={() => setFlashOn((prev) => !prev)}
            aria-label="플래시 토글"
            className="flex flex-col items-center gap-1.5 text-white/90 hover:text-white transition-opacity active:scale-95 cursor-pointer w-[72px]"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <span className="material-symbols-outlined text-[22px]">
                {flashOn ? 'flash_on' : 'flash_off'}
              </span>
            </div>
            <span className="text-[12px] font-medium tracking-tight">{flashOn ? '플래시 켬' : '플래시 끔'}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
