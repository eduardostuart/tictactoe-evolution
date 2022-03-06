import { FIGHTERS, Identifier } from "./fighters";
import { PieceSize } from "./TicTacToe";

export * from "./TicTacToe";

export function getFighterImage(identifier: Identifier, size: PieceSize) {
  return FIGHTERS[identifier]?.pieces[size - 1];
}
