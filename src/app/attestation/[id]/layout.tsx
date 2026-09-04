import type {Metadata} from 'next';

// 정적 export를 위해 [id] 세그먼트의 경로를 미리 생성한다.
// 서명 요청함(화면 21)의 「내 차례」 카드 2건에 대응한다.
export function generateStaticParams() {
  return [{id: '1'}, {id: '2'}];
}

// 화면 22의 브라우저 탭 제목. 하위 complete 세그먼트가 다시 덮어쓴다.
export const metadata: Metadata = {
  title: '검측서 확인',
};

export default function AttestationDetailLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
