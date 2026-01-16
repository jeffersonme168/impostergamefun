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
  SPORTS: "Sports",
  CELEBRITIES: "Celebrities",
  BRANDS: "Brands",
  PROFESSIONS: "Professions",
  COUNTRIES: "Countries",
  MUSIC: "Music",
  CUSTOM: "Custom"
} as const;

export type Category = keyof typeof CATEGORIES;

export const CLASSIC_WORDS: Record<Category, string[]> = {
  FOOD: ["Pizza", "Burger", "Apple", "Banana", "Pasta", "Sushi", "Taco", "Ramen", "Steak", "Ice Cream", "Salad", "Croissant"],
  ANIMALS: ["Lion", "Tiger", "Elephant", "Kangaroo", "Penguin", "Giraffe", "Zebra", "Panda", "Axolotl", "Platypus", "Narwhal", "Monkey"],
  MOVIES: ["Titanic", "Avatar", "Star Wars", "Toy Story", "Jaws", "Inception", "Gladiator", "Matrix", "Parasite", "Pulp Fiction", "Frozen"],
  PLACES: ["Paris", "Tokyo", "London", "New York", "Beach", "Mountain", "Desert", "Library", "Hospital", "Cinema", "Gym"],
  OBJECTS: ["Umbrella", "Bicycle", "Clock", "Hammer", "Laptop", "Compass", "Key", "Camera", "Mirror", "Wallet", "Suitcase"],
  SPORTS: ["Basketball", "Football", "Swimming", "Tennis", "Badminton", "Ping Pong", "Baseball", "Golf", "Skiing", "Yoga", "Boxing", "Running"],
  CELEBRITIES: ["Taylor Swift", "BTS", "Messi", "LeBron James", "Beyoncé", "Tom Cruise", "Ariana Grande", "Ronaldo", "Oprah", "Elon Musk", "Michael Jordan", "Lady Gaga"],
  BRANDS: ["Nike", "Apple", "McDonald's", "Coca-Cola", "Adidas", "Starbucks", "Google", "Amazon", "Disney", "Samsung", "Tesla", "IKEA"],
  PROFESSIONS: ["Doctor", "Teacher", "Chef", "Engineer", "Artist", "Lawyer", "Firefighter", "Pilot", "Musician", "Programmer", "Nurse", "Scientist"],
  COUNTRIES: ["USA", "China", "Japan", "France", "Italy", "Brazil", "Australia", "Canada", "Mexico", "Germany", "Spain", "India"],
  MUSIC: ["Beatles", "Queen", "Taylor Swift", "BTS", "Beyoncé", "Ed Sheeran", "Drake", "Billie Eilish", "Coldplay", "Adele", "Bruno Mars", "The Weeknd"],
  CUSTOM: []
};

export const UNDERCOVER_PAIRS: Record<Category, WordPair[]> = {
  FOOD: [
    { word1: "Apple", word2: "Pear" },
    { word1: "Hamburger", word2: "Cheeseburger" },
    { word1: "Coke", word2: "Pepsi" },
    { word1: "Coffee", word2: "Tea" },
    { word1: "Pizza", word2: "Calzone" },
    { word1: "Bread", word2: "Toast" }
  ],
  ANIMALS: [
    { word1: "Lion", word2: "Tiger" },
    { word1: "Dog", word2: "Wolf" },
    { word1: "Cat", word2: "Leopard" },
    { word1: "Dolphin", word2: "Whale" },
    { word1: "Bee", word2: "Wasp" },
    { word1: "Spider", word2: "Scorpion" }
  ],
  MOVIES: [
    { word1: "Titanic", word2: "Poseidon" },
    { word1: "Star Wars", word2: "Star Trek" },
    { word1: "Avatar", word2: "Pocahontas" },
    { word1: "Frozen", word2: "Tangled" },
    { word1: "Superman", word2: "Batman" },
    { word1: "Avengers", word2: "Justice League" }
  ],
  PLACES: [
    { word1: "Ocean", word2: "Sea" },
    { word1: "Hotel", word2: "Motel" },
    { word1: "Forest", word2: "Jungle" },
    { word1: "Lake", word2: "Pond" },
    { word1: "City", word2: "Town" }
  ],
  OBJECTS: [
    { word1: "Pen", word2: "Pencil" },
    { word1: "Smartphone", word2: "Tablet" },
    { word1: "Watch", word2: "Clock" },
    { word1: "Book", word2: "Magazine" },
    { word1: "Chair", word2: "Stool" }
  ],
  SPORTS: [
    { word1: "Basketball", word2: "Volleyball" },
    { word1: "Football", word2: "Rugby" },
    { word1: "Tennis", word2: "Badminton" },
    { word1: "Swimming", word2: "Diving" },
    { word1: "Golf", word2: "Mini Golf" },
    { word1: "Boxing", word2: "Wrestling" }
  ],
  CELEBRITIES: [
    { word1: "Taylor Swift", word2: "Ariana Grande" },
    { word1: "Messi", word2: "Ronaldo" },
    { word1: "LeBron James", word2: "Michael Jordan" },
    { word1: "Beatles", word2: "Rolling Stones" },
    { word1: "Tom Cruise", word2: "Brad Pitt" },
    { word1: "BTS", word2: "Blackpink" }
  ],
  BRANDS: [
    { word1: "Coca-Cola", word2: "Pepsi" },
    { word1: "Nike", word2: "Adidas" },
    { word1: "Apple", word2: "Samsung" },
    { word1: "McDonald's", word2: "Burger King" },
    { word1: "Google", word2: "Bing" },
    { word1: "Tesla", word2: "BMW" }
  ],
  PROFESSIONS: [
    { word1: "Doctor", word2: "Nurse" },
    { word1: "Teacher", word2: "Professor" },
    { word1: "Chef", word2: "Cook" },
    { word1: "Engineer", word2: "Architect" },
    { word1: "Lawyer", word2: "Judge" },
    { word1: "Pilot", word2: "Flight Attendant" }
  ],
  COUNTRIES: [
    { word1: "USA", word2: "Canada" },
    { word1: "China", word2: "Japan" },
    { word1: "France", word2: "Italy" },
    { word1: "Australia", word2: "New Zealand" },
    { word1: "Mexico", word2: "Spain" },
    { word1: "Brazil", word2: "Argentina" }
  ],
  MUSIC: [
    { word1: "Beatles", word2: "Rolling Stones" },
    { word1: "Taylor Swift", word2: "Katy Perry" },
    { word1: "BTS", word2: "EXO" },
    { word1: "Drake", word2: "The Weeknd" },
    { word1: "Coldplay", word2: "U2" },
    { word1: "Beyoncé", word2: "Rihanna" }
  ],
  CUSTOM: []
};
