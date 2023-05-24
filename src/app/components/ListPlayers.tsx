"use client";

import { useRecoilState } from "recoil";

import {
  defaultPlayers,
  getColorPlayer,
  getPlayerResult,
} from "../library/configGame";
import { Game, Player } from "../library/types/Game.type";
import {
  currentPlayerState,
  defaultGame,
  gameState,
  playersState,
} from "../library/atom/gameState";
import { useEffect } from "react";
import Link from "next/link";
import { BsPlayCircleFill } from "react-icons/bs";

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
  const [playersDefault, setPlayersDefault] = useRecoilState(playersState);

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
    <div
      className="
      flex flex-wrap 
      mt-5 
      items-center
      justify-evenly
      h-full w-full
      sm:mt-16
      sticky top-0 z-30 bg-white
      "
    >
      {game &&
        game.players.map((player, index) => (
          <PlayerIcon
            key={index}
            player={player}
            handleClick={() => setCurrentPlayer(player)}
          />
        ))}

      <Link
        href="/"
        className="group flex flex-col items-center justify-center space-y-1 sm:w-3 cursor-pointer group h-auto w-14 mx-1 my-1"
        onClick={() => {
          window.localStorage.removeItem("game");
          setGame(defaultGame);
          setPlayersDefault(defaultPlayers);
        }}
      >
        <div className="flex flex-col items-center justify-center w-14">
          <BsPlayCircleFill className="text-[45px] group-hover:text-red-600 transition-colors duration-300 border-2 border-transparent" />
          <p className={`text-sm text-gray-500 w-14 pt-1 text-center`}>
            Nouvelle partie
          </p>
        </div>
      </Link>
    </div>
  );
}
