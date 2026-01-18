import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Filter } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Imposter Word Game Guides and Word Lists",
  description: "Explore complete guides, word list resources, party strategies, and creative gameplay ideas for the Imposter Word Game. Your essential guide to becoming a party game pro.",
  keywords: "imposter game guide, word lists, party game tips, undercover strategy",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20">
          <BookOpen className="w-3.5 h-3.5 mr-2" />
          Game Resource Center
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
          Blog Posts
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Deep dives into strategies, creative word lists, and party tips
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-12 flex items-center gap-4 flex-wrap justify-center">
          <span className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <Filter className="w-4 h-4" />
            Filter by Category:
          </span>
          <Link href="/blog">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              All
            </Badge>
          </Link>
          {categories.map((category) => (
            <Link key={category} href={`/blog/category/${encodeURIComponent(category)}`}>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Blog Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No posts yet, stay tuned...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-20 p-12 rounded-[3rem] border border-white/5 bg-card/40 backdrop-blur-xl text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Ready to play?</h2>
        <p className="text-muted-foreground">
          Now that you've learned the strategies, it's time to put them into practice!
        </p>
        <Link
          href="/game"
          className="inline-block px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
        >
          Start Game Now
        </Link>
      </div>
    </div>
  );
}
