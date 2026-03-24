// scripts/fetch-public-data.js
// 매일 1회 자동 실행: 공공데이터 API → Gemini 가공 → local-info.json 추가

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'public/data/local-info.json');

async function fetchPublicData() {
  const apiKey = process.env.PUBLIC_DATA_API_KEY;
  if (!apiKey) {
    console.error('PUBLIC_DATA_API_KEY 환경변수가 설정되지 않았습니다.');
    process.exit(1);
  }

  // [1단계] 공공데이터포털 API에서 데이터 가져오기
  const url = `https://api.odcloud.kr/api/gov24/v3/serviceList?page=1&perPage=20&returnType=JSON&serviceKey=${encodeURIComponent(apiKey)}`;

  let rawItems = [];
  try {
    console.log('공공데이터 API 호출 중...');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API 응답 오류: ${response.status}`);
    }
    const json = await response.json();
    rawItems = json.data || [];
    console.log(`총 ${rawItems.length}개 항목 수신`);
  } catch (err) {
    console.error('공공데이터 API 호출 실패:', err.message);
    process.exit(1);
  }

  // 필터링: 성남 → 경기 → 전체 순서
  const searchFields = (item) =>
    [item['서비스명'], item['서비스목적요약'], item['지원대상'], item['소관기관명']]
      .filter(Boolean)
      .join(' ');

  let filtered = rawItems.filter((item) => searchFields(item).includes('성남'));
  if (filtered.length === 0) {
    filtered = rawItems.filter((item) => searchFields(item).includes('경기'));
  }
  if (filtered.length === 0) {
    filtered = rawItems;
  }
  console.log(`필터링 후 ${filtered.length}개 항목 대상`);

  // [2단계] 기존 데이터와 비교 (name 기준 중복 제거)
  let existingData = [];
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch {
    console.log('기존 데이터 파일 없음. 새로 시작합니다.');
  }

  const existingNames = new Set(existingData.map((item) => item.name));

  const newItems = filtered.filter((item) => !existingNames.has(item['서비스명']));
  if (newItems.length === 0) {
    console.log('새로운 데이터가 없습니다.');
    process.exit(0);
  }

  const targetItem = newItems[0];
  console.log(`새 항목 처리 중: ${targetItem['서비스명']}`);

  // [3단계] Gemini AI로 가공
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error('GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    process.exit(1);
  }

  const nextId = existingData.length > 0
    ? Math.max(...existingData.map((d) => d.id)) + 1
    : 1;

  const prompt = `아래 공공데이터 1건을 분석해서 JSON 객체로 변환해줘. 형식:
{id: ${nextId}, name: 서비스명, category: '행사' 또는 '혜택', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', location: 장소 또는 기관명, target: 지원대상, summary: 한줄요약, link: 상세URL}
category는 내용을 보고 행사/축제면 '행사', 지원금/서비스면 '혜택'으로 판단해.
startDate가 없으면 오늘 날짜, endDate가 없으면 '상시'로 넣어.
반드시 JSON 객체만 출력해. 다른 텍스트 없이.

데이터:
${JSON.stringify(targetItem, null, 2)}`;

  let processedItem = null;
  try {
    console.log('Gemini API 호출 중...');
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API 오류: ${geminiResponse.status}`);
    }

    const geminiJson = await geminiResponse.json();
    let rawText = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // 마크다운 코드블록 제거
    rawText = rawText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    processedItem = JSON.parse(rawText);
    console.log('Gemini 가공 완료:', processedItem.name);
  } catch (err) {
    console.error('Gemini 처리 실패 - 기존 데이터 유지:', err.message);
    process.exit(1);
  }

  // [4단계] 기존 데이터에 추가 후 저장
  try {
    const updatedData = [...existingData, processedItem];
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`✅ ${processedItem.name} 항목이 추가되었습니다. (총 ${updatedData.length}건)`);
  } catch (err) {
    console.error('파일 저장 실패:', err.message);
    process.exit(1);
  }
}

fetchPublicData();
