import { MDXRemote } from "next-mdx-remote/rsc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Info, AlertCircle, Lightbulb } from "lucide-react";

// 辅助函数：安全地生成 ID
function generateId(children: any): string {
  if (!children) return '';
  
  const getText = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join('');
    if (node.props && node.props.children) return getText(node.props.children);
    return '';
  };

  return getText(children)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// MDX组件映射
const components = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-black tracking-tighter mt-12 mb-6 scroll-mt-24" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 
      className="text-3xl font-bold tracking-tight mt-10 mb-4 scroll-mt-24" 
      id={generateId(children)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 
      className="text-2xl font-bold mt-8 mb-3 scroll-mt-24" 
      id={generateId(children)}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-muted-foreground leading-relaxed my-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside space-y-2 my-4 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside space-y-2 my-4 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code 
      className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary" 
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre 
      className="bg-muted p-4 rounded-xl overflow-x-auto my-6 border border-white/5" 
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }: any) => {
    const isExternal = href?.startsWith('http');
    return (
      <Link 
        href={href || "#"} 
        className="text-primary hover:underline font-medium" 
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-2xl my-8 w-full border border-white/5" 
      loading="lazy"
      {...props}
    />
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border rounded-lg" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-bold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-border px-4 py-2 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
  // 自定义组件
  InfoBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 bg-blue-500/5 border-blue-500/20">
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <Info className="w-5 h-5 text-blue-500" />
        {title && <CardTitle className="text-lg">{title}</CardTitle>}
      </CardHeader>
      {children && <CardContent className="text-sm">{children}</CardContent>}
    </Card>
  ),
  WarningBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 bg-amber-500/5 border-amber-500/20">
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <AlertCircle className="w-5 h-5 text-amber-500" />
        {title && <CardTitle className="text-lg">{title}</CardTitle>}
      </CardHeader>
      {children && <CardContent className="text-sm">{children}</CardContent>}
    </Card>
  ),
  TipBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 bg-green-500/5 border-green-500/20">
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <Lightbulb className="w-5 h-5 text-green-500" />
        {title && <CardTitle className="text-lg">{title}</CardTitle>}
      </CardHeader>
      {children && <CardContent className="text-sm">{children}</CardContent>}
    </Card>
  ),
  CTAButton: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <div className="my-8 text-center">
      <Button size="lg" className="text-lg px-10 py-6 font-bold" asChild>
        <Link href={href}>{children}</Link>
      </Button>
    </div>
  ),
};

interface MDXContentProps {
  source: string;
}

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
