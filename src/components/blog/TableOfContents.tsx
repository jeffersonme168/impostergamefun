"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 解析 Markdown 标题
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));

    const idCounts: Record<string, number> = {};
    const tocItems: TocItem[] = matches.map((match) => {
      const level = match[1].length;
      const text = match[2].trim();
      let id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      // Handle duplicate IDs
      if (idCounts[id] !== undefined) {
        idCounts[id]++;
        id = `${id}-${idCounts[id]}`;
      } else {
        idCounts[id] = 0;
      }

      return { id, text, level };
    });

    setHeadings(tocItems);

    // 监听滚动，更新活动标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    // 观察所有标题元素
    const headingElements = document.querySelectorAll("h2, h3");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-24 space-y-3">
      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
        On this page
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={cn(
              heading.level === 3 && "pl-4",
              "transition-colors"
            )}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 hover:text-primary transition-colors",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
