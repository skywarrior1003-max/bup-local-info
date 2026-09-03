'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

export default function PhotoResultPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = (Array.isArray(rawId) ? rawId[0] : rawId) || '3';
  const router = useRouter();

  const handleSave = () => {
    router.push(`/sites/${id}/worker`);
  };

  return (
    <div className="w-full flex justify-center bg-[#f1f0f4] min-h-screen text-on-surface">
      {/* Mobile Container */}
      <div className="w-full max-w-[390px] bg-[#faf9fc] min-h-screen relative shadow-lg flex flex-col font-body-main">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full max-w-[390px] h-[64px] bg-surface border-b border-outline-variant flex items-center px-screen-margin z-50">
          <Link
            href={`/sites/${id}/photo/after`}
            aria-label="뒤로가기"
            className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-surface-container active:scale-95 transition-transform duration-100 text-on-surface-variant mr-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary font-bold">arrow_back</span>
          </Link>
          <h1 className="font-headline-display text-headline-display text-primary tracking-tight font-bold">
            촬영 결과 확인
          </h1>
        </header>

        {/* Main Content Canvas */}
        <main className="pt-[88px] pb-[120px] px-screen-margin flex flex-col gap-section-gap">
          {/* Status Header */}
          <div className="flex items-start">
            {/* Green Badge for [확인 완료] */}
            <div
              className="inline-flex items-center justify-center h-[28px] px-3 rounded-full border border-solid bg-surface-container-lowest font-caption text-caption"
              style={{ borderColor: '#1B873F', color: '#1B873F', fontWeight: 600 }}
            >
              [확인 완료]
            </div>
          </div>

          {/* Photos Grid Layout */}
          <section className="grid grid-cols-2 gap-card-gap">
            {/* Before Card */}
            <article className="flex flex-col gap-2">
              <h2 className="font-section-title text-section-title text-on-surface font-semibold">
                [작업 전]
              </h2>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-1 w-full aspect-square overflow-hidden shadow-sm">
                <Image
                  alt="작업 전 현장 사진"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH0AOW0ip-Jrwep8eJcfTdj7DhDI6FtxaPgg9qgNJ8hutHXRU-VCXxPujZJs9iE3W4lxI1G2GpJ1OGRyRtEZqlHmcI29oaAElyag3qiTcVkCCv6PfnOjgLHMO0Sli0teAaDhhgYO8af3U8kpv7rOhm-NIepzKWieI3LPXGByYZmX4tZy9RbIDS7KXor0oE8ACXfSRU5EM1KXd3dzO25bcNTAG_ApXh4laDjOpMdNpPB3Ro_ZhN_yaE"
                  width={160}
                  height={160}
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-caption text-caption text-secondary">08:12 · 현장 내</span>
              </div>
            </article>

            {/* After Card */}
            <article className="flex flex-col gap-2">
              <h2 className="font-section-title text-section-title text-on-surface font-semibold">
                [작업 후]
              </h2>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-1 w-full aspect-square overflow-hidden shadow-sm">
                <Image
                  alt="작업 후 현장 사진"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI3B75lX5gWbwptYa71p0ko8KufdcG9bhRFmgdckgI7aWzt6zY8QY35n4WGGG3aoj26HLGhzB_75UpLUDD-UZyknSieVSB2AtNnhQ3Wc7cg-tHS-mfy2A3qbTDZLAkSZxIRvVxRVSgxKPRpX4Bczwq4aY0bFFBwA9keUSevw5U8XkKxvzWqi7Tj15tx6fEMTjKOivCBGmEqSlaiBK8LI6wP44Q7kj0ZSmtsgW0YGdDDYvghaTDxNb1"
                  width={160}
                  height={160}
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-caption text-caption text-secondary">08:12 · 현장 내</span>
              </div>
            </article>
          </section>
        </main>

        {/* Bottom Fixed Action Area */}
        <div className="fixed bottom-0 w-full max-w-[390px] px-screen-margin pb-6 pt-4 bg-surface z-50 border-t border-outline-variant">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-[64px] bg-primary text-on-primary font-button-text text-button-text rounded-DEFAULT flex items-center justify-center active:bg-primary-container transition-colors shadow-sm cursor-pointer"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
