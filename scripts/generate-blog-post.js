const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const LOCAL_INFO_PATH = path.join(__dirname, "..", "public", "data", "local-info.json");
const POSTS_DIRECTORY = path.join(__dirname, "..", "src", "content", "posts");

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function main() {
  console.log("=== AI 블로그 글 자동 생성 스크립트 시작 ===");

  if (!GEMINI_API_KEY) {
    console.error("오류: GEMINI_API_KEY 환경변수가 존재하지 않습니다.");
    process.exit(1);
  }

  // 1. 최신 데이터 읽기 (마지막 항목)
  let localData = [];
  try {
    if (fs.existsSync(LOCAL_INFO_PATH)) {
      localData = JSON.parse(fs.readFileSync(LOCAL_INFO_PATH, "utf-8"));
    }
  } catch (err) {
    console.error("local-info.json 읽기 실패:", err);
    process.exit(1);
  }

  if (localData.length === 0) {
    console.log("데이터베이스가 비어 있습니다. 수집을 먼저 실행해 주세요.");
    process.exit(0);
  }

  // 가장 마지막으로 추가된 신규 공공 서비스 항목 선택
  const targetItem = localData[localData.length - 1];
  console.log(`1. 가공 대상 서비스 선정: "${targetItem.name}"`);

  // 2. 기존 포스트 분석을 통한 중복 체크
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
  }

  const existingFiles = fs.readdirSync(POSTS_DIRECTORY).filter(file => file.endsWith(".md"));
  let isAlreadyWritten = false;

  for (const fileName of existingFiles) {
    try {
      const filePath = path.join(POSTS_DIRECTORY, fileName);
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = matter(content);
      // 이미 같은 내용의 서비스명으로 포스팅한 이력이 있다면 중복으로 판단
      if (parsed.data && (parsed.data.title === targetItem.name || parsed.data.summary === targetItem.summary)) {
        isAlreadyWritten = true;
        break;
      }
    } catch (err) {
      console.warn("기존 포스트 파싱 실패 경고:", fileName, err);
    }
  }

  if (isAlreadyWritten) {
    console.log("이미 작성된 글입니다");
    process.exit(0);
  }

  // 3. Gemini AI를 활용하여 블로그 본문 및 파일명 생성
  console.log("2. Gemini AI 블로그 본문 및 파일명 요청 중...");
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const todayStr = getTodayString();
  const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.

정보: ${JSON.stringify(targetItem, null, 2)}

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${todayStr}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
---

(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

마지막 줄에 FILENAME: ${todayStr}-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로.`;

  let responseText = "";
  try {
    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!geminiRes.ok) {
      throw new Error(`Gemini API HTTP 에러: ${geminiRes.status}`);
    }

    const geminiJson = await geminiRes.json();
    responseText = geminiJson.candidates[0].content.parts[0].text.trim();
    console.log("성공: AI 블로그 본문 수신 완료.");
  } catch (err) {
    console.error("Gemini AI 본문 생성 실패:", err);
    process.exit(1);
  }

  // 4. 본문과 파일명(FILENAME:) 분리 처리
  let filename = `${todayStr}-new-post.md`;
  let fileContent = responseText;

  // FILENAME: 찾기
  const filenameMatch = responseText.match(/FILENAME:\s*([^\r\n]+)/i);
  if (filenameMatch) {
    const rawFilename = filenameMatch[1].trim();
    filename = rawFilename.endsWith(".md") ? rawFilename : `${rawFilename}.md`;
    
    // 파일 쓰기용 콘텐츠에서 FILENAME: 행은 제거
    fileContent = responseText.replace(/FILENAME:\s*[^\r\n]+/i, "").trim();
  }

  // 혹시 모를 마크다운 백틱 가공
  if (fileContent.startsWith("```markdown")) {
    fileContent = fileContent.substring(11).trim();
  }
  if (fileContent.endsWith("```")) {
    fileContent = fileContent.substring(0, fileContent.length - 3).trim();
  }

  // 5. 파일 저장
  const finalFilePath = path.join(POSTS_DIRECTORY, filename);
  try {
    fs.writeFileSync(finalFilePath, fileContent, "utf-8");
    console.log(`성공: 신규 블로그 포스트 "${filename}" 저장 완료!`);
    console.log("=== 모든 과정이 완료되었습니다. ===");
  } catch (err) {
    console.error("파일 저장 실패:", err);
    process.exit(1);
  }
}

main();
