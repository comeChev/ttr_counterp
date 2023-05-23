"use client";
import React from "react";
import { gameState, playersState } from "../library/atom/gameState";
import { useRecoilState } from "recoil";
import { handleResetPlayers } from "../library/configGame";
import { RxReset } from "react-icons/rx";

export default function ResetButton() {
  const [game, setGame] = useRecoilState(gameState);
  const [defaultPlayers, setDefaultPlayers] = useRecoilState(playersState);

  const handleReset = () => {
    if (window.localStorage.getItem("game")) {
      window.localStorage.removeItem("game");
      handleResetPlayers(setDefaultPlayers, setGame, game);
    }
    handleResetPlayers(setDefaultPlayers, setGame, game);
  };
  return game.players.length > 0 ? (
    <button onClick={handleReset} className="flex items-center space-x-2">
      <RxReset />
      <span>Reset</span>
    </button>
  ) : null;
}
