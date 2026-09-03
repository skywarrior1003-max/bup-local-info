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
      <head>
        {/*
          폰트는 globals.css의 @import가 아니라 여기서 불러온다.
          Material Symbols의 @import 한 줄이 빌드 과정에서 사라져
          모든 아이콘이 'arrow_back' 같은 글자로 보이는 문제가 있었다.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="flex justify-center w-full min-h-screen text-on-surface bg-[#F5F6F8]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
