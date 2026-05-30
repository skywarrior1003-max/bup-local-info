import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

// 정적 호스팅 환경에서 동적 경로 자동 비활성화
export const dynamicParams = false;

// 1. 빌드(static export) 시 모든 블로그 글 경로를 미리 정의
export async function generateStaticParams() {
  try {
    const posts = getAllPosts();
    // 만약 작성된 글이 없으면 빌드 오류 방지를 위해 임시 플레이스홀더 경로 리턴
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] font-sans antialiased pb-20">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <Link href="/blog" className="flex items-center gap-2">
            <span className="text-sm font-black tracking-widest text-[#4F46E5] uppercase">
              ← BUP LOCAL · BLOG
            </span>
          </Link>
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
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-extrabold">
              <span>🗓️ {post.date}</span>
              <span>•</span>
              <span>카테고리: {post.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-bold leading-relaxed pt-2">
              {post.summary}
            </p>
          </div>

          {/* 마크다운 본문 영역 (Tailwind Typography prose 클래스로 초고화질 매끄러운 디자인) */}
          <div className="prose prose-slate max-w-none text-[#2C3E35] font-sans prose-headings:font-black prose-p:font-bold prose-p:leading-relaxed prose-strong:font-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

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
