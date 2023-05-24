"use client";

import Link from "next/link";

import { useRecoilState } from "recoil";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import { Game } from "../library/types/Game.type";
import { useEffect, useState } from "react";

export default function StartGameButton() {
  const [game, setGame] = useRecoilState(gameState);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [isSameGame, setIsSameGame] = useState(true);

  const handleStartGame = (game: Game) => {
    if (window.localStorage.getItem("game")) {
      const gameKey = window.localStorage.getItem("game") as string;
      const localGame: Game = JSON.parse(gameKey);
      game.players.length === localGame.players.length
        ? setIsSameGame(true)
        : setIsSameGame(false);
      setCurrentPlayer(localGame.players[0]);
      return;
    }
    window.localStorage.setItem("game", JSON.stringify(game));
    setCurrentPlayer(game.players[0]);
  };
  const [hasGame, setHasGame] = useState(false);

  useEffect(() => {
    window.localStorage.getItem("game") && setHasGame(true);
  }, []);

  return game.players.length > 1 && isSameGame ? (
    <Link
      href={`${game.id}/game`}
      className="px-3 py-2.5 text-blue-500 group-disabled:text-gray-300"
      onClick={() => handleStartGame(game)}
    >
      {window.localStorage.getItem("game")
        ? "Continuer la partie"
        : "Commencer une nouvelle partie"}
    </Link>
  ) : (
    <button disabled className="px-3 py-2.5 disabled:text-gray-300">
      {hasGame ? "Continuer la partie" : "Commencer une nouvelle partie"}
    </button>
  );
}
