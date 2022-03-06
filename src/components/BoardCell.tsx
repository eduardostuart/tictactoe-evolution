import { FC } from "react";
import { useDrop } from "react-dnd";
import { Fighter } from "./Fighter";
import { game } from "../game";
import { PieceSize, Player } from "../tictactoe";

export type BoardCellProps = {
  col: number;
  player?: Player;
  size?: PieceSize;
  row: number;
};

export const BoardCell: FC<BoardCellProps> = ({ size, player, col, row, ...props }) => {
  const [_, drop] = useDrop(
    () => ({
      accept: [Player.O, Player.X],
      drop: (item: { size: PieceSize }) => {
        game.move(row, col, item.size);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [col, row]
  );

  return (
    <div
      ref={drop}
      className="select-none text-5xl flex flex-col items-center justify-center bg-gray-100 border border-gray-200 w-28 h-28"
      {...props}
    >
      {player && size ? <Fighter size={size!} player={player} /> : ""}
    </div>
  );
};
