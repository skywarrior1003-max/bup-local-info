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

function gateResponse({ error }) {
  return new Response(gatePage({ error }), {
    status: error ? 401 : 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
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
    return gateResponse({ error: true });
  }

  // ?key=... 방식도 계속 지원한다. 이미 뿌린 QR과 링크를 살려두기 위함이다.
  if (url.searchParams.get("key") === accessKey) {
    return grantResponse(accessKey, url.pathname);
  }

  return gateResponse({ error: false });
}
