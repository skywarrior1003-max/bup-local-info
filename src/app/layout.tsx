import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '현장 관리',
  description: '한국 건설현장(소방·전기·설비) 하도급 업체용 모바일 웹앱',
  openGraph: {
    title: '현장 관리',
    description: '한국 건설현장(소방·전기·설비) 하도급 업체용 모바일 웹앱',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className="flex justify-center w-full min-h-screen text-on-surface bg-[#F5F6F8]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
