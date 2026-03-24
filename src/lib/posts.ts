import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
}

export function getSortedPostsData(): PostData[] {
  // src/content/posts 폴더가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // 폴더 내 모든 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // 파일 이름에서 .md 제거하여 slug 생성
      const slug = fileName.replace(/\.md$/, '');

      // 파일 전체 경로
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // gray-matter를 사용하여 frontmatter 파싱
      const matterResult = matter(fileContents);

      // 날짜 처리 (Date 객체인 경우 YYYY-MM-DD 문자열로 변환)
      let dateValue = matterResult.data.date;
      if (dateValue instanceof Date) {
        dateValue = dateValue.toISOString().split('T')[0];
      }

      return {
        slug,
        title: matterResult.data.title || '제목 없음',
        date: dateValue || '',
        summary: matterResult.data.summary || '',
        excerpt: matterResult.data.summary || '',
        category: matterResult.data.category || '일반',
        tags: matterResult.data.tags || [],
        content: matterResult.content,
      } as PostData;
    });

  // 날짜순으로 정렬 (최신순)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  let dateValue = matterResult.data.date;
  if (dateValue instanceof Date) {
    dateValue = dateValue.toISOString().split('T')[0];
  }

  return {
    slug,
    title: matterResult.data.title || '제목 없음',
    date: dateValue || '',
    summary: matterResult.data.summary || '',
    excerpt: matterResult.data.summary || '',
    category: matterResult.data.category || '일반',
    tags: matterResult.data.tags || [],
    content: matterResult.content,
  };
}
