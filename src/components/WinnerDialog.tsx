import { FC } from "react";
import { game } from "../game";
import { PlayerIdentification } from "./PlayerIdentification";
import { Winner } from "../tictactoe";

export interface WinnerProps {
  winner: Winner;
}

export const WinnerDialog: FC<WinnerProps> = ({ winner }) => {
  return (
    <div className="fixed z-50 bg-black/30 left-0 right-0 bottom-0 flex items-center justify-center top-0 w-full h-full ">
      <div className="bg-white border-5 border-gray-600 shadow text-lg rounded-lg text-center">
        <div className="p-4">
          <h3 className="text-4xl font-black mb-6">Game is over</h3>
          {winner === "Tie" ? (
            "Tie!"
          ) : (
            <div>
              Winner:
              <PlayerIdentification player={winner} />
            </div>
          )}
        </div>
        <div className="w-full p-4 border-t border-gray-100">
          <a
            href="#"
            onClick={() => game.reset()}
            className="bg-blue-500 hover:bg-blue-800 py-2 px-4 rounded-lg text-white font-semibold border-2 border-blue-300"
          >
            New game
          </a>
        </div>
      </div>
    </div>
  );
};
