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

  type PlayerSide = "top" | "bottom";

  type PlayerBoardSideProps = {
    player: Player;
    isCurrentPlayer: boolean;
    side: PlayerSide;
  };

  const PlayerBoardSide: FC<PlayerBoardSideProps> = ({ player, side, isCurrentPlayer }) => {
    return (
      <div className={`transition-colors relative ease-in-out delay-75 w-full h-[9rem] flex items-center flex-none`}>
        {isCurrentPlayer && (
          <div className={`absolute z-10  -${side === "top" ? "bottom" : "top"}-2 blur-lg h-4 w-full bg-green-600`}></div>
        )}
        <div className="max-w-lg z-20 relative h-full w-full mx-auto flex items-center bg-gradient-to-b  from-gray-800 to-gray-900 bg-gray-800 justify-around px-4">
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
      <div className="w-full h-full p-4 bg-gray-600 flex flex-row">
        <div className="max-w-lg select-none shadow flex-none w-full bg-white overflow-hidden rounded-2xl h-full mx-auto flex flex-col">
          <PlayerBoardSide side="top" isCurrentPlayer={currentPlayer! === Player.O} player={Player.O} />
          {error && <GameError error={error} />}

          <div className="w-full mx-auto relative h-full flex flex-row items-center justify-center">
            <div className="mx-auto flex flex-col">
              <Board board={board} />
            </div>
          </div>
          <PlayerBoardSide side="bottom" isCurrentPlayer={currentPlayer! === Player.X} player={Player.X} />
          {winner && <WinnerDialog winner={winner} />}
        </div>
      </div>
    </DndProvider>
  );
}
