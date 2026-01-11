"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function IdentityReveal() {
  const { players, currentRevealIndex, nextReveal } = useGameStore();
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = players[currentRevealIndex];

  if (!currentPlayer) return null;

  const handleNext = () => {
    setIsRevealed(false);
    nextReveal();
  };

  const isSpecialRole = currentPlayer.role !== 'civilian';

  return (
    <div className="space-y-10 w-full max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest animate-pulse">
          <Sparkles className="w-3 h-3" />
          Identity Check
        </div>
        <h2 className="text-4xl font-black tracking-tighter">
          Player <span className="text-primary">{currentPlayer.id}</span>
        </h2>
        <p className="text-muted-foreground font-medium">Please pass the device to Player {currentPlayer.id}</p>
      </div>

      <div className="relative h-[480px] perspective-1000">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hidden"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
              className="w-full h-full cursor-pointer group"
              onClick={() => setIsRevealed(true)}
            >
              <Card className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-primary/30 bg-card/40 backdrop-blur-xl hover:border-primary/60 hover:bg-card/60 transition-all duration-500 rounded-[3rem] shadow-2xl relative overflow-hidden">
                {/* Decorative background for the back of the card */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0,transparent_100%)]" />
                
                <div className="relative p-8 rounded-full bg-primary/10 mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                  <User className="w-20 h-20 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight relative">Tap to Reveal</CardTitle>
                <p className="text-sm text-muted-foreground mt-3 relative font-medium">Only you should see this!</p>
                <div className="mt-12 opacity-30 group-hover:opacity-60 transition-opacity">
                  <EyeOff className="w-8 h-8" />
                </div>
                
                {/* Glowing corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-[50px] -ml-16 -mb-16" />
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
              className="w-full h-full"
            >
              <Card className={cn(
                "w-full h-full flex flex-col items-center justify-center border-2 rounded-[3rem] shadow-2xl relative overflow-hidden transition-colors duration-500",
                isSpecialRole 
                  ? "border-rose-500/50 bg-rose-500/5 shadow-rose-500/10" 
                  : "border-primary/50 bg-primary/5 shadow-primary/10"
              )}>
                {/* Dynamic background glow based on role */}
                <div className={cn(
                  "absolute inset-0 opacity-10",
                  isSpecialRole ? "bg-rose-500" : "bg-primary"
                )} />

                <div className={cn(
                  "p-8 rounded-full mb-8 shadow-2xl transition-transform duration-700 hover:scale-105",
                  isSpecialRole ? "bg-rose-500 text-white" : "bg-primary text-white"
                )}>
                  <Eye className="w-20 h-20" />
                </div>
                
                <div className="text-center space-y-6 relative z-10 px-6">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50">Your Secret Word</p>
                    <h3 className={cn(
                      "text-6xl font-black tracking-tighter break-words",
                      isSpecialRole ? "text-rose-500" : "text-primary"
                    )}>
                      {currentPlayer.word}
                    </h3>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <Badge variant={currentPlayer.role === 'civilian' ? 'default' : 'destructive'} className="px-6 py-2 text-sm font-bold rounded-xl shadow-lg">
                      {currentPlayer.role.toUpperCase()}
                    </Badge>
                    <p className="text-xs text-muted-foreground font-medium max-w-[200px] leading-relaxed italic">
                      {currentPlayer.role === 'civilian' 
                        ? "Describe your word without revealing it to the Imposter."
                        : "Blend in with the Civilians. Don't let them catch you!"}
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className={cn(
                    "mt-12 group h-14 px-10 rounded-2xl font-bold transition-all",
                    isSpecialRole ? "bg-rose-500 hover:bg-rose-600" : "bg-primary hover:bg-primary/90"
                  )}
                  size="lg"
                >
                  I've Memorized It
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 pt-4">
        {players.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              i === currentRevealIndex ? "w-10 bg-primary shadow-lg shadow-primary/30" : "w-2 bg-muted-foreground/20"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
