import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0F172A] font-sans antialiased pb-20">
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
            🤖 AI 블로그 뉴스
          </span>
        </div>
      </header>

      {/* 본문 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-6 mt-12 sm:mt-16 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-1 w-8 bg-[#4F46E5] rounded-full"></span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-[#4F46E5] uppercase">
              AI AUTO JOURNAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            AI 소방·건설 저널
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold">
            구글 제미나이(Gemini AI)가 매일 공공데이터 포털에서 수집한 유용한 소방 및 창업 혜택 소식을 정제하여 발행합니다.
          </p>
        </div>

        {/* 블로그 글 리스트 */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
              <span className="text-4xl block mb-3">📝</span>
              <p className="text-slate-700 text-base sm:text-lg font-bold">아직 발행된 블로그 글이 없습니다.</p>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-1">곧 유익한 정보가 자동으로 업데이트됩니다!</p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_25px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_45px_rgba(79,70,229,0.08)] hover:border-[#4F46E5]/30 p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                      {post.category}
                    </span>
                    <span>🗓️ {post.date}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#4F46E5] transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-[#374151] text-sm sm:text-base font-bold leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
