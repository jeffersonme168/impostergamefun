import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime: string;
}

// 确保内容目录存在
function ensureContentDirectory() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

// 获取所有博客文章元数据
export function getAllPosts(): BlogPostMeta[] {
  ensureContentDirectory();

  const files = fs.readdirSync(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = mdxFiles
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const filePath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        author: data.author || "ImposterGame.fun",
        category: data.category || "General",
        tags: data.tags || [],
        image: data.image,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// 根据slug获取单篇文章
export function getPostBySlug(slug: string): BlogPost | null {
  ensureContentDirectory();

  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    let fileContents: string;

    if (fs.existsSync(filePath)) {
      fileContents = fs.readFileSync(filePath, "utf8");
    } else {
      const mdPath = path.join(contentDirectory, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, "utf8");
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "ImposterGame.fun",
      category: data.category || "General",
      tags: data.tags || [],
      image: data.image,
      readingTime: readingTime(content).text,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// 获取所有分类
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

// 根据标签获取文章
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

// 获取相关文章（基于标签和分类匹配）
export function getRelatedPosts(slug: string, limit: number = 3): BlogPostMeta[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter((post) => post.slug !== slug);

  // 计算相关度分数
  const postsWithScore = allPosts.map((post) => {
    let score = 0;

    // 同分类加分
    if (post.category === currentPost.category) {
      score += 10;
    }

    // 共同标签加分
    const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
    score += commonTags.length * 5;

    return { post, score };
  });

  // 按分数排序并返回前N篇
  return postsWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

// 获取最新文章
export function getLatestPosts(limit: number = 3): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.slice(0, limit);
}
