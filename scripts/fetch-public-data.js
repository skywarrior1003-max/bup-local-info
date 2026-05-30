const fs = require("fs");
const path = require("path");

const PUBLIC_DATA_API_KEY = process.env.PUBLIC_DATA_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const LOCAL_INFO_PATH = path.join(__dirname, "..", "public", "data", "local-info.json");

// 날짜 포맷 함수 (YYYY-MM-DD)
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function main() {
  console.log("=== 공공데이터 자동 수집 및 AI 가공 스크립트 시작 ===");

  if (!PUBLIC_DATA_API_KEY) {
    console.error("오류: PUBLIC_DATA_API_KEY 환경변수가 존재하지 않습니다.");
    process.exit(1);
  }
  if (!GEMINI_API_KEY) {
    console.error("오류: GEMINI_API_KEY 환경변수가 존재하지 않습니다.");
    process.exit(1);
  }

  // 1. 기존 데이터 읽기
  let localData = [];
  try {
    if (fs.existsSync(LOCAL_INFO_PATH)) {
      localData = JSON.parse(fs.readFileSync(LOCAL_INFO_PATH, "utf-8"));
    }
  } catch (err) {
    console.error("기존 local-info.json 읽기 실패:", err);
    process.exit(1);
  }

  // 2. 공공데이터 API 호출
  console.log("1. 공공데이터 API 호출 중...");
  const publicDataUrl = `https://api.odcloud.kr/api/gov24/v3/serviceList?page=1&perPage=20&returnType=JSON`;
  
  let rawData = [];
  try {
    const res = await fetch(publicDataUrl, {
      headers: {
        Authorization: `Infuser ${PUBLIC_DATA_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP 에러: ${res.status}`);
    }

    const json = await res.json();
    rawData = json.data || [];
    console.log(`성공: 총 ${rawData.length}건의 데이터를 가져왔습니다.`);
  } catch (err) {
    console.error("공공데이터 API 호출 실패:", err);
    process.exit(1);
  }

  if (rawData.length === 0) {
    console.log("가져온 데이터가 비어 있습니다.");
    process.exit(0);
  }

  // 필드값 추출 보조 함수 (한글/영문 키 모두 대응)
  const getFieldValue = (item, keys) => {
    for (const key of keys) {
      if (item[key] !== undefined && item[key] !== null) {
        return String(item[key]);
      }
    }
    return "";
  };

  const nameKeys = ["서비스명", "serviceName", "serviceNm", "title"];
  const purposeKeys = ["서비스목적요약", "servicePurposeSummary", "servicePurpSmr", "summary"];
  const targetKeys = ["지원대상", "supportTarget", "supportTrgt", "target"];
  const agencyKeys = ["소관기관명", "agencyName", "instNm", "org"];

  // 3. 지역 필터링 규칙 적용
  console.log("2. 지역 조건별 필터링 진행 중...");
  
  const checkText = (item, text) => {
    const n = getFieldValue(item, nameKeys);
    const p = getFieldValue(item, purposeKeys);
    const t = getFieldValue(item, targetKeys);
    const a = getFieldValue(item, agencyKeys);
    const combined = `${n} ${p} ${t} ${a}`;
    return combined.includes(text);
  };

  // 1순위: '부산' 포함
  let filteredList = rawData.filter(item => checkText(item, "부산"));
  
  // 2순위: '부산'이 없고 '경남' 또는 '창원' 또는 '울산' 포함
  if (filteredList.length === 0) {
    filteredList = rawData.filter(item => 
      checkText(item, "경남") || checkText(item, "창원") || checkText(item, "울산")
    );
  }

  // 3순위: 다 없으면 전체 데이터 사용
  if (filteredList.length === 0) {
    filteredList = rawData;
  }

  console.log(`필터링 완료: 후보 데이터 ${filteredList.length}건`);

  // 4. 기존 데이터와 중복(Name 기준) 비교하여 완전히 새로운 것 1개 찾기
  let newItem = null;
  const existingNames = new Set(localData.map(item => item.name));

  for (const item of filteredList) {
    const name = getFieldValue(item, nameKeys);
    if (name && !existingNames.has(name)) {
      newItem = item;
      break; // 새로운 것 1건만 선택
    }
  }

  if (!newItem) {
    console.log("새로운 데이터가 없습니다");
    process.exit(0);
  }

  console.log(`3. 신규 데이터 발견: "${getFieldValue(newItem, nameKeys)}"`);

  // 5. Gemini AI를 활용한 신규 데이터 가공
  console.log("4. Gemini AI 가공 요청 중...");
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const itemJsonStr = JSON.stringify({
    name: getFieldValue(newItem, nameKeys),
    purpose: getFieldValue(newItem, purposeKeys),
    target: getFieldValue(newItem, targetKeys),
    agency: getFieldValue(newItem, agencyKeys)
  }, null, 2);

  const prompt = `아래 공공데이터 1건을 분석해서 JSON 객체로 변환해줘. 형식:
{
  "id": "영문-소문자-하이픈-슬러그 (예: busan-startup-fund)",
  "name": "서비스명 (지원금액이 있으면 괄호로 포함, 예: 부산 창업지원금 200만원)",
  "category": "행사" 또는 "혜택",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "location": "주관기관명 또는 지자체명",
  "target": "지원 대상 요약 (1~2문장)",
  "summary": "한줄 요약 (지원 내용과 혜택 중심, 1~2문장)",
  "link": "상세 URL 또는 #"
}
category 판단 기준:
- '행사': 공모, 정부지원사업, R&D, 창업지원 프로그램, 교육·컨설팅 지원
- '혜택': 현금 지원금, 보조금 지급, 융자, 세제혜택, 무상지원
id는 반드시 영문 소문자와 하이픈만 사용해 (한글 금지).
startDate가 없으면 오늘 날짜인 "${getTodayString()}", endDate가 없으면 "상시"로 넣어.
반드시 JSON 객체만 출력해. 마크다운 코드블록 없이.

분석할 공공데이터:
${itemJsonStr}`;

  let processedItem = null;
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
    let textResponse = geminiJson.candidates[0].content.parts[0].text;

    // 마크다운 백틱 및 코드블록 정화 처리
    textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    processedItem = JSON.parse(textResponse);
    console.log("성공: AI 가공 및 JSON 파싱 완료.");
  } catch (err) {
    console.error("Gemini AI 가공 또는 JSON 파싱 중 오류 발생:", err);
    process.exit(1);
  }

  if (!processedItem) {
    console.error("가공된 데이터가 유효하지 않습니다.");
    process.exit(1);
  }

  // 6. 안전하게 기존 JSON 배열 뒤에 추가 및 doc-auto 순서 유지
  console.log("5. 파일 저장 처리 중...");
  
  // doc-auto와 나머지 분리
  const docAutoItem = localData.find(item => item.id === "doc-auto");
  const otherItems = localData.filter(item => item.id !== "doc-auto");

  // 새로운 가공 아이템 추가
  otherItems.push(processedItem);

  // 최종 배열 (doc-auto가 있다면 항상 첫 번째, 그 뒤로 나머지 순서 유지)
  const finalData = [];
  if (docAutoItem) {
    finalData.push(docAutoItem);
  }
  finalData.push(...otherItems);

  try {
    fs.writeFileSync(LOCAL_INFO_PATH, JSON.stringify(finalData, null, 2), "utf-8");
    console.log(`성공: 신규 서비스 "${processedItem.name}"가 성공적으로 저장되었습니다!`);
    console.log("=== 모든 과정이 안전하게 종료되었습니다. ===");
  } catch (err) {
    console.error("최종 파일 쓰기 실패 (기존 데이터가 그대로 유지됩니다):", err);
    process.exit(1);
  }
}

main();
