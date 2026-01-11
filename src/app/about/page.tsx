import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Heart, Mail, Github, Twitter, Globe, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - The Team Behind Imposter Word Game",
  description: "Learn more about ImposterGame.fun. Our mission is to provide the best free online party games for friends and families to enjoy anywhere.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="space-y-4 mb-20 text-center">
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20">Our Story</Badge>
        <h1 className="text-5xl font-black tracking-tighter">About ImposterGame.fun</h1>
        <p className="text-xl text-muted-foreground">Built by game lovers, for the party animal in everyone.</p>
      </div>

      <div className="grid gap-16">
        {/* Mission */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">The Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We started <span className="text-foreground font-bold">ImposterGame.fun</span> with a simple goal: to make group gatherings more exciting without the need for physical board games or complicated setups. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform is designed to be accessible on any device, ensuring that as long as one person has a phone, the party is on.
            </p>
          </div>
          <div className="flex-1 w-full max-w-[320px]">
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center p-1 shadow-2xl shadow-primary/20">
              <div className="w-full h-full rounded-[2.8rem] bg-background flex items-center justify-center">
                <Gamepad2 className="w-24 h-24 text-primary animate-bounce duration-3000" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why ImposterGame.fun?</h2>
            <p className="text-muted-foreground">We focus on the things that matter most for a great party experience.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Heart className="w-6 h-6" />, title: "Free Forever", desc: "No hidden costs, no subscriptions. Just pure fun." },
              { icon: <Globe className="w-6 h-6" />, title: "No Downloads", desc: "Play directly in your browser. Zero storage needed." },
              { icon: <Users className="w-6 h-6" />, title: "Family Friendly", desc: "Curated content that is safe for players of all ages." }
            ].map((item, i) => (
              <Card key={i} className="bg-card/40 backdrop-blur-sm border-white/5 p-6 space-y-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact / Social */}
        <section className="text-center py-20 rounded-[4rem] bg-muted/20 border border-white/5 space-y-8">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a suggestion for a new game mode? Found a bug? Or just want to say hi? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link href="mailto:hello@impostergame.fun" className="flex items-center gap-2 p-3 px-6 rounded-2xl border border-white/5 bg-background hover:bg-muted transition-colors font-medium">
              <Mail className="w-5 h-5 text-primary" />
              Email Us
            </Link>
            <Link href="#" className="flex items-center gap-2 p-3 px-6 rounded-2xl border border-white/5 bg-background hover:bg-muted transition-colors font-medium">
              <Twitter className="w-5 h-5 text-sky-400" />
              Twitter
            </Link>
            <Link href="#" className="flex items-center gap-2 p-3 px-6 rounded-2xl border border-white/5 bg-background hover:bg-muted transition-colors font-medium">
              <Github className="w-5 h-5" />
              GitHub
            </Link>
          </div>
        </section>
      </div>

      <footer className="mt-32 pt-12 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>Built with ❤️ by the ImposterGame.fun team.</p>
      </footer>
    </div>
  );
}
