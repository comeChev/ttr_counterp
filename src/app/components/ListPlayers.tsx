"use client";

import { useRecoilState } from "recoil";

import { getColorPlayer, getPlayerResult } from "../library/configGame";
import { Game, Player } from "../library/types/Game.type";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import { useEffect } from "react";

const PlayerIcon = ({
  player,
  handleClick,
}: {
  player: Player;
  handleClick: () => void;
}) => {
  const { backgroundSolid, textSolid, textLight, ringSolid } = getColorPlayer(
    player.mainColor
  );

  return (
    <div
      key={player.name}
      className="flex flex-col items-center justify-center space-y-1 sm:w-3 cursor-pointer group h-auto w-14 mx-1 my-1"
      onClick={handleClick}
    >
      <div
        className={`h-12 w-12 rounded-full flex items-center justify-center ${backgroundSolid}  ${textSolid} group-hover:ring-4 ${ringSolid} border-2 border-white transition duration-200`}
      >
        <p>{getPlayerResult(player)}</p>
      </div>
      <p className={`${textLight} text-sm sm:text-md text-center`}>
        {player.customName || player.name}
      </p>
    </div>
  );
};

export default function ListPlayers() {
  const [game, setGame] = useRecoilState(gameState);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);

  function handleStorage() {
    if (window.localStorage.getItem("game")) {
      const gameKey = window.localStorage.getItem("game");
      const localGame: Game = JSON.parse(gameKey as string);
      setGame(localGame);
      setCurrentPlayer(localGame.players[0]);
    }
  }

  useEffect(() => {
    handleStorage();
  }, []);
  return (
    <>
      <div className="flex flex-wrap  mt-5 sm:mt-16 sm:flex-col items-start sm:pl-14 sm:justify-evenly sm:space-x-0 sm:w-1/6 sm:h-2/3">
        {game &&
          game.players.map((player, index) => (
            <PlayerIcon
              key={index}
              player={player}
              handleClick={() => setCurrentPlayer(player)}
            />
          ))}
      </div>
    </>
  );
}
