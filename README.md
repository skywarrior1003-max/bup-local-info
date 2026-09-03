# BUP 현장 관리 — MVP

한국 건설현장(소방·전기·설비) 하도급 업체용 모바일 웹앱의 초기 MVP다.
Next.js(App Router) + Tailwind CSS로 만든 **화면 시연용 목업**이며, 서버·DB·로그인은 붙어 있지 않다.
모든 화면은 안에 들어 있는 샘플 데이터로 동작한다.

## 화면 구성

폭 390px 세로 모바일 기준이며, PC 브라우저에서는 가운데에 휴대폰 크기로 표시된다.

| 경로 | 화면 |
|---|---|
| `/sites` | 현장 선택 |
| `/sites/[id]` | 현장 홈 |
| `/sites/[id]/material` | 자재 입고 현황 |
| `/sites/[id]/material/capture` | 명세서 촬영 |
| `/sites/[id]/material/capture-warn` | 촬영 경고 |
| `/sites/[id]/material/confirm` | 자재 입고 확인 (AI가 읽은 값) |
| `/sites/[id]/material/inspect` | 자재 입고 검수 |
| `/sites/[id]/cost` | 원가 현황 |
| `/sites/[id]/photo/before` · `after` · `result` · `result-fail` | 작업 전/후 사진 |
| `/sites/[id]/report` · `report/approved` | 작업일보 |
| `/sites/[id]/attendance` · `worker` | 출역·작업자 |
| `/kiosk` · `/kiosk/checkin` · `/kiosk/checkout` · `/kiosk/fail` | 현장 출입 단말 (태블릿 가로 1280x800) |

`/sites/[id]`의 샘플 현장은 `1`(동래 A현장), `2`(해운대 B현장), `3`(사상 C현장) 세 개다.
현장을 추가하려면 [src/app/sites/[id]/layout.tsx](src/app/sites/[id]/layout.tsx)의 `generateStaticParams`에 id를 추가한다.

## 개발

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 정적 파일이 out/ 에 생성된다
```

## 배포

main에 푸시하면 GitHub Actions가 빌드해서 Cloudflare Pages(`bup-local-info` 프로젝트)로 올린다.
`output: 'export'` 정적 사이트이므로 서버가 필요 없다.

접속 제어는 [functions/_middleware.js](functions/_middleware.js)의 Cloudflare Pages Function이 담당한다.

## 이전 버전

정부지원금 정보 블로그 사이트는 `legacy-blog` 브랜치와 `v0.1-blog` 태그에 보존되어 있다.
