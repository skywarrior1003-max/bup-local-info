import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  link: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

function formatDate(dateVal: any): string {
  if (!dateVal) return "";
  if (dateVal instanceof Date) {
    const year = dateVal.getFullYear();
    const month = String(dateVal.getMonth() + 1).padStart(2, "0");
    const day = String(dateVal.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  if (typeof dateVal === "string") {
    return dateVal.split("T")[0];
  }
  return String(dateVal);
}

export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || "제목 없음",
          date: formatDate(data.date),
          summary: data.summary || "",
          category: data.category || "일반",
          tags: Array.isArray(data.tags) ? data.tags : [],
          link: data.link || "#",
          content,
        };
      });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("포스트 가져오기 에러:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "제목 없음",
      date: formatDate(data.date),
      summary: data.summary || "",
      category: data.category || "일반",
      tags: Array.isArray(data.tags) ? data.tags : [],
      link: data.link || "#",
      content,
    };
  } catch (error) {
    console.error(`포스트 조회 에러 (${slug}):`, error);
    return null;
  }
}
