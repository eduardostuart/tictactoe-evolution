import { FC } from "react";
import { game } from "../game";
import { Player } from "../tictactoe";

export const PlayerIdentification: FC<{ player: Player }> = ({ player }) => {
  return <div className={`inline-block rounded-full w-3 h-3 mx-2 bg-${game.players![player!].color}-300`}></div>;
};
