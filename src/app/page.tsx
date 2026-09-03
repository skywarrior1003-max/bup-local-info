'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

// 정적 export 환경에서는 서버 redirect()를 쓸 수 없으므로 클라이언트에서 이동시킨다.
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/sites');
  }, [router]);

  return null;
}
