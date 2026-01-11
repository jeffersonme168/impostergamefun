"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IdentityReveal() {
  const { players, currentRevealIndex, nextReveal } = useGameStore();
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = players[currentRevealIndex];

  if (!currentPlayer) return null;

  const handleNext = () => {
    setIsRevealed(false);
    nextReveal();
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="text-primary border-primary/20">
          Step 1: Check Identity
        </Badge>
        <h2 className="text-3xl font-black tracking-tight">
          Player <span className="text-primary">{currentPlayer.id}</span>
        </h2>
        <p className="text-muted-foreground">Pass the phone to Player {currentPlayer.id}</p>
      </div>

      <div className="relative h-[400px] perspective-1000">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hidden"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full h-full cursor-pointer"
              onClick={() => setIsRevealed(true)}
            >
              <Card className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed bg-card/30 hover:bg-card/50 transition-colors">
                <div className="p-6 rounded-full bg-primary/10 mb-6">
                  <User className="w-16 h-16 text-primary" />
                </div>
                <CardTitle className="text-xl">Tap to Reveal</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Only you should see this!</p>
                <EyeOff className="w-6 h-6 mt-8 opacity-20" />
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full h-full"
            >
              <Card className="w-full h-full flex flex-col items-center justify-center border-2 border-primary bg-primary/5">
                <div className="p-6 rounded-full bg-primary mb-6 text-primary-foreground shadow-xl shadow-primary/20">
                  <Eye className="w-16 h-16" />
                </div>
                <div className="text-center space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-widest opacity-60">Your Secret Word</p>
                  <h3 className={`text-5xl font-black ${
                    currentPlayer.role !== 'civilian' ? 'text-accent' : 'text-primary'
                  }`}>
                    {currentPlayer.word}
                  </h3>
                  <Badge variant={currentPlayer.role === 'civilian' ? 'default' : 'destructive'} className="mt-4 px-4 py-1">
                    {currentPlayer.role.toUpperCase()}
                  </Badge>
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="mt-12 group"
                  size="lg"
                >
                  Confirm & Next
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-1">
        {players.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentRevealIndex ? 'w-8 bg-primary' : 'w-2 bg-muted'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}
