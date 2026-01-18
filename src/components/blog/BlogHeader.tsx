import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="space-y-6 pb-8 border-b border-border/40">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="default" className="text-sm px-3 py-1">
          {post.category}
        </Badge>
        {post.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
        {post.title}
      </h1>

      <p className="text-xl text-muted-foreground leading-relaxed">
        {post.description}
      </p>

      <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
        <span className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {post.author}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {post.readingTime}
        </span>
      </div>
    </header>
  );
}
