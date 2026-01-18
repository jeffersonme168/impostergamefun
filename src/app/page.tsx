import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Gamepad2, 
  HelpCircle, 
  Star, 
  Globe,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - Two Column */}
        <section className="relative overflow-hidden py-24 md:py-32 px-4 border-b border-border/40">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left Column: Content */}
              <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
                <Badge variant="outline" className="px-4 py-1.5 border-primary/30 text-primary bg-primary/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <Star className="w-3.5 h-3.5 mr-2 fill-primary" />
                  #1 Party Word Game Generator
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  Unmask the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">Imposter</span> in Your Group
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                  Play the <span className="text-foreground font-semibold">Imposter Word Game</span> online for free. A thrilling social deduction game for 4-12 players. Test your bluffing, intuition, and description skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                  <Button size="lg" className="text-lg px-10 py-7 font-bold h-auto shadow-2xl shadow-primary/30 rounded-2xl group" asChild>
                    <Link href="/game">
                      Start Game Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7 font-bold h-auto border-2 rounded-2xl backdrop-blur-sm" asChild>
                    <Link href="/rules">How to Play</Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Pure Decorative Image */}
              <div className="flex-1 relative w-full max-w-lg lg:max-w-none animate-in fade-in zoom-in duration-1000 delay-500">
                <div className="relative aspect-square rounded-[3rem] border border-white/5 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden group">
                  {/* The Image from the User - Now as a clean decorative element */}
                  <img 
                    src="/unnamed.jpg" 
                    alt="Friends playing Imposter Word Game at a party" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                  />
                  
                  {/* Subtle Vignette for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  
                  {/* Floating badge for a social touch */}
                  <div className="absolute bottom-8 right-8 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold tracking-tight">Join the Fun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats / Features Grid */}
        <section className="py-24 px-4 bg-muted/20 border-b border-border/40">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Best Online Party Game Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Why thousands of players choose ImposterGame.fun for their social gatherings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: <Users className="w-6 h-6" />, 
                  label: "4-12 Players", 
                  title: "Group Party Game",
                  desc: "Perfect for any size of group gathering, from family reunions to office parties."
                },
                { 
                  icon: <Globe className="w-6 h-6" />, 
                  label: "Cross-Platform", 
                  title: "Play Anywhere",
                  desc: "No app download needed. One phone is all you need to start the fun."
                },
                { 
                  icon: <Zap className="w-6 h-6" />, 
                  label: "Fast-Paced", 
                  title: "Instant Setup",
                  desc: "Start a new game in seconds. No registration or login required."
                },
                { 
                  icon: <Gamepad2 className="w-6 h-6" />, 
                  label: "Social Game", 
                  title: "Pure Social Interaction",
                  desc: "Focus on conversation, deduction, and bluffing with your friends."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-sm hover:border-primary/40 transition-all group">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Modes - Glassmorphism Style */}
        <section id="modes" className="py-24 px-4 border-b border-border/40 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0,transparent_100%)] pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 relative">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Three Unique Ways to Play</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Choose the mode that best fits your group's skill level and vibe.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Classic", 
                  badge: "Most Popular", 
                  desc: "Civilians know the secret word, but the Imposter is completely in the dark. Can you blend in or spot the bluff?",
                  difficulty: "Easy",
                  color: "bg-indigo-500"
                },
                { 
                  title: "Undercover", 
                  badge: "Tactical", 
                  desc: "Undercovers get a word slightly different from Civilians (e.g., Apple vs. Pear). The discussion gets tricky!",
                  difficulty: "Medium",
                  color: "bg-amber-500"
                },
                { 
                  title: "Mr. White", 
                  badge: "Extreme", 
                  desc: "Mr. White has no word. If caught, he wins by guessing the Civilians' secret word correctly. High stakes!",
                  difficulty: "Hard",
                  color: "bg-rose-500"
                }
              ].map((mode, i) => (
                <Card key={i} className="bg-card/30 backdrop-blur-xl border-white/5 hover:border-primary/40 transition-all rounded-[2.5rem] overflow-hidden group shadow-2xl">
                  <div className={`h-2 w-full ${mode.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  <CardHeader className="p-10 pb-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary" className="rounded-lg">{mode.difficulty}</Badge>
                      <Star className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-3xl font-black">{mode.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-0 space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{mode.desc}</p>
                    <Button variant="ghost" className="p-0 hover:bg-transparent text-primary font-bold group" asChild>
                      <Link href="/game">
                        Try this mode
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Blog Posts */}
        <section className="py-24 px-4 bg-muted/10 border-b border-border/40">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Latest Guides & Resources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Master the game with our deep-dive strategies and creative word lists
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* This section will show the latest 3 blog posts */}
              {/* Content will be dynamically loaded via server component in production */}
              <div className="text-center text-muted-foreground py-12">
                Blog posts coming soon...
              </div>
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-[0.03] pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 text-center space-y-10 relative">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-tight">
              Ready to unmask the <span className="text-primary italic">Imposter</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start your party in seconds. No account, no download, just fun.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="text-xl px-12 py-8 font-black h-auto shadow-2xl shadow-primary/40 rounded-3xl" asChild>
                <Link href="/game">Start New Game</Link>
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <Globe className="w-5 h-5" />
                <span>One phone for all players</span>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
