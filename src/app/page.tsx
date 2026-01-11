import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Gamepad2, 
  HelpCircle, 
  Star, 
  ShieldCheck,
  Globe,
  Zap
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="tracking-tight">ImposterGame.fun</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#rules" className="hover:text-primary transition-colors">How to Play</Link>
            <Link href="#modes" className="hover:text-primary transition-colors">Modes</Link>
            <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/game">Start Playing</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center space-y-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container max-w-4xl mx-auto space-y-4">
            <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary">
              The Ultimate Social Deduction Game
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
              Unmask the Imposter with Your <span className="text-primary">Words</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A thrilling party game for 4-12 players. Test your intuition, description skills, and deduction in the most addictive social game online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/game">Play for Free Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="#rules">Learn the Rules</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Why Play Imposter Game?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple to start, impossible to put down. Perfect for family gatherings, parties, and office team building.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Users className="w-10 h-10 text-primary" />, 
                  title: "4-12 Players", 
                  desc: "Scale the fun from small groups to large parties seamlessly." 
                },
                { 
                  icon: <Globe className="w-10 h-10 text-primary" />, 
                  title: "Play Anywhere", 
                  desc: "Fully mobile-responsive. No downloads or registration required." 
                },
                { 
                  icon: <Zap className="w-10 h-10 text-primary" />, 
                  title: "Fast Rounds", 
                  desc: "Quick 5-10 minute games that keep everyone engaged." 
                }
              ].map((feature, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur border-none shadow-lg">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Game Modes Section */}
        <section id="modes" className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Exciting Game Modes</h2>
              <p className="text-muted-foreground">Choose the way you want to play.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Classic", 
                  badge: "Most Popular", 
                  desc: "Civilians know the word, Imposters don't. Can you bluff your way through?",
                  difficulty: "Easy"
                },
                { 
                  title: "Undercover", 
                  badge: "Tactical", 
                  desc: "Two very similar words are given. Civilians vs Undercovers. Discussion gets intense!",
                  difficulty: "Medium"
                },
                { 
                  title: "Mr. White", 
                  badge: "Extreme", 
                  desc: "Mr. White has no word at all. He must guess the word after being caught to win!",
                  difficulty: "Hard"
                }
              ].map((mode, i) => (
                <div key={i} className="relative group p-8 rounded-2xl border bg-card hover:border-primary/50 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{mode.title}</h3>
                    <Badge variant="secondary">{mode.difficulty}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">{mode.desc}</p>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className="w-6 h-6 text-primary fill-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section id="rules" className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">How to Play</h2>
            <div className="space-y-12">
              {[
                { 
                  step: "01", 
                  title: "Setup & Roles", 
                  desc: "Choose your players and game mode. Each player takes turns checking their secret role and word on the screen. Keep it secret!" 
                },
                { 
                  step: "02", 
                  title: "The Description", 
                  desc: "Starting with a random player, everyone gives a one-word or one-sentence description of their word. Don't be too vague, but don't be too obvious!" 
                },
                { 
                  step: "03", 
                  title: "The Discussion", 
                  desc: "After the round, discuss who seems suspicious. Is their description slightly 'off'? Are they trying too hard to blend in?" 
                },
                { 
                  step: "04", 
                  title: "Voting & Winning", 
                  desc: "Vote for the most suspicious player. If the Imposter is eliminated, Civilians win! If Imposters survive or guess the word, they win!" 
                }
              ].map((rule, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-4xl font-black text-primary/20">{rule.step}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{rule.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container px-4 mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 flex items-center justify-center gap-2">
              <HelpCircle className="w-8 h-8 text-primary" /> FAQ
            </h2>
            <div className="space-y-6">
              {[
                { q: "Is it really free?", a: "Yes, ImposterGame.fun is 100% free and requires no registration." },
                { q: "How many people can play?", a: "We recommend 4 to 12 players for the best experience." },
                { q: "Can I play on my phone?", a: "Absolutely! The game is designed for mobile browsers. Just one phone is enough for the whole group!" },
                { q: "Are the words family-friendly?", a: "Yes, our default word bank is curated to be safe for all ages." }
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-lg border bg-card">
                  <h4 className="font-bold mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t bg-primary text-primary-foreground">
          <div className="container px-4 mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">Ready to find the Imposter?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Start your party now. It only takes 30 seconds to set up a game.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-12" asChild>
              <Link href="/game">Start Game Now</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Gamepad2 className="w-6 h-6 text-primary" />
            <span>ImposterGame.fun</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 ImposterGame.fun. The ultimate social party game.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
