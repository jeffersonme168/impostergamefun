"use client";

import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Trophy, Home, RotateCcw, PartyPopper, Frown } from "lucide-react";

export function GameResult() {
  const { winner, players, resetGame, startGame } = useGameStore();

  const isCivilianWin = winner === 'civilians';

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
          className="inline-block"
        >
          {isCivilianWin ? (
            <div className="p-4 rounded-full bg-primary/20">
              <Trophy className="w-16 h-16 text-primary" />
            </div>
          ) : (
            <div className="p-4 rounded-full bg-accent/20">
              <PartyPopper className="w-16 h-16 text-accent" />
            </div>
          )}
        </motion.div>
        
        <div className="space-y-1">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            {isCivilianWin ? "Civilians Win!" : "Imposters Win!"}
          </h2>
          <p className="text-muted-foreground">The mystery has been solved.</p>
        </div>
      </div>

      <Card className="border-none shadow-xl bg-card/50">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest opacity-60">Final Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {players.map((player) => (
            <div 
              key={player.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                player.role !== 'civilian' ? 'bg-accent/5 border-accent/20' : 'bg-background/50 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-muted-foreground">#{player.id}</span>
                <span className="font-semibold">{player.word}</span>
              </div>
              <Badge variant={player.role === 'civilian' ? 'secondary' : 'destructive'}>
                {player.role.toUpperCase()}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button size="lg" variant="outline" onClick={resetGame} className="gap-2">
          <Home className="w-4 h-4" />
          Home
        </Button>
        <Button size="lg" onClick={startGame} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>
      </div>
    </div>
  );
}
