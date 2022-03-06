import { DndProvider } from "react-dnd";
import { FC, useState } from "react";
import { Player, Winner } from "./tictactoe";
import { game } from "./game";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WinnerDialog, PlayerPieces, PlayerIdentification, Board } from "./components";
// import { TouchBackend } from "react-dnd-touch-backend";

export function Game() {
  const [board, setBoard] = useState(game.board!);
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(game.currentPlayer);
  const [winner, setWinner] = useState<Winner | undefined>(game.winner);
  const [players, setPlayerInfo] = useState(game.players!);
  const [error, setError] = useState<Error | undefined>(undefined);

  game.on("updated", (data) => {
    setCurrentPlayer(data.currentPlayer);
    setWinner(data.winner);
    setBoard(data.board);
    setPlayerInfo(data.players);
  });

  game.on("error", (err) => {
    setError(err);
    if (err) {
      setTimeout(() => setError(undefined), 5 * 1000);
    }
  });

  type PlayerBoardSideProps = {
    player: Player;
  };

  const PlayerBoardSide: FC<PlayerBoardSideProps> = ({ player }) => {
    return (
      <div className="w-full h-20 flex items-center flex-none bg-gray-100">
        <div className="max-w-lg w-full mx-auto flex items-center justify-around">
          <PlayerPieces player={player} />
        </div>
      </div>
    );
  };

  const GameError: FC<{ error: Error }> = ({ error }) => {
    return (
      <div className="h-10 flex-none bg-red-300 rounded-sm p-2 text-center text-red-800 flex items-center justify-center">
        {error.toString()}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full md:p-8 p-4 bg-gray-400 flex flex-row">
        <div className="bg-white flex-none relative w-[50px] h-full overflow-hidden rounded-2xl">
          <div className="-rotate-90 mt-40">
            <div className="p-1 w-[180px] text-sm rounded-md border-2 border-gray-300 bg-gray-100 shadow-lg uppercase text-md">
              Current player <PlayerIdentification player={currentPlayer!} />
            </div>
          </div>
        </div>
        <div className="max-w-lg select-none shadow flex-none w-full bg-white overflow-hidden rounded-2xl h-full mx-auto flex flex-col">
          <PlayerBoardSide player={Player.O} />
          {error && <GameError error={error} />}

          <div className="w-full mx-auto relative h-full flex flex-row items-center justify-center">
            <div className="mx-auto flex flex-col">
              <Board board={board} />
            </div>
          </div>
          <PlayerBoardSide player={Player.X} />
          {winner && <WinnerDialog winner={winner} />}
        </div>
      </div>
    </DndProvider>
  );
}
