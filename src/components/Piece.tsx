import { FC } from "react";
import { useDrag } from "react-dnd";
import { Fighter } from "./Fighter";
import { game } from "../game";
import { PieceSize, Player } from "../tictactoe";

export interface PieceProps {
  player: Player;
  size: PieceSize;
}

export const Piece: FC<PieceProps> = ({ player, size, ...props }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: player,
      canDrag: game.currentPlayer === player,
      item: {
        size,
        player,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [size, player, game.currentPlayer]
  );

  return (
    <div ref={drag} className={`cursor-move rounded-full ${isDragging ? "opacity-10" : ""}`} {...props}>
      <Fighter size={size} player={player} />
    </div>
  );
};
