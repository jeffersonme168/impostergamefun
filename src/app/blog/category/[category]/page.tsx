import { Metadata } from "next";
import { getPostsByCategory, getAllCategories } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Folder } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = decodeURIComponent(categoryParam);
  
  return {
    title: `${category} - Imposter Game Blog`,
    description: `Browse all articles, guides, and word lists related to ${category}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const category = decodeURIComponent(categoryParam);
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <Badge variant="default" className="px-4 py-1.5">
          <Folder className="w-3.5 h-3.5 mr-2" />
          {category}
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
          {category} Articles
        </h1>
        <p className="text-xl text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
