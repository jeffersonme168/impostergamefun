import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://impostergame.fun"),
  alternates: {
    canonical: "/",
  },
  title: "Imposter Word Game Online - Free Social Deduction Party Game",
  description: "Play the Imposter Word Game online for free! A fun social deduction party game for 4-12 players. Find the imposter, guess the secret word, and enjoy with friends.",
  keywords: "imposter word game, who is the imposter, social deduction game, online party games, free group games, word deduction game, party game generator",
  authors: [{ name: "ImposterGame.fun" }],
  icons: {
    icon: "https://cloudflareimg.top/impostergamegenerator/favicon.png",
    apple: "https://cloudflareimg.top/impostergamegenerator/favicon.png",
  },
  openGraph: {
    title: "Imposter Word Game Online - Free Party Game",
    description: "The best free social deduction word game for your next party. Play with 4-12 friends instantly.",
    url: "https://impostergame.fun",
    siteName: "ImposterGame.fun",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imposter Word Game Online",
    description: "Unmask the imposter in your group with this thrilling social word game!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" translate="no">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R1EVRMRNL0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R1EVRMRNL0');
          `}
        </Script>
      </head>
      <body 
        className={cn(inter.className, "min-h-screen bg-background antialiased selection:bg-primary/30")}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          {/* Global Background Decorations */}
          <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
            <div className="absolute inset-0 bg-grid-white opacity-[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-primary/5" />
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
          </div>
          
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
