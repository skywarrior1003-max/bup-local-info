// 서명 요청함(화면 21)에 걸린 문서별 데이터.
// 화면 22(검측서 확인)와 화면 23(인증 완료)이 같은 값을 나눠 쓴다.

export type SignState = 'done' | 'current' | 'waiting';

export type Signer = {
  order: string;
  role: string;
  person: string;
  state: SignState;
  /** 서명 완료 시각. state가 'done'일 때만 쓴다. */
  date?: string;
  time?: string;
  /** ④ 감리처럼 덧붙는 안내 한 줄 */
  note?: string;
};

export type HistoryEntry = {
  order: string;
  role: string;
  person: string;
  at: string;
  how: string;
};

export type AttestationDoc = {
  /** 문서 종류 배지 */
  kind: string;
  title: string;
  /** 현장 · 날짜 */
  site: string;
  /** 내용 고정 안내 두 번째 줄 */
  hashNotice: string;
  /** 서명 대상 내용 표. 마지막 판정 행은 verdict로 따로 둔다. */
  rows: [string, string][];
  verdict: [string, string];
  /** 첨부 사진 줄. 값이 없으면 그 줄을 그리지 않는다. */
  attachment?: string;
  /** 병렬 서명일 때 서명 순서 위에 붙는 안내 */
  parallelNote?: string;
  signers: Signer[];

  // ---- 인증 완료 화면 ----
  completeSummary: string;
  completedAt: string;
  finalHash: string;
  history: HistoryEntry[];
  nextStage: {title: string; detail: string};
  circulation: [string, string][];
};

export const attestationDocs: Record<string, AttestationDoc> = {
  '1': {
    kind: '검수검측서',
    title: '3층 소화배관 수압시험 검측서',
    site: '동래 A현장 · 2026-08-29',
    hashNotice: '문서 해시 a3f19c7e2b8d4051 · 08-29 16:05 고정',
    rows: [
      ['시험 구간', '3층 스프링클러 주배관'],
      ['시험 압력', '12.0 kgf/cm²'],
      ['유지 시간', '60분'],
      ['압력 강하', '0.0 kgf/cm²'],
    ],
    verdict: ['판정', '합격'],
    attachment: '첨부 사진 4장',
    signers: [
      {
        order: '①',
        role: '시공 팀장',
        person: '김O수 · ㈜비유피 소방팀',
        state: 'done',
        date: '08-29',
        time: '14:20',
      },
      {
        order: '②',
        role: '현장 관리자',
        person: '윤O태 · ㈜비유피',
        state: 'done',
        date: '08-29',
        time: '16:05',
      },
      {
        order: '③',
        role: '상위공종 담당자',
        person: '최O석 · 대성종합건설 기계팀',
        state: 'current',
      },
      {
        order: '④',
        role: '감리',
        person: '한O중 · 동남감리단',
        state: 'waiting',
        note: '계정 없이 링크로 서명',
      },
    ],
    completeSummary: '서명 4건 · 해시 체인 검증 통과',
    completedAt: '동래 A현장 · v1 · 완료 2026-08-30 09:12',
    finalHash: '9af6b3d1c05e47a2f8e91d6b0c3a57e4',
    history: [
      {
        order: '①',
        role: '시공 팀장',
        person: '김O수 · ㈜비유피 소방팀',
        at: '08-29 14:20',
        how: '화면 필기 · 체인 7c1e4b90',
      },
      {
        order: '②',
        role: '현장 관리자',
        person: '윤O태 · ㈜비유피',
        at: '08-29 16:05',
        how: '화면 필기 · 체인 2b90f3ac',
      },
      {
        order: '③',
        role: '상위공종 담당자',
        person: '최O석 · 대성종합건설 기계팀',
        at: '08-30 08:47',
        how: '화면 필기 · 체인 e4d37f18',
      },
      {
        order: '④',
        role: '감리',
        person: '한O중 · 동남감리단',
        at: '08-30 09:12',
        how: '1회용 링크 서명 (계정 없음) · 체인 9af6b3d1',
      },
    ],
    nextStage: {
      title: '후행공정 입력이 열렸습니다',
      detail: '3층 배관 보온 · 마감 작업 등록 가능',
    },
    circulation: [
      ['회람 시작 · 내용 고정', '08-29 16:05'],
      ['감리 링크 발송', '08-30 08:47'],
      ['감리 문서 열람', '08-30 09:03'],
      ['체인 재검증 통과', '08-30 09:12'],
    ],
  },

  '2': {
    kind: '안전점검표',
    title: '08-30 용접작업 전 안전점검표',
    site: '동래 A현장 · 2026-08-30',
    hashNotice: '문서 해시 b7e02d4a91c3f568 · 08-30 07:10 고정',
    rows: [
      ['작업 구간', '3층 기계실 소화배관 용접'],
      ['작업 인원', '3명'],
      ['보호구 확인', '용접면·방화복·장갑 착용 확인'],
      ['화기감시자', '배치 완료 (1명)'],
    ],
    verdict: ['판정', '작업 가능'],
    parallelNote: '순서 없음 (동시 서명)',
    signers: [
      {
        order: '①',
        role: '용접공',
        person: '김O수 · ㈜비유피 소방팀',
        state: 'done',
        date: '08-30',
        time: '07:32',
      },
      {
        order: '②',
        role: '화기감시자',
        person: '이O호 · ㈜비유피',
        state: 'current',
      },
      {
        order: '③',
        role: '안전관리자',
        person: '윤O태 · ㈜비유피',
        state: 'waiting',
      },
    ],
    completeSummary: '서명 3건 · 해시 체인 검증 통과',
    completedAt: '동래 A현장 · v1 · 완료 2026-08-30 07:55',
    finalHash: '4c81e05fb2a97d3e61c04b8d5a7e2f90',
    history: [
      {
        order: '①',
        role: '용접공',
        person: '김O수 · ㈜비유피 소방팀',
        at: '08-30 07:32',
        how: '화면 필기 · 체인 4c81e05f',
      },
      {
        order: '②',
        role: '화기감시자',
        person: '이O호 · ㈜비유피',
        at: '08-30 07:41',
        how: '화면 필기 · 체인 a92d7f13',
      },
      {
        order: '③',
        role: '안전관리자',
        person: '윤O태 · ㈜비유피',
        at: '08-30 07:55',
        how: '화면 필기 · 체인 6b03c8e4',
      },
    ],
    nextStage: {
      title: '후행공정 입력이 열렸습니다',
      detail: '3층 기계실 소화배관 용접 작업 시작 가능',
    },
    circulation: [
      ['회람 시작 · 내용 고정', '08-30 07:10'],
      ['용접공 서명', '08-30 07:32'],
      ['화기감시자 서명', '08-30 07:41'],
      ['안전관리자 서명 · 체인 검증 통과', '08-30 07:55'],
    ],
  },
};

export function getAttestationDoc(id: string): AttestationDoc {
  return attestationDocs[id] ?? attestationDocs['1'];
}
