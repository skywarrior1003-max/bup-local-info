import type {Metadata} from 'next';
import './attestation.css';

export const metadata: Metadata = {
  title: '서명 요청함',
};

export default function AttestationLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
