"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Timer, 
  MessageSquare, 
  UserX, 
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export function GamePlay() {
  const { players, eliminatePlayer, endGame, scores } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  // Simple timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const activePlayers = players.filter(p => !p.isEliminated);
  const impostersLeft = activePlayers.filter(p => p.role === 'imposter' || p.role === 'undercover' || p.role === 'mr-white').length;

  const handleEliminate = () => {
    if (selectedPlayer === null) return;
    
    eliminatePlayer(selectedPlayer);
    
    // Check win condition
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
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center bg-card/50 p-4 rounded-2xl border">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isActive ? 'bg-primary/20 text-primary animate-pulse' : 'bg-muted text-muted-foreground'}`}>
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold opacity-60">Timer</p>
              <p className="text-xl font-mono font-bold">{timeLeft}s</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-border" />
          <div className="hidden sm:flex flex-col">
            <p className="text-xs uppercase tracking-wider font-bold opacity-60">Score</p>
            <p className="text-sm font-bold">
              <span className="text-primary">CIV: {scores.civilians}</span> / <span className="text-accent">IMP: {scores.imposters}</span>
            </p>
          </div>
        </div>
        <Button 
          variant={isActive ? "outline" : "default"} 
          size="sm"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "Pause" : timeLeft === 60 ? "Start" : "Resume"}
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black">Round 1: Describe</h2>
        <p className="text-sm text-muted-foreground">Each player describes their word in one sentence.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {players.map((player) => (
          <Card 
            key={player.id} 
            className={`relative overflow-hidden border-2 transition-all ${
              player.isEliminated 
                ? 'opacity-40 grayscale scale-95 border-transparent' 
                : 'hover:border-primary/50 cursor-pointer'
            } ${selectedPlayer === player.id ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => !player.isEliminated && setSelectedPlayer(player.id)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center min-h-[100px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold ${
                player.isEliminated ? 'bg-muted' : 'bg-primary/10 text-primary'
              }`}>
                {player.id}
              </div>
              <p className="text-xs font-bold uppercase opacity-60">Player</p>
              {player.isEliminated && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                  <UserX className="w-8 h-8 text-destructive" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full py-6" 
              variant="destructive" 
              disabled={selectedPlayer === null}
            >
              Eliminate Player {selectedPlayer}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Elimination</DialogTitle>
            </DialogHeader>
            <div className="py-6 flex flex-col items-center gap-4">
              <AlertCircle className="w-12 h-12 text-destructive" />
              <p className="text-center">
                Are you sure the majority voted to eliminate <span className="font-bold text-lg">Player {selectedPlayer}</span>?
              </p>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="ghost" onClick={() => setSelectedPlayer(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleEliminate}>Confirm Elimination</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="w-3 h-3" />
          <span>{activePlayers.length} players remaining</span>
        </div>
      </div>
    </div>
  );
}
