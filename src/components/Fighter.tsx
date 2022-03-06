import { FC } from "react";
import { game } from "../game";
import { getFighterImage, PieceSize, Player } from "../tictactoe";

export interface FighterProps {
  player: Player;
  size: PieceSize;
}

export const Fighter: FC<FighterProps> = ({ player, size, ...props }) => {
  let dimensions: string = "";
  switch (size) {
    case PieceSize.LARGE:
      dimensions = `w-16 h-16`;
      break;
    case PieceSize.MEDIUM:
      dimensions = `w-10 h-10`;
      break;
    case PieceSize.SMALL:
      dimensions = `w-6 h-6`;
      break;
  }

  const info = game.players![player];

  const color = `bg-${info.color}-300 border-${info.color}-400`;

  return (
    <>
      <div
        className={`${dimensions} shadow-lg border-2 select-none overflow-hidden flex items-center justify-center rounded-full ${color}`}
        {...props}
      >
        <img src={getFighterImage(info.fighter, size)} alt="" />
      </div>
    </>
  );
};
