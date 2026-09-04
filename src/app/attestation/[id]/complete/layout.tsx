import type {Metadata} from 'next';

// 화면 23은 뒤로가기 때문에 클라이언트 컴포넌트라 metadata를 직접 내보낼 수 없다.
// 탭 제목만 담당하는 레이아웃을 따로 둔다.
export const metadata: Metadata = {
  title: '인증 완료',
};

export default function AttestationCompleteLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
