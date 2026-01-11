import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imposter Word Game - Ultimate Party Deduction Game",
  description: "Play the best social deduction word game with your friends. Find the imposter, guess the word, and win the game!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased selection:bg-primary/30")}>
        <div className="relative flex min-h-screen flex-col">
          {/* Global Background Decorations */}
          <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
            <div className="absolute inset-0 bg-grid-white opacity-[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-primary/5" />
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
          </div>
          
          <Header />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
