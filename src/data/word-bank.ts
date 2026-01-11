export interface WordPair {
  word1: string;
  word2: string;
}

export const CATEGORIES = {
  FOOD: "Food",
  ANIMALS: "Animals",
  MOVIES: "Movies",
  PLACES: "Places",
  OBJECTS: "Objects",
  CUSTOM: "Custom"
} as const;

export type Category = keyof typeof CATEGORIES;

export const CLASSIC_WORDS: Record<string, string[]> = {
  Food: ["Pizza", "Burger", "Apple", "Banana", "Pasta", "Sushi", "Taco", "Ramen", "Steak", "Ice Cream", "Salad", "Croissant"],
  Animals: ["Lion", "Tiger", "Elephant", "Kangaroo", "Penguin", "Giraffe", "Zebra", "Panda", "Axolotl", "Platypus", "Narwhal", "Monkey"],
  Movies: ["Titanic", "Avatar", "Star Wars", "Toy Story", "Jaws", "Inception", "Gladiator", "Matrix", "Parasite", "Pulp Fiction", "Frozen"],
  Places: ["Paris", "Tokyo", "London", "New York", "Beach", "Mountain", "Desert", "Library", "Hospital", "Cinema", "Gym"],
  Objects: ["Umbrella", "Bicycle", "Clock", "Hammer", "Laptop", "Compass", "Key", "Camera", "Mirror", "Wallet", "Suitcase"]
};

export const UNDERCOVER_PAIRS: Record<string, WordPair[]> = {
  Food: [
    { word1: "Apple", word2: "Pear" },
    { word1: "Hamburger", word2: "Cheeseburger" },
    { word1: "Coke", word2: "Pepsi" },
    { word1: "Coffee", word2: "Tea" },
    { word1: "Pizza", word2: "Calzone" },
    { word1: "Bread", word2: "Toast" }
  ],
  Animals: [
    { word1: "Lion", word2: "Tiger" },
    { word1: "Dog", word2: "Wolf" },
    { word1: "Cat", word2: "Leopard" },
    { word1: "Dolphin", word2: "Whale" },
    { word1: "Bee", word2: "Wasp" },
    { word1: "Spider", word2: "Scorpion" }
  ],
  Places: [
    { word1: "Ocean", word2: "Sea" },
    { word1: "Hotel", word2: "Motel" },
    { word1: "Forest", word2: "Jungle" },
    { word1: "Lake", word2: "Pond" },
    { word1: "City", word2: "Town" }
  ],
  Objects: [
    { word1: "Pen", word2: "Pencil" },
    { word1: "Smartphone", word2: "Tablet" },
    { word1: "Watch", word2: "Clock" },
    { word1: "Book", word2: "Magazine" },
    { word1: "Chair", word2: "Stool" }
  ]
};
