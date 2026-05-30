# 프로젝트: 건설 현장 문서 자동화 정부입찰 정부지원사업 및 소방 법률 정보 웹사이트

## 목표
개인이 방문후 로그인후 사진 및 문서파일을 업로드 후 원하는 문서 형식을 선택시 자동으로 문서를 생성한다. 공공데이터포털(data.go.kr)에서 /정부 창업기업 지원사업/지원금 정보를 자동 수집하고, AI가 매일 블로그 글을 자동 작성하며, Google AdSense + 쿠팡 파트너스로 수익화하는 웹사이트

## 기술 스택
- Next.js (App Router) + TypeScript + Tailwind CSS
- Gemini API (AI 글 자동 생성)
- 공공데이터포털 API (정부와 지역의 창업기업 지원사업 정보 수집)
- GitHub Actions (매일 자동 실행)
- Cloudflare Pages (무료 호스팅)

## 페이지 구성
1. 메인 페이지: 문서 자동화/이번 달 정부/지역 창업기업지원사업 + 지원금/혜택 카드 목록
2. 상세 페이지: 문서자동화 클릭시 자동화페이지, 정부지원사업 클릭 시 상세 정보
3. 블로그 목록: AI가 자동 생성한 글 목록, 유저가 방문하여 업로드 한 사진과 문서목록이 보이고 선택한 형식에 맞게 자동으로 생성된 문서
4. 블로그 상세: 개별 블로그 글 읽기

## 수익화
- Google AdSense: 메인 페이지, 블로그 글 페이지에 광고 배치
- 쿠팡 파트너스: 블로그 글 하단에 배너

## 자동화 (GitHub Actions)
매일 아침 7시(한국시간) 자동 실행:
1. 공공데이터 API에서 최신 정보 수집
2. Gemini AI로 블로그 글 자동 작성
3. Git 커밋 & 푸시
4. Cloudflare Pages 자동 배포

## 환경변수 (나중에 .env.local에 저장)
- GEMINI_API_KEY
- PUBLIC_DATA_API_KEY
- NEXT_PUBLIC_ADSENSE_ID
- NEXT_PUBLIC_GA_ID
