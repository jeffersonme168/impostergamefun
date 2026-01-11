"use client";

import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Trophy, Home, RotateCcw, PartyPopper, Frown, Users, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function GameResult() {
  const { winner, players, resetGame, startGame, scores } = useGameStore();

  const isCivilianWin = winner === 'civilians';

  return (
    <div className="space-y-12 w-full max-w-lg mx-auto py-8">
      {/* Animated Header */}
      <div className="text-center space-y-6 relative">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="inline-block relative"
        >
          {isCivilianWin ? (
            <div className="p-8 rounded-[2.5rem] bg-primary shadow-[0_0_50px_rgba(99,102,241,0.4)] text-white">
              <Trophy className="w-20 h-20" />
            </div>
          ) : (
            <div className="p-8 rounded-[2.5rem] bg-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)] text-white">
              <ShieldAlert className="w-20 h-20" />
            </div>
          )}
          
          {/* Confetti-like elements */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-4 -right-4 p-3 rounded-2xl bg-amber-500 text-white shadow-lg"
          >
            <PartyPopper className="w-6 h-6" />
          </motion.div>
        </motion.div>
        
        <div className="space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-black uppercase tracking-tighter"
          >
            {isCivilianWin ? "Civilians Triumphant!" : "Imposters Survived!"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground font-medium"
          >
            {isCivilianWin 
              ? "The mystery has been solved. Excellent deduction!" 
              : "They blended in perfectly. Better luck next time!"}
          </motion.p>
        </div>
      </div>

      {/* Series Summary */}
      <div className="bg-card/30 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 flex items-center justify-around shadow-xl">
        <div className="text-center space-y-1">
          <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Civilians</p>
          <p className="text-4xl font-black text-primary">{scores.civilians}</p>
        </div>
        <div className="h-10 w-px bg-white/5" />
        <div className="text-center space-y-1">
          <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">Imposters</p>
          <p className="text-4xl font-black text-rose-500">{scores.imposters}</p>
        </div>
      </div>

      {/* Roles Card */}
      <Card className="border-white/5 shadow-2xl bg-card/40 backdrop-blur-xl rounded-[3rem] overflow-hidden">
        <CardHeader className="bg-muted/30 py-6 border-b border-white/5">
          <CardTitle className="text-sm font-black uppercase tracking-[0.3em] opacity-40 text-center">Final Roles Revealed</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-4">
          {players.map((player, i) => (
            <motion.div 
              key={player.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={cn(
                "flex items-center justify-between p-5 rounded-2xl border transition-all",
                player.role !== 'civilian' 
                  ? 'bg-rose-500/10 border-rose-500/20 shadow-inner' 
                  : 'bg-background/50 border-white/5'
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm",
                  player.role !== 'civilian' ? 'bg-rose-500 text-white' : 'bg-primary/20 text-primary'
                )}>
                  {player.id}
                </div>
                <div className="space-y-0.5">
                  <span className="font-black text-lg block">{player.word}</span>
                  <p className="text-[10px] font-bold uppercase opacity-30 tracking-widest">{player.role}</p>
                </div>
              </div>
              {player.role !== 'civilian' && (
                <div className="p-2 rounded-lg bg-rose-500/20">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                </div>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          size="lg" 
          variant="outline" 
          onClick={resetGame} 
          className="h-16 rounded-2xl gap-3 font-bold border-2 hover:bg-muted/50"
        >
          <Home className="w-5 h-5" />
          Back to Lobby
        </Button>
        <Button 
          size="lg" 
          onClick={startGame} 
          className="h-16 rounded-2xl gap-3 font-black text-lg shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Rematch!
        </Button>
      </div>
    </div>
  );
}
