import { create } from 'zustand';
import { Player, GameSettings, GameMode, generatePlayers } from './game-engine';
import { Category } from '@/data/word-bank';

export type GamePhase = 'setup' | 'reveal' | 'gameplay' | 'result';

interface GameState {
  settings: GameSettings;
  players: Player[];
  phase: GamePhase;
  currentRevealIndex: number;
  winner: 'civilians' | 'imposters' | null;
  scores: { civilians: number; imposters: number };
  
  // Actions
  updateSettings: (settings: Partial<GameSettings>) => void;
  startGame: () => void;
  nextReveal: () => void;
  setPhase: (phase: GamePhase) => void;
  eliminatePlayer: (id: number) => void;
  resetGame: () => void;
  endGame: (winner: 'civilians' | 'imposters') => void;
  updateScores: (winner: 'civilians' | 'imposters') => void;
}

const defaultSettings: GameSettings = {
  playerCount: 4,
  imposterCount: 1,
  undercoverCount: 1,
  mrWhiteCount: 0,
  mode: 'classic',
  category: 'FOOD'
};

export const useGameStore = create<GameState>((set) => ({
  settings: defaultSettings,
  players: [],
  phase: 'setup',
  currentRevealIndex: 0,
  winner: null,
  scores: { civilians: 0, imposters: 0 },

  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),

  startGame: () => set((state) => ({
    players: generatePlayers(state.settings),
    phase: 'reveal',
    currentRevealIndex: 0,
    winner: null
  })),

  nextReveal: () => set((state) => {
    const nextIndex = state.currentRevealIndex + 1;
    if (nextIndex >= state.players.length) {
      return { phase: 'gameplay' };
    }
    return { currentRevealIndex: nextIndex };
  }),

  setPhase: (phase) => set({ phase }),

  eliminatePlayer: (id) => set((state) => ({
    players: state.players.map(p => 
      p.id === id ? { ...p, isEliminated: true } : p
    )
  })),

  updateScores: (winner) => set((state) => ({
    scores: {
      ...state.scores,
      [winner]: state.scores[winner] + 1
    }
  })),

  endGame: (winner) => {
    set({ phase: 'result', winner });
    useGameStore.getState().updateScores(winner);
  },

  resetGame: () => set({
    phase: 'setup',
    players: [],
    currentRevealIndex: 0,
    winner: null,
    settings: defaultSettings
  }),
}));
