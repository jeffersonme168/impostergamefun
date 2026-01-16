"use client";

import { useGameStore } from "@/lib/store";
import { GameSetup } from "@/components/game/GameSetup";
import { IdentityReveal } from "@/components/game/IdentityReveal";
import { GamePlay } from "@/components/game/GamePlay";
import { GameResult } from "@/components/game/GameResult";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function GameClient() {
  const { phase, resetGame } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Reset game state when entering the game page
    // Ensures fresh start when navigating from home
    resetGame();
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Game Header */}
      <header className="p-4 border-b flex items-center justify-between bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild onClick={resetGame}>
            <Link href="/">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="font-bold text-lg tracking-tight">Imposter Game</h1>
        </div>
        <div className="flex items-center gap-2">
          {phase !== 'setup' && (
            <Button variant="outline" size="sm" onClick={resetGame}>
              Quit
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <GameSetup />
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full"
            >
              <IdentityReveal />
            </motion.div>
          )}

          {phase === 'gameplay' && (
            <motion.div
              key="gameplay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GamePlay />
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GameResult />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
