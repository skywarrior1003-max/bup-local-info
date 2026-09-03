// 정적 export를 위해 [id] 세그먼트의 경로를 미리 생성한다.
// 이 layout에서 만든 params는 하위 페이지(cost, material, photo, report 등)에도 적용된다.
export function generateStaticParams() {
  return [{id: '1'}, {id: '2'}, {id: '3'}];
}

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
