const ACCESS_KEY = "bup2026";
const COOKIE_NAME = "bup_access";

const BLOCKED_HTML = `<!DOCTYPE html>
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
    p {
      font-size: 1rem;
      color: #94A3B8;
      font-weight: 600;
      max-width: 360px;
      line-height: 1.7;
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
    .status {
      margin-top: 40px;
      font-size: 13px;
      color: #475569;
      font-weight: 700;
      display: flex;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="badge">BUP LOCAL · TOOLS</div>
  <h1>서비스 <span>준비 중</span>입니다</h1>
  <p>현재 내부 개발 및 테스트가 진행 중입니다.<br />곧 더 나은 모습으로 찾아뵙겠습니다.</p>
  <div class="status"><span class="dot"></span>개발 진행 중</div>
</body>
</html>`;

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie") || "";
  const isAuthed = cookie.includes(`${COOKIE_NAME}=${ACCESS_KEY}`);

  // 비밀 키 파라미터로 접속 시 쿠키 발급 후 메인으로 리다이렉트
  if (url.searchParams.get("key") === ACCESS_KEY) {
    const redirectUrl = url.origin + url.pathname;
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
        "Set-Cookie": `${COOKIE_NAME}=${ACCESS_KEY}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`,
      },
    });
  }

  // 인증 쿠키 있으면 정상 통과
  if (isAuthed) {
    return next();
  }

  // 미인증 → 준비 중 페이지
  return new Response(BLOCKED_HTML, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
