import { CLASSIC_WORDS, UNDERCOVER_PAIRS, Category } from "@/data/word-bank";

export type GameMode = "classic" | "undercover" | "mr-white";

export interface Player {
  id: number;
  role: "civilian" | "imposter" | "undercover" | "mr-white";
  word: string;
  isEliminated: boolean;
  score: number;
}

export interface GameSettings {
  playerCount: number;
  imposterCount: number;
  undercoverCount: number;
  mrWhiteCount: number;
  mode: GameMode;
  category: Category;
  customWord1?: string;
  customWord2?: string;
}

export function generatePlayers(settings: GameSettings): Player[] {
  const { 
    playerCount, 
    imposterCount, 
    undercoverCount, 
    mrWhiteCount, 
    mode, 
    category,
    customWord1,
    customWord2
  } = settings;

  let word1 = "";
  let word2 = "";

  // Select words
  if (category === "CUSTOM") {
    word1 = customWord1 || "Word A";
    word2 = customWord2 || "Word B";
  } else {
    if (mode === "undercover") {
      const pairs = UNDERCOVER_PAIRS[category];
      if (!pairs || pairs.length === 0) {
        throw new Error(`No word pairs available for category: ${category}`);
      }
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      [word1, word2] = Math.random() > 0.5 ? [pair.word1, pair.word2] : [pair.word2, pair.word1];
    } else {
      const words = CLASSIC_WORDS[category];
      if (!words || words.length === 0) {
        throw new Error(`No words available for category: ${category}`);
      }
      word1 = words[Math.floor(Math.random() * words.length)];
      word2 = "???"; // For imposters or Mr. White
    }
  }

  const players: Player[] = [];
  const indices = Array.from({ length: playerCount }, (_, i) => i);
  
  // Shuffle indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Assign roles based on shuffled indices
  let currentIndex = 0;

  // Assign Mr. White (if any)
  for (let i = 0; i < mrWhiteCount; i++) {
    players[indices[currentIndex++]] = {
      id: 0, // Will set later
      role: "mr-white",
      word: "You are Mr. White",
      isEliminated: false,
      score: 0
    };
  }

  // Assign Imposters (if Classic mode)
  if (mode === "classic") {
    for (let i = 0; i < imposterCount; i++) {
      players[indices[currentIndex++]] = {
        id: 0,
        role: "imposter",
        word: "You are the Imposter",
        isEliminated: false,
        score: 0
      };
    }
  }

  // Assign Undercovers (if Undercover mode)
  if (mode === "undercover") {
    for (let i = 0; i < undercoverCount; i++) {
      players[indices[currentIndex++]] = {
        id: 0,
        role: "undercover",
        word: word2,
        isEliminated: false,
        score: 0
      };
    }
  }

  // Fill the rest with Civilians
  while (currentIndex < playerCount) {
    players[indices[currentIndex++]] = {
      id: 0,
      role: "civilian",
      word: word1,
      isEliminated: false,
      score: 0
    };
  }

  // Sort by original index and assign proper IDs
  return players.map((p, i) => ({ ...p, id: i + 1 }));
}
