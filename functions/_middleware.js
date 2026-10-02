// 접속 게이트
//
// 키는 Cloudflare Pages 환경변수 ACCESS_KEY로 관리한다.
// 이 저장소는 공개되어 있으므로 아래 기본값은 변수 미설정 시의 폴백일 뿐이다.
const ACCESS_KEY = "bup2026";
const COOKIE_NAME = "bup_access";
const MAX_AGE = 60 * 60 * 24; // 24시간

function gatePage({ error }) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>BUP LOCAL TOOLS — 준비 중</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #0F172A;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
      text-align: center;
      padding: 24px;
    }
    .badge {
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #6366F1;
      background: #1E1B4B;
      border: 1px solid #4F46E5;
      padding: 6px 16px;
      border-radius: 99px;
      margin-bottom: 32px;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin-bottom: 20px;
    }
    h1 span { color: #6366F1; }
    p.lede {
      font-size: 1rem;
      color: #94A3B8;
      font-weight: 600;
      max-width: 360px;
      line-height: 1.7;
    }
    form {
      margin-top: 40px;
      width: 100%;
      max-width: 320px;
    }
    label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: #64748B;
      margin-bottom: 10px;
    }
    .row { display: flex; gap: 8px; }
    input {
      flex: 1;
      min-width: 0;
      height: 56px;
      padding: 0 14px;
      font-size: 16px;
      font-family: inherit;
      color: #fff;
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 12px;
      outline: none;
      text-align: center;
      letter-spacing: 0.05em;
    }
    input::placeholder { color: #475569; letter-spacing: normal; }
    input:focus { border-color: #6366F1; box-shadow: 0 0 0 3px rgba(99,102,241,.25); }
    button {
      height: 56px;
      padding: 0 22px;
      font-size: 16px;
      font-weight: 700;
      font-family: inherit;
      color: #fff;
      background: #4F46E5;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      white-space: nowrap;
    }
    button:active { background: #4338CA; }
    .error {
      margin-top: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #FCA5A5;
    }
    .status {
      margin-top: 40px;
      font-size: 13px;
      color: #475569;
      font-weight: 700;
      display: flex;
      align-items: center;
    }
    .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #10B981;
      display: inline-block;
      margin-right: 8px;
      animation: ping 1.2s infinite;
    }
    @keyframes ping {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.4); }
    }
  </style>
</head>
<body>
  <div class="badge">BUP LOCAL · TOOLS</div>
  <h1>서비스 <span>준비 중</span>입니다</h1>
  <p class="lede">현재 내부 개발 및 테스트가 진행 중입니다.<br />곧 더 나은 모습으로 찾아뵙겠습니다.</p>

  <form method="POST" autocomplete="off">
    <label for="key">접속 키가 있으시면 입력해 주세요</label>
    <div class="row">
      <input
        type="text"
        id="key"
        name="key"
        placeholder="접속 키"
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off"
        spellcheck="false"
        required
      />
      <button type="submit">입장</button>
    </div>
    ${error ? '<p class="error">키가 올바르지 않습니다. 다시 확인해 주세요.</p>' : ""}
  </form>

  <div class="status"><span class="dot"></span>개발 진행 중</div>
</body>
</html>`;
}

// 공개 회사 소개 페이지 (bupai.net/ 첫 화면)
//
// 앱 코드(/_next/)를 공개하지 않으려고 Next 페이지가 아니라 여기서 HTML을 직접 만든다.
// 키가 없는 사람이 "/"에 오면 이 페이지를, 그 밖의 경로에서는 gatePage를 보여준다.
// 메일 수신자가 도메인을 열어봤을 때 실체가 보이도록 검색 허용(index)으로 둔다.
const CONTACT_EMAIL = "jstar26@bupai.net";

function landingPage({ error }) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BUP — Building Up Precision</title>
  <meta name="description" content="BUP는 소방·전기·설비 전문공사 업체를 위한 AI 현장 관리 서비스를 만듭니다. 거래명세서 AI 인식, 현장별 원가 집계, 일보와 전자서명." />
  <meta property="og:title" content="BUP — Building Up Precision" />
  <meta property="og:description" content="AI-driven precision for specialty construction." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bupai.net/" />
  <link rel="canonical" href="https://bupai.net/" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --ink: #0B0F19;
      --sub: #4B5563;
      --muted: #6B7280;
      --line: #E5E7EB;
      --bg: #FFFFFF;
      --soft: #F5F6F8;
      --blue: #1D4ED8;
      --blue-soft: #EFF4FF;
    }
    body {
      background: var(--bg);
      color: var(--ink);
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
      word-break: keep-all;
      overflow-wrap: anywhere;
    }
    .wrap { max-width: 960px; margin: 0 auto; padding: 0 24px; }
    header { border-bottom: 1px solid var(--line); }
    header .wrap { display: flex; align-items: center; justify-content: space-between; height: 68px; }
    .mark { display: flex; align-items: baseline; gap: 10px; text-decoration: none; color: var(--ink); }
    .mark b { font-size: 26px; font-weight: 900; letter-spacing: -0.02em; }
    .mark b span { color: var(--blue); }
    .mark small { font-size: 12px; color: var(--muted); letter-spacing: 0.04em; }
    header a.contact { font-size: 14px; font-weight: 700; color: var(--blue); text-decoration: none; }

    .hero { padding: 88px 0 72px; }
    .eyebrow { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--blue); text-transform: uppercase; margin-bottom: 18px; }
    h1 { font-size: clamp(30px, 5vw, 48px); font-weight: 900; line-height: 1.25; letter-spacing: -0.03em; margin-bottom: 22px; }
    .lede { font-size: 17px; color: var(--sub); max-width: 620px; }

    .features { background: var(--soft); padding: 64px 0; }
    .features h2 { font-size: 20px; font-weight: 700; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
    .card { background: var(--bg); border: 1px solid var(--line); border-radius: 14px; padding: 24px; }
    .card .no { font-size: 12px; font-weight: 900; color: var(--blue); margin-bottom: 10px; }
    .card h3 { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
    .card p { font-size: 15px; color: var(--sub); }

    .status { padding: 64px 0; }
    .status .box { border: 1px solid var(--line); border-radius: 14px; padding: 28px; display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between; }
    .status h2 { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
    .status p { font-size: 15px; color: var(--sub); }
    .mail { display: inline-block; font-size: 16px; font-weight: 700; color: #fff; background: var(--blue); padding: 14px 22px; border-radius: 12px; text-decoration: none; white-space: nowrap; }

    details { border-top: 1px solid var(--line); }
    summary { cursor: pointer; list-style: none; padding: 22px 0; font-size: 14px; font-weight: 700; color: var(--muted); }
    summary::-webkit-details-marker { display: none; }
    summary::after { content: " ›"; }
    details[open] summary::after { content: " ⌄"; }
    form { padding-bottom: 28px; max-width: 360px; }
    label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 8px; }
    .row { display: flex; gap: 8px; }
    input { flex: 1; min-width: 0; height: 48px; padding: 0 14px; font: inherit; font-size: 16px; border: 1px solid var(--line); border-radius: 10px; outline: none; }
    input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(29,78,216,.15); }
    button { height: 48px; padding: 0 18px; font: inherit; font-size: 15px; font-weight: 700; color: #fff; background: var(--ink); border: 0; border-radius: 10px; cursor: pointer; }
    .error { margin-top: 10px; font-size: 14px; color: #B91C1C; font-weight: 500; }

    footer { border-top: 1px solid var(--line); padding: 28px 0 40px; font-size: 13px; color: var(--muted); }
    footer .wrap { display: flex; flex-wrap: wrap; gap: 8px 24px; justify-content: space-between; }
    footer a { color: inherit; }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <a class="mark" href="/"><b>BU<span>P</span></b><small>Building Up Precision</small></a>
      <a class="contact" href="mailto:${CONTACT_EMAIL}">문의하기</a>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="wrap">
        <p class="eyebrow">AI-driven precision for specialty construction</p>
        <h1>전문공사 현장의 기록과 원가를<br />AI로 정확하게.</h1>
        <p class="lede">BUP는 소방·전기·설비 전문공사 업체를 위한 현장 관리 서비스를 만들고 있습니다.
          거래명세서를 사진으로 찍으면 AI가 읽어 자재 원가를 정리하고, 출역·일보·검측 서명까지
          현장의 기록을 한곳에 모읍니다.</p>
      </div>
    </section>

    <section class="features">
      <div class="wrap">
        <h2>무엇을 하나요</h2>
        <div class="grid">
          <div class="card">
            <p class="no">01</p>
            <h3>거래명세서 AI 인식</h3>
            <p>사진 한 장으로 품목·수량·단가를 읽고, 합계가 맞는지 검증한 뒤 사람이 확정합니다.</p>
          </div>
          <div class="card">
            <p class="no">02</p>
            <h3>현장별 원가 집계</h3>
            <p>현장·월·거래처별로 자재와 노무 지출을 모아 계약 금액과 바로 비교합니다.</p>
          </div>
          <div class="card">
            <p class="no">03</p>
            <h3>일보와 전자서명</h3>
            <p>하루 기록이 일보로 자동 정리되고, 검측서는 여러 사람이 차례로 서명합니다.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="status">
      <div class="wrap">
        <div class="box">
          <div>
            <h2>현재 개발 중입니다</h2>
            <p>도입과 협업 문의를 환영합니다. 메일로 연락 주세요.</p>
          </div>
          <a class="mail" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        </div>
      </div>
    </section>

    <div class="wrap">
      <details${error ? " open" : ""}>
        <summary>고객사 접속</summary>
        <form method="POST" action="/" autocomplete="off">
          <label for="key">발급받은 접속 키를 입력해 주세요</label>
          <div class="row">
            <input type="text" id="key" name="key" placeholder="접속 키" autocomplete="off"
              autocapitalize="off" autocorrect="off" spellcheck="false" required />
            <button type="submit">입장</button>
          </div>
          ${error ? '<p class="error">키가 올바르지 않습니다. 다시 확인해 주세요.</p>' : ""}
        </form>
      </details>
    </div>
  </main>

  <footer>
    <div class="wrap">
      <span>© 2026 BUP · bupai.net</span>
      <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
    </div>
  </footer>
</body>
</html>`;
}

const ROBOTS_TXT = `User-agent: *
Allow: /$
Disallow: /
`;

function htmlResponse(html, status) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function gateResponse({ error, path }) {
  // 첫 화면은 공개 소개 페이지, 나머지 경로는 키 입력 화면
  const html = path === "/" ? landingPage({ error }) : gatePage({ error });
  return htmlResponse(html, error ? 401 : 200);
}

function grantResponse(accessKey, location) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
      "Set-Cookie": `${COOKIE_NAME}=${accessKey}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequest({ request, next, env }) {
  const accessKey = (env && env.ACCESS_KEY) || ACCESS_KEY;

  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie") || "";

  // 검색엔진에는 공개 소개 페이지("/")만 허용한다
  if (url.pathname === "/robots.txt") {
    return new Response(ROBOTS_TXT, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // 이미 인증된 사람은 그대로 통과
  if (cookie.includes(`${COOKIE_NAME}=${accessKey}`)) {
    return next();
  }

  // 키 입력 폼 제출. 키가 주소에 남지 않도록 POST로 받는다.
  if (request.method === "POST") {
    let submitted = "";
    try {
      const form = await request.formData();
      submitted = String(form.get("key") || "").trim();
    } catch {
      submitted = "";
    }

    if (submitted === accessKey) {
      return grantResponse(accessKey, url.pathname);
    }
    return gateResponse({ error: true, path: url.pathname });
  }

  // ?key=... 방식도 계속 지원한다. 이미 뿌린 QR과 링크를 살려두기 위함이다.
  if (url.searchParams.get("key") === accessKey) {
    return grantResponse(accessKey, url.pathname);
  }

  return gateResponse({ error: false, path: url.pathname });
}
