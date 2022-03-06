import { FC } from "react";
import { BoardCell } from "../components/BoardCell";
import { BoardCell as BoardCellInterface } from "../tictactoe";

export interface BoardProps {
  board: BoardCellInterface[][];
}

export const Board: FC<BoardProps> = ({ board }) => {
  return (
    <>
      {board.map((row, rowIndex) => {
        return (
          <div className="w-full flex flex-row" key={`row-${rowIndex}`}>
            {row.map((value, indexCol) => {
              return <BoardCell player={value?.player} size={value?.size} key={`col-${indexCol}`} row={rowIndex} col={indexCol} />;
            })}
          </div>
        );
      })}
    </>
  );
};
