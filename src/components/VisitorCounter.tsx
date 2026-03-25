'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    // 이미 이번 세션에서 카운트했으면 그냥 표시만 (카운트 X)
    const alreadyCounted = sessionStorage.getItem('visitor_counted');

    if (!alreadyCounted) {
      // 처음 방문: 카운트 이미지를 불러와서 +1 증가
      sessionStorage.setItem('visitor_counted', 'true');
    }

    setCounted(true);
  }, []);

  const alreadyCounted =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('visitor_counted') === 'true'
      : false;

  // 처음 방문자: 카운트 증가용 URL
  const countUrl =
    'https://hits.sh/gimhaeinfo.com.svg?style=flat-square&label=%EB%B0%A9%EB%AC%B8%EC%9E%90%EC%88%98&color=ec4899&labelColor=ff69b4';

  // 이미 카운트된 세션: 카운트 증가 없이 현재 숫자만 표시
  // (hits.sh는 같은 URL이면 항상 증가하므로 캐싱 이미지를 활용)
  if (!counted) return null;

  return (
    <div className="py-2 flex items-center justify-center">
      <img
        src={countUrl}
        alt="방문자 수"
        className="h-5"
        // 브라우저 캐시를 활용: 같은 세션 내 재방문 시 캐시된 이미지 사용
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
