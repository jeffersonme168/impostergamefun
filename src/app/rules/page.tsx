import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Sword, Trophy, Lightbulb, AlertTriangle } from "lucide-react";

export default function RulesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="space-y-4 mb-16 text-center">
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20">Official Guide</Badge>
        <h1 className="text-5xl font-black tracking-tighter">How to Play</h1>
        <p className="text-xl text-muted-foreground">Everything you need to know to start your first game.</p>
      </div>

      <div className="space-y-12">
        {/* Basic Concept */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">The Goal</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Imposter is a social deduction game. The goal of the <span className="text-foreground font-bold">Civilians</span> is to find and eliminate the <span className="text-primary font-bold">Imposter</span>. The goal of the Imposter is to survive until the end or guess the secret word.
          </p>
        </section>

        {/* Roles */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Roles & Powers</h2>
          </div>
          <div className="grid gap-6">
            <Card className="bg-card/40 backdrop-blur-sm border-white/5">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Civilian</CardTitle>
                  <Badge>Majority</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"I know the word, and I'm describing it carefully."</p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-sm opacity-80">
                  <li>Sees the secret word clearly.</li>
                  <li>Must describe the word without making it too obvious for the Imposter.</li>
                  <li>Wins if all Imposters are eliminated.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-primary/20 ring-1 ring-primary/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-primary">Imposter</CardTitle>
                  <Badge variant="destructive">Bluffer</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"I have no idea what the word is, but I'll pretend I do."</p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-sm opacity-80">
                  <li>Does NOT see the secret word.</li>
                  <li>Must listen to others and give a convincing description to blend in.</li>
                  <li>Wins if they survive or if only 2 players remain.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-amber-500/20 ring-1 ring-amber-500/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-amber-500">Undercover</CardTitle>
                  <Badge variant="outline" className="text-amber-500 border-amber-500/20">Tactician</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"My word is similar, but not quite the same..."</p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-sm opacity-80">
                  <li>Sees a word very similar to the Civilian's word (e.g., Apple vs Pear).</li>
                  <li>Must find out who else has the same word or eliminate the other group.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step-by-Step */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sword className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Game Flow</h2>
          </div>
          <div className="space-y-8">
            {[
              { 
                step: "01", 
                title: "Role Reveal", 
                desc: "One phone is passed around. Each player taps to see their word and role. Total secrecy is required!" 
              },
              { 
                step: "02", 
                title: "The Description Circle", 
                desc: "A random player starts. Each person gives a ONE-SENTENCE description of their word. No repeats of previous descriptions allowed!" 
              },
              { 
                step: "03", 
                title: "Interrogation & Debate", 
                desc: "Everyone discusses who seems suspicious. Why was their description so vague? Why did they sound like they were copying you?" 
              },
              { 
                step: "04", 
                title: "The Vote", 
                desc: "On the count of three, everyone points at the person they suspect most. The person with the most votes is eliminated." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-4xl font-black text-primary/10 tabular-nums">{item.step}</span>
                <div className="pt-2">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Victory Conditions */}
        <section className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">How to Win</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-bold text-lg">Civilians Win If...</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• All Imposters are identified and eliminated.</li>
                <li>• Mr. White (if playing) fails to guess the word after being caught.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-lg">Imposters Win If...</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• They survive until only 2 players remain.</li>
                <li>• They successfully guess the secret word (in specific modes).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold">Pro Tips</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-white/5 bg-muted/30">
              <h5 className="font-bold mb-2 text-primary">For Civilians</h5>
              <p className="text-sm text-muted-foreground italic text-pretty">
                "Be specific enough to prove you know the word, but vague enough so the Imposter can't guess it."
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-muted/30">
              <h5 className="font-bold mb-2 text-primary">For Imposters</h5>
              <p className="text-sm text-muted-foreground italic text-pretty">
                "Echo others' sentiment without copying their words. If you're going first, pick a broad category description."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
