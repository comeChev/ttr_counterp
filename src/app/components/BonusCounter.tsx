"use client";

import { useRecoilState } from "recoil";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import {
  calculateBonusPointsRailwayStation,
  getColorPlayer,
} from "../library/configGame";
import { Game, Player } from "../library/types/Game.type";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect } from "react";

export default function BonusCounter() {
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [game, setGame] = useRecoilState(gameState);
  const { backgroundLight, borderColor, textIcon } = getColorPlayer(
    currentPlayer?.mainColor
  );

  function handleChangePointsLongestRoute() {
    const value = !currentPlayer.bonusConfig.hasLongestRoute;
    if (value === true) {
      const updatedPlayer: Player = {
        ...currentPlayer,
        bonusPoints:
          currentPlayer.bonusPoints +
          currentPlayer.bonusConfig.longestRoutePoints,
        bonusConfig: { ...currentPlayer.bonusConfig, hasLongestRoute: value },
      };
      const updatedGame: Game = {
        ...game,
        players: game.players.map((player) =>
          player.name !== currentPlayer.name ? player : updatedPlayer
        ),
      };
      setCurrentPlayer(updatedPlayer);
      setGame(updatedGame);
      window.localStorage.setItem("game", JSON.stringify(updatedGame));
    }

    if (value === false) {
      const updatedPlayer: Player = {
        ...currentPlayer,
        bonusPoints:
          currentPlayer.bonusPoints -
          currentPlayer.bonusConfig.longestRoutePoints,
        bonusConfig: { ...currentPlayer.bonusConfig, hasLongestRoute: value },
      };
      const updatedGame: Game = {
        ...game,
        players: game.players.map((player) =>
          player.name !== currentPlayer.name ? player : updatedPlayer
        ),
      };
      setCurrentPlayer(updatedPlayer);
      setGame(updatedGame);
      window.localStorage.setItem("game", JSON.stringify(updatedGame));
    }
  }

  function handleChangePointsRailwayStation(value: "plus" | "minus") {
    if (value === "minus") {
      const updatedPlayer: Player = {
        ...currentPlayer,
        bonusConfig: {
          ...currentPlayer.bonusConfig,
          railwayStationRemaining:
            currentPlayer.bonusConfig.railwayStationRemaining - 1,
        },
        bonusPoints:
          currentPlayer.bonusPoints -
          currentPlayer.bonusConfig.railwayStationPoints,
      };
      const updatedGame: Game = {
        ...game,
        players: game.players.map((player) =>
          player.name !== currentPlayer.name ? player : updatedPlayer
        ),
      };
      setCurrentPlayer(updatedPlayer);
      setGame(updatedGame);
      window.localStorage.setItem("game", JSON.stringify(updatedGame));
    }
    if (value === "plus") {
      const updatedPlayer: Player = {
        ...currentPlayer,
        bonusConfig: {
          ...currentPlayer.bonusConfig,
          railwayStationRemaining:
            currentPlayer.bonusConfig.railwayStationRemaining + 1,
        },
        bonusPoints:
          currentPlayer.bonusPoints +
          currentPlayer.bonusConfig.railwayStationPoints,
      };
      const updatedGame: Game = {
        ...game,
        players: game.players.map((player) =>
          player.name !== currentPlayer.name ? player : updatedPlayer
        ),
      };
      setCurrentPlayer(updatedPlayer);
      setGame(updatedGame);
      window.localStorage.setItem("game", JSON.stringify(updatedGame));
    }
  }

  return (
    <div className="text-neutral-700">
      <h2 className="text-xl font-semibold">Points des bonus</h2>
      <h3>Score courant : {currentPlayer.bonusPoints}</h3>
      <div
        className={`${backgroundLight} p-4 border-2 ${borderColor} rounded-lg`}
      >
        {/* Longest route */}
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base">
            Trajet le plus long
            <span className="ml-2 text-sm">(+10 points)</span>
          </p>
          <div className="flex items-center">
            <input
              className="h-0 w-0 hidden "
              id={`switch-hasLongestRoute`}
              checked={currentPlayer.bonusConfig?.hasLongestRoute}
              onChange={handleChangePointsLongestRoute}
              type="checkbox"
            />
            <label
              className={`group ${
                currentPlayer.bonusConfig?.hasLongestRoute
                  ? "bg-green-400"
                  : "bg-gray-300"
              } label cursor-pointer w-12 h-6 rounded-[50px] relative transition duration-500 ease-in-out`}
              htmlFor={`switch-hasLongestRoute`}
            >
              <span
                className={`${
                  currentPlayer.bonusConfig?.hasLongestRoute &&
                  "translate-x-[100%]"
                } content-none absolute top-[2px] left-[2px] w-[47%] h-[85%] rounded-full duration-300 bg-white shadow-md transition-transform`}
              />
            </label>
          </div>
        </div>
        {/* Railway Stations */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm sm:text-base">
            Gares restantes
            <span className="ml-2 text-sm">(+4 points / gare)</span>
          </p>
          <div className="flex items-center">
            <button
              disabled={
                currentPlayer.bonusConfig?.railwayStationRemaining === 0
              }
              onClick={() => handleChangePointsRailwayStation("minus")}
              className="disabled:opacity-50"
            >
              <AiOutlineMinusCircle className={`${textIcon} text-[30px]`} />
            </button>
            <span className="w-5 text-center">
              {currentPlayer.bonusConfig?.railwayStationRemaining}
            </span>
            <button
              className="disabled:opacity-50"
              onClick={() => handleChangePointsRailwayStation("plus")}
              disabled={currentPlayer.bonusConfig?.railwayStationRemaining >= 4}
            >
              <AiOutlinePlusCircle className={`${textIcon} text-[30px]`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
