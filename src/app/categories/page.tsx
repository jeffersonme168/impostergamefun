import { CLASSIC_WORDS, UNDERCOVER_PAIRS, CATEGORIES } from "@/data/word-bank";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Utensils, Dog, Film, MapPin, Package, UserPlus, Trophy, Star, Briefcase, Globe, Music2, ShoppingBag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Categories - Imposter Word Game Word Lists",
  description: "Explore a variety of word categories for the Imposter Word Game. From food and animals to movies and custom lists, find the perfect theme for your party.",
};

const CATEGORY_ICONS: Record<string, any> = {
  Food: <Utensils className="w-5 h-5" />,
  Animals: <Dog className="w-5 h-5" />,
  Movies: <Film className="w-5 h-5" />,
  Places: <MapPin className="w-5 h-5" />,
  Objects: <Package className="w-5 h-5" />,
  Sports: <Trophy className="w-5 h-5" />,
  Celebrities: <Star className="w-5 h-5" />,
  Brands: <ShoppingBag className="w-5 h-5" />,
  Professions: <Briefcase className="w-5 h-5" />,
  Countries: <Globe className="w-5 h-5" />,
  Music: <Music2 className="w-5 h-5" />,
  Custom: <UserPlus className="w-5 h-5" />,
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto space-y-4 mb-16 text-center">
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20">Word Engine</Badge>
        <h1 className="text-5xl font-black tracking-tighter">Word Categories</h1>
        <p className="text-xl text-muted-foreground">Browse through our curated lists of words designed for maximum fun and challenge.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(CATEGORIES).map(([key, label]) => {
          if (key === 'CUSTOM') return null;
          const words = CLASSIC_WORDS[key as keyof typeof CLASSIC_WORDS] || [];
          const pairs = UNDERCOVER_PAIRS[key as keyof typeof UNDERCOVER_PAIRS] || [];

          return (
            <Card key={key} className="bg-card/40 backdrop-blur-sm border-white/5 hover:border-primary/20 transition-all group overflow-hidden">
              <div className="h-1.5 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {CATEGORY_ICONS[label]}
                </div>
                <CardTitle className="text-2xl font-bold">{label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Classic Words ({words.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {words.slice(0, 8).map((word, i) => (
                      <Badge key={i} variant="secondary" className="bg-muted/50 font-medium">
                        {word}
                      </Badge>
                    ))}
                    {words.length > 8 && (
                      <Badge variant="outline" className="opacity-50">+{words.length - 8} more</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Undercover Pairs ({pairs.length})
                  </p>
                  <div className="space-y-2">
                    {pairs.slice(0, 3).map((pair, i) => (
                      <div key={i} className="text-sm flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-white/5">
                        <span className="text-foreground/80 font-medium">{pair.word1}</span>
                        <span className="text-muted-foreground text-xs italic">vs</span>
                        <span className="text-amber-500/80 font-medium">{pair.word2}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Custom Category Card */}
        <Card className="bg-primary/5 border-primary/20 ring-1 ring-primary/10 transition-all group overflow-hidden">
          <div className="h-1.5 w-full bg-primary" />
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <UserPlus className="w-5 h-5" />
            </div>
            <CardTitle className="text-2xl font-bold">Custom</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Want to use your own inside jokes or specific themes? Create your own word pairs instantly!
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span> Personalized Experience
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span> Support Any Language
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span> Infinite Possibilities
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-20 p-12 rounded-[3rem] border border-white/5 bg-card/40 backdrop-blur-xl text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Missing a category?</h2>
        <p className="text-muted-foreground">We are constantly updating our word bank. If you have suggestions for themes or word pairs, feel free to reach out to us!</p>
        <Badge variant="outline" className="px-6 py-2 text-lg rounded-full">New Categories Coming Soon</Badge>
      </div>
    </div>
  );
}
