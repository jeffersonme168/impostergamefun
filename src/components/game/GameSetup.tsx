"use client";

import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CATEGORIES, Category } from "@/data/word-bank";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameMode } from "@/lib/game-engine";
import { Users, Shield, Ghost, BookOpen } from "lucide-react";

export function GameSetup() {
  const { settings, updateSettings, startGame } = useGameStore();

  return (
    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">New Game</CardTitle>
        <CardDescription className="text-center">Configure your party game settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mode Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold uppercase tracking-wider opacity-70">Game Mode</Label>
          <Tabs 
            value={settings.mode} 
            onValueChange={(v) => updateSettings({ mode: v as GameMode })}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full h-auto p-1 bg-muted/50">
              <TabsTrigger value="classic" className="py-2.5">Classic</TabsTrigger>
              <TabsTrigger value="undercover" className="py-2.5">Undercover</TabsTrigger>
              <TabsTrigger value="mr-white" className="py-2.5">Mr. White</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Player Count */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Players
            </Label>
            <span className="text-xl font-bold text-primary">{settings.playerCount}</span>
          </div>
          <Slider
            value={[settings.playerCount]}
            min={4}
            max={12}
            step={1}
            onValueChange={([v]) => updateSettings({ playerCount: v })}
          />
        </div>

        {/* Category */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            Word Category
          </Label>
          <Select 
            value={settings.category} 
            onValueChange={(v) => updateSettings({ category: v as Category })}
          >
            <SelectTrigger className="w-full bg-background/50">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Roles Distribution */}
        <div className="grid grid-cols-2 gap-4">
          {settings.mode === 'classic' && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs opacity-70">
                <Shield className="w-3 h-3 text-accent" />
                Imposters
              </Label>
              <Select 
                value={String(settings.imposterCount)} 
                onValueChange={(v) => updateSettings({ imposterCount: parseInt(v) })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3].map(n => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {settings.mode === 'undercover' && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs opacity-70">
                <Shield className="w-3 h-3 text-accent" />
                Undercovers
              </Label>
              <Select 
                value={String(settings.undercoverCount)} 
                onValueChange={(v) => updateSettings({ undercoverCount: parseInt(v) })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3].map(n => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {settings.mode === 'mr-white' && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs opacity-70">
                <Ghost className="w-3 h-3 text-accent" />
                Mr. White
              </Label>
              <Select 
                value={String(settings.mrWhiteCount)} 
                onValueChange={(v) => updateSettings({ mrWhiteCount: parseInt(v) })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2].map(n => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {settings.category === 'CUSTOM' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Word A</Label>
              <Input 
                placeholder="e.g. Apple" 
                value={settings.customWord1}
                onChange={(e) => updateSettings({ customWord1: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Word B</Label>
              <Input 
                placeholder="e.g. Pear" 
                value={settings.customWord2}
                onChange={(e) => updateSettings({ customWord2: e.target.value })}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={startGame} className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20">
          Generate Game
        </Button>
      </CardFooter>
    </Card>
  );
}
