import { Metadata } from "next";
import GameClient from "./GameClient";

export const metadata: Metadata = {
  title: "Play Imposter Word Game - Start Your Party Game Online",
  description: "Start a new game of Imposter Word Game. Set up your players, choose categories, and begin the ultimate social deduction party experience with your friends today.",
};

export default function GamePage() {
  return <GameClient />;
}
