// 거래명세서 AI 추출 → 등식 검증 → 사람 확정 흐름의 화면 데이터.
// ai_flow 도표의 값을 그대로 옮겼다. 숫자를 바꾸면 등식이 맞지 않는다.
//
// 표에 찍힌 공급가액 합계 2,640,000은 명세서 원본에 인쇄된 값이고,
// AI가 읽은 4행을 더하면 2,604,000이라 36,000이 비는 것이 이 화면의 핵심이다.
// 행거볼트를 240,000으로 고치면 4행 합이 2,640,000이 되어 등식이 모두 맞는다.

export type StatementRow = {
  item: string;
  qty: string;
  unit: string;
  amount: string;
};

export type EquationCheck = {
  label: string;
  result: string;
  matched: boolean;
};

export const statement = {
  date: '2026-08-14',
  photo: {
    name: 'IMG_0814.jpg',
    note: '촬영 품질 판정 통과 · 기울기 보정 완료',
  },
  vendor: '대성소방공업(주)',
  rows: [
    {item: '강관 100A', qty: '20', unit: '45,000', amount: '900,000'},
    {item: '엘보 100A', qty: '40', unit: '12,000', amount: '480,000'},
    {item: '헤드 15A', qty: '120', unit: '8,500', amount: '1,020,000'},
    {item: '행거볼트', qty: '200', unit: '1,200', amount: '204,000'},
  ] as StatementRow[],
  totals: [
    ['공급가액 합계', '2,640,000'],
    ['세액', '264,000'],
    ['합계', '2,904,000'],
  ] as [string, string][],
  extractedTag: 'AI 추출 완료 · 4행',

  // ---- 검증 결과 ----
  pending: '1건 확인 필요',
  alert: {
    title: '등식 두 개가 같은 행을 가리킵니다',
    detail: '4행 중 1행만 확인하시면 됩니다',
  },
  checks: [
    {label: '① 공급가액 = 수량 × 단가', result: '3 / 4', matched: false},
    {label: '② 합계 = Σ행', result: '36,000 차이', matched: false},
    {label: '③ 세액 = 공급가액 × 0.1', result: '일치', matched: true},
  ] as EquationCheck[],
  badRow: {item: '행거볼트', qty: '200', unit: '1,200', amount: '204,000'} as StatementRow,
  recalc: {formula: '200 × 1,200 =', value: '240,000'},

  // ---- 사람 확정 ----
  confirmedBy: '정성욱',
  fix: {from: '204,000', to: '240,000'},
  label: 'AI 값 204,000 ↔ 사람 수정값 240,000',
  labelTag: '자사 DB에만 축적',
  hold: {
    title: '확정하기 전까지',
    detail: '원가 집계·정산에 반영되지 않습니다',
  },
};
