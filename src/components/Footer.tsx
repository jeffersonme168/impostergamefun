import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-16 bg-muted/10 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <div className="bg-primary p-1.5 rounded-lg">
                <img 
                  src="https://cloudflareimg.top/impostergamegenerator/favicon.png" 
                  alt="Imposter Game Icon" 
                  className="w-6 h-6"
                />
              </div>
              <span className="tracking-tighter">ImposterGame.fun</span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              The ultimate social deduction word game for parties and gatherings. 100% free and mobile-friendly.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-12 sm:gap-24 md:gap-32">
            <div className="flex flex-col gap-5">
              <h3 className="font-bold uppercase text-xs tracking-widest text-primary">Game</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground items-start">
                <Link href="/game" className="hover:text-primary transition-colors">Start Playing</Link>
                <Link href="/#modes" className="hover:text-primary transition-colors">Modes</Link>
                <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="font-bold uppercase text-xs tracking-widest text-primary">Resources</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground items-start">
                <Link href="/rules" className="hover:text-primary transition-colors">How to Play</Link>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="font-bold uppercase text-xs tracking-widest text-primary">Legal</h3>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground items-start">
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 ImposterGame.fun. Built for fun.</p>
          <div className="flex gap-8">
            <Link href="mailto:hello@impostergame.fun" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
