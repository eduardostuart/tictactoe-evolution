import { FC } from "react";
import { Piece } from "./Piece";
import { Player } from "../tictactoe";
import { game } from "../game";

export interface PieceBlocksProps {
  player: Player;
}

export const PlayerPieces: FC<PieceBlocksProps> = ({ player }: PieceBlocksProps) => {
  const info = game.players![player];
  return (
    <>
      {info.pieces.map((p, index) => (
        <Piece player={player} key={`${player}-${index}`} size={p} />
      ))}
    </>
  );
};
