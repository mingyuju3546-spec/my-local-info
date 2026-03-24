// scripts/generate-blog-post.js
// 매일 1회 자동 실행: local-info.json 최신 항목 → Gemini 블로그 글 생성 → posts 폴더에 저장

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'public/data/local-info.json');
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

async function generateBlogPost() {
  // [1단계] 최신 데이터 확인
  let latestItem = null;
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(fileContent);
    if (!data || data.length === 0) {
      console.log('local-info.json에 데이터가 없습니다.');
      process.exit(0);
    }
    latestItem = data[data.length - 1];
    console.log(`최신 항목: ${latestItem.name}`);
  } catch (err) {
    console.error('local-info.json 읽기 실패:', err.message);
    process.exit(1);
  }

  // 기존 posts 폴더의 파일과 비교 (name 기준)
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const existingFiles = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  for (const file of existingFiles) {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(latestItem.name)) {
      console.log('이미 작성된 글입니다.');
      process.exit(0);
    }
  }

  // [2단계] Gemini AI로 블로그 글 생성
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error('GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];

  const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.

정보: ${JSON.stringify(latestItem, null, 2)}

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${today}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
---

(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

마지막 줄에 FILENAME: ${today}-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로.`;

  let rawText = '';
  try {
    console.log('Gemini API 호출 중...');
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API 오류: ${response.status} ${await response.text()}`);
    }

    const json = await response.json();
    rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!rawText) {
      throw new Error('Gemini 응답이 비어 있습니다.');
    }
    console.log('Gemini 응답 수신 완료');
  } catch (err) {
    console.error('Gemini 호출 실패:', err.message);
    process.exit(1);
  }

  // [3단계] FILENAME 분리 및 파일 저장
  let filename = `${today}-post.md`;
  let postContent = rawText;

  // FILENAME: 줄 추출
  const filenameMatch = rawText.match(/FILENAME:\s*(.+)/);
  if (filenameMatch) {
    const rawFilename = filenameMatch[1].trim();
    filename = rawFilename.endsWith('.md') ? rawFilename : `${rawFilename}.md`;
    // FILENAME 줄 본문에서 제거
    postContent = rawText.replace(/\nFILENAME:.+/g, '').trim();
  }

  // 마크다운 코드블록 제거 (혹시 있을 경우)
  postContent = postContent.replace(/^```(?:markdown|md)?\s*/i, '').replace(/\s*```$/, '').trim();

  // 파일명에 허용되지 않는 특수문자 제거
  filename = filename.replace(/[<>:"/\\|?*]/g, '');

  const filePath = path.join(POSTS_DIR, filename);

  // 같은 파일명 이미 존재하면 suffix 추가
  const finalPath = fs.existsSync(filePath)
    ? filePath.replace('.md', `-${Date.now()}.md`)
    : filePath;

  try {
    fs.writeFileSync(finalPath, postContent, 'utf8');
    console.log(`✅ 블로그 글이 생성되었습니다: ${path.basename(finalPath)}`);
  } catch (err) {
    console.error('파일 저장 실패:', err.message);
    process.exit(1);
  }
}

generateBlogPost();
