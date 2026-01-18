import { Metadata } from "next";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { MDXContent } from "@/components/blog/MDXContent";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = "https://impostergame.fun";
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${post.title} - Imposter Game Blog`,
    description: post.description,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "ImposterGame.fun",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);
  const postUrl = `https://impostergame.fun/blog/${slug}`;

  // Generate structured data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image || "",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ImposterGame.fun",
      logo: {
        "@type": "ImageObject",
        url: "https://impostergame.fun/favicon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      {/* JSON-LD structure */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Main Content with Sidebar */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 max-w-6xl mx-auto">
            {/* Article Content */}
            <article className="min-w-0">
              <BlogHeader post={post} />

              {/* Share Buttons - Top */}
              <div className="my-8 py-6 border-y border-border/40">
                <ShareButtons
                  title={post.title}
                  description={post.description}
                  url={postUrl}
                />
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none mt-12">
                <MDXContent source={post.content} />
              </div>

              {/* Share Buttons - Bottom */}
              <div className="mt-16 pt-8 border-t border-border/40">
                <ShareButtons
                  title={post.title}
                  description={post.description}
                  url={postUrl}
                />
              </div>

              {/* Related Posts */}
              <RelatedPosts posts={relatedPosts} />
            </article>

            {/* Sidebar - Table of Contents */}
            <aside className="hidden xl:block">
              <TableOfContents content={post.content} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
