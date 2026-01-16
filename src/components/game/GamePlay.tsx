"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Timer, 
  UserX, 
  CheckCircle2,
  AlertCircle,
  Skull,
  ShieldAlert
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function GamePlay() {
  const { players, eliminatePlayer, endGame, scores } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  // Sound helper using Web Audio API
  const playSound = (type: 'milestone' | 'tick' | 'warning') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'milestone') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
      } else if (type === 'warning') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
      } else {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(660, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      }
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          const next = t - 1;
          
          // Sound triggers
          if (next === 30) playSound('milestone');
          if (next === 10) playSound('warning');
          if (next < 10 && next > 0) playSound('tick');
          
          return next;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      if (isActive) playSound('milestone'); // Final alert
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Initial sound when starting
  useEffect(() => {
    if (isActive && timeLeft === 60) {
      playSound('milestone');
    }
  }, [isActive]);

  const activePlayers = players.filter(p => !p.isEliminated);
  
  const handleEliminate = () => {
    if (selectedPlayer === null) return;
    
    eliminatePlayer(selectedPlayer);
    
    const newActivePlayers = players.filter(p => !p.isEliminated && p.id !== selectedPlayer);
    const newImpostersLeft = newActivePlayers.filter(p => p.role !== 'civilian').length;
    
    if (newImpostersLeft === 0) {
      endGame('civilians');
    } else if (newActivePlayers.length <= 2) {
      endGame('imposters');
    }
    
    setSelectedPlayer(null);
  };

  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      {/* Top Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 flex items-center justify-between shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-4 relative z-10">
            <div className={cn(
              "p-3 rounded-2xl transition-all duration-500",
              isActive ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-muted text-muted-foreground"
            )}>
              <Timer className={cn("w-6 h-6", isActive && "animate-spin-slow")} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-black tracking-widest opacity-40">Time Left</p>
              <p className={cn(
                "text-2xl font-mono font-black tabular-nums transition-colors",
                timeLeft <= 10 && isActive ? "text-rose-500 animate-pulse" : ""
              )}>{timeLeft}s</p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className={cn(
              "h-14 px-8 rounded-2xl font-black shadow-lg transition-all active:scale-95 relative z-10",
              isActive 
                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20" 
                : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
            )}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Pause" : "Start"}
          </Button>

          {/* Background animation for active timer */}
          {isActive && (
            <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none" />
          )}
        </div>

        <div className="bg-card/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-black tracking-widest opacity-40">Series Score</p>
              <p className="text-lg font-black">
                <span className="text-primary">{scores.civilians}</span>
                <span className="mx-2 opacity-20">/</span>
                <span className="text-rose-500">{scores.imposters}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight">The Interrogation</h2>
        <p className="text-muted-foreground font-medium">Observe and find the suspicious descriptions.</p>
      </div>

      {/* Player Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {players.map((player) => (
          <motion.div
            key={player.id}
            initial={false}
            animate={{ 
              scale: player.isEliminated ? 0.95 : 1,
              opacity: player.isEliminated ? 0.5 : 1
            }}
          >
            <Card 
              className={cn(
                "relative overflow-hidden border-2 transition-all duration-300 rounded-[2rem] h-32 cursor-pointer group shadow-lg",
                player.isEliminated 
                  ? 'border-transparent bg-muted/20 grayscale' 
                  : selectedPlayer === player.id 
                    ? 'border-primary bg-primary/10 ring-4 ring-primary/5' 
                    : 'border-white/5 bg-card/40 hover:border-primary/40 hover:bg-card/60'
              )}
              onClick={() => !player.isEliminated && setSelectedPlayer(player.id)}
            >
              <CardContent className="p-0 flex flex-col items-center justify-center h-full">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 font-black text-xl transition-all duration-500 group-hover:scale-110",
                  player.isEliminated 
                    ? 'bg-muted text-muted-foreground' 
                    : selectedPlayer === player.id 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : 'bg-primary/10 text-primary'
                )}>
                  {player.id}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-60 transition-opacity">Player</p>
                
                {player.isEliminated && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                    <Skull className="w-10 h-10 text-rose-500/80" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Footer */}
      <AnimatePresence mode="wait">
        {selectedPlayer !== null ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pt-6"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full h-16 rounded-3xl text-lg font-black bg-rose-500 hover:bg-rose-600 shadow-2xl shadow-rose-500/30 transition-all active:scale-[0.98]" 
                >
                  Eliminate Player {selectedPlayer}
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[3rem] p-8 max-w-sm mx-auto">
                <DialogHeader className="items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-rose-500 animate-bounce" />
                  </div>
                  <DialogTitle className="text-2xl font-black">Confirm Vote</DialogTitle>
                </DialogHeader>
                <div className="py-6 text-center space-y-2">
                  <p className="text-muted-foreground font-medium">
                    Are you absolutely sure the group has voted to eliminate
                  </p>
                  <p className="text-3xl font-black text-foreground">Player {selectedPlayer}?</p>
                </div>
                <DialogFooter className="flex-col sm:flex-col gap-3">
                  <Button 
                    className="w-full h-14 rounded-2xl font-bold bg-rose-500 hover:bg-rose-600"
                    onClick={handleEliminate}
                  >
                    Confirm Elimination
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full h-14 rounded-2xl font-bold text-muted-foreground"
                    onClick={() => setSelectedPlayer(null)}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10 text-sm font-bold text-primary/60">
              <CheckCircle2 className="w-4 h-4" />
              {activePlayers.length} players remaining
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
