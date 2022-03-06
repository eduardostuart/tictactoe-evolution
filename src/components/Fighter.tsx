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
      dimensions = `w-24 h-24`;
      break;
    case PieceSize.MEDIUM:
      dimensions = `w-20 h-20`;
      break;
    case PieceSize.SMALL:
      dimensions = `w-10 h-10`;
      break;
  }

  const info = game.players![player];

  const color = `bg-${info.color}-300 border-${info.color}-400`;
  const borderColor = `border-${info.color}-600`;

  return (
    <>
      <div
        className={`${dimensions} ${color} delay-100 hover:-translate-y-1 transition-all ease-in-out group relative hover:shadow-lg border-4 select-none overflow-hidden flex items-center justify-center rounded-full`}
        {...props}
      >
        <div
          className={`${dimensions} ${borderColor} group-hover:visible group-focus:visible invisible z-10 absolute -inset-0.5 border-4 rounded-lg blur`}
        ></div>
        <img className="relative z-20" src={getFighterImage(info.fighter, size)} alt="" />
      </div>
    </>
  );
};
