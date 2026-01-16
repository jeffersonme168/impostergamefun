import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle, Smartphone, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Imposter Word Game",
  description: "Find answers to common questions about the Imposter Word Game. Learn about player limits, game modes, and how to play with friends.",
};

const faqs = [
  {
    question: "How many people can play Imposter Word Game?",
    answer: "The game is best played with 4 to 12 players. More players make the deduction more challenging and fun!",
    icon: <Users className="w-5 h-5 text-primary" />
  },
  {
    question: "Do we all need to download an app?",
    answer: "No! Only one person needs to open ImposterGame.fun on their smartphone. You pass the phone around to see your secret words.",
    icon: <Smartphone className="w-5 h-5 text-primary" />
  },
  {
    question: "Is the game free to play?",
    answer: "Yes, Imposter Word Game is 100% free to play online. No registration or payment is required.",
    icon: <Badge variant="outline" className="text-[10px] uppercase">Free</Badge>
  },
  {
    question: "What are the different game modes?",
    answer: "We offer Classic (standard deduction), Undercover (similar words for different groups), and Mr. White (one player has no word at all).",
    icon: <MessageCircle className="w-5 h-5 text-primary" />
  },
  {
    question: "Can I play this game over Zoom or Discord?",
    answer: "Yes! While the 'pass the phone' method is best for in-person parties, you can play remotely by having the host message each player their secret word.",
    icon: <HelpCircle className="w-5 h-5 text-primary" />
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <div className="space-y-4 mb-16 text-center">
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20">Support</Badge>
        <h1 className="text-5xl font-black tracking-tighter">FAQ</h1>
        <p className="text-xl text-muted-foreground">Common questions about the Imposter Word Game.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                {faq.icon}
              </div>
              <h3 className="text-lg font-bold">{faq.question}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-11">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-[3rem] bg-muted/20 border border-white/5 text-center space-y-6">
        <h2 className="text-2xl font-bold">Still have questions?</h2>
        <p className="text-muted-foreground">We're here to help you get the party started.</p>
        <div className="flex justify-center">
          <a href="mailto:hello@impostergame.fun" className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
