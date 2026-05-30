import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import AdBanner from "@/components/AdBanner";
import CoupangBanner from "@/components/CoupangBanner";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "글을 찾을 수 없음 | BUP LOCAL TOOLS",
    };
  }
  return {
    title: `${post.title} | BUP LOCAL 저널`,
    description: post.summary,
    openGraph: {
      title: `${post.title} | BUP LOCAL 저널`,
      description: post.summary,
      url: `https://bupplatform.com/blog/${slug}`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = getAllPosts();
    if (posts.length === 0) {
      return [{ slug: "placeholder" }];
    }
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("블로그 generateStaticParams 에러:", error);
    return [{ slug: "placeholder" }];
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] text-slate-800 font-sans">
        <h2 className="text-2xl font-black mb-4">해당 블로그 글을 찾을 수 없습니다.</h2>
        <Link href="/blog" className="px-6 py-3 bg-black text-white rounded-full font-bold">
          블로그 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // E-E-A-T 구조화 데이터: BlogPosting 스키마 정의
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "description": post.summary,
    "author": {
      "@type": "Organization",
      "name": "BUP LOCAL TOOLS",
      "url": "https://bupplatform.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BUP LOCAL TOOLS",
      "url": "https://bupplatform.com"
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] font-sans antialiased pb-20">
      
      {/* JSON-LD 구조화 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-sm font-black tracking-widest text-[#4F46E5] uppercase">
                ← BUP LOCAL · HOME
              </span>
            </Link>
            <Link href="/blog" className="text-sm font-extrabold text-slate-700 hover:text-black transition-all">
              블로그
            </Link>
            <Link href="/about" className="text-sm font-extrabold text-slate-700 hover:text-black transition-all">
              소개
            </Link>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-[#4F46E5] border border-indigo-100">
            {post.category}
          </span>
        </div>
      </header>

      {/* 블로그 포스트 본문 */}
      <main className="max-w-4xl mx-auto px-6 mt-10">
        <article className="bg-white rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-10 space-y-8">
          {/* 머리말 영역 */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-slate-400 font-extrabold">
              <div className="flex items-center gap-2">
                <span>🗓️ 작성일: {post.date}</span>
                <span>•</span>
                <span>카테고리: {post.category}</span>
              </div>
              <span className="text-[#4F46E5] bg-indigo-50/50 px-2 py-0.5 rounded">
                최종 업데이트: {post.date}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-bold leading-relaxed pt-2">
              {post.summary}
            </p>
          </div>

          {/* 마크다운 본문 영역 */}
          <div className="prose prose-slate max-w-none text-[#2C3E35] font-sans prose-headings:font-black prose-p:font-bold prose-p:leading-relaxed prose-strong:font-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* E-E-A-T 팩트 링크 */}
          {post.link && post.link !== "#" && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <span>🔗</span> 공식 출처 및 관할 시행기관 원문
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                본 정보는 관계 법령에 의거하여 배포된 공식 보도자료를 기반으로 수집되었습니다. 
                아래 링크를 통하여 소관 지자체 또는 소관 부처의 공식 접수/안내 페이지로 바로 이동하실 수 있습니다.
              </p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2.5 text-xs font-black rounded-lg bg-slate-900 hover:bg-black text-white transition-all shadow-sm"
              >
                공식 원문 홈페이지로 가기 →
              </a>
            </div>
          )}

          {/* AI 생성 안내 */}
          <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50 text-[#3F37C9] text-xs sm:text-sm font-extrabold leading-relaxed">
            📢 이 글은 공공데이터포털(data.go.kr)의 정보를 바탕으로 AI가 작성하였습니다. 정확한 내용은 원문 링크를 통해 확인해주세요.
          </div>

          {/* AdSense 광고 배너 삽입 */}
          <AdBanner />

          {/* Coupang 파트너스 배너 삽입 */}
          <CoupangBanner />

          {/* 하단 태그 및 목록 버튼 */}
          <div className="pt-8 border-t border-slate-100 space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-bold bg-slate-50 text-slate-400 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="inline-block px-6 py-3.5 text-sm font-extrabold rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
              >
                ← 목록으로 돌아가기
              </Link>
            </div>
          </div>

        </article>
      </main>
    </div>
  );
}
