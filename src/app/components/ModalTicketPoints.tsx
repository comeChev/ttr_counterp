"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import {
  calculateTicketPoint,
  getColorPlayer,
  routesPoints,
} from "../library/configGame";
import { Player } from "../library/types/Game.type";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import { useRecoilState } from "recoil";

export default function ModalTicketPoints({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [game, setGame] = useRecoilState(gameState);

  const { backgroundLight, borderColor, backgroundExtraLight } = getColorPlayer(
    currentPlayer?.mainColor
  );

  function addTicketPoint() {
    const updatedPlayer: Player = {
      ...currentPlayer,
      rideTicketPoints: calculateTicketPoint([
        ...currentPlayer.ticketConfig,
        +value,
      ]),
      ticketConfig: [...currentPlayer.ticketConfig, value],
    };
    const updatedGame = {
      ...game,
      players: game.players.map((player) =>
        player.name !== currentPlayer.name ? player : updatedPlayer
      ),
    };
    setCurrentPlayer(updatedPlayer);
    setGame(updatedGame);
    window.localStorage.setItem("game", JSON.stringify(updatedGame));
    setValue(0);
  }

  function removeTicketPoint() {
    const updatedPlayer: Player = {
      ...currentPlayer,
      rideTicketPoints: calculateTicketPoint([
        ...currentPlayer.ticketConfig,
        -value,
      ]),
      ticketConfig: [...currentPlayer.ticketConfig, -value],
    };
    const updatedGame = {
      ...game,
      players: game.players.map((player) =>
        player.name !== currentPlayer.name ? player : updatedPlayer
      ),
    };
    setCurrentPlayer(updatedPlayer);
    setGame(updatedGame);
    window.localStorage.setItem("game", JSON.stringify(updatedGame));
    setValue(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, top: -20 }}
      animate={{ opacity: 1, top: 10 }}
      exit={{ opacity: 0, top: -20 }}
      className={`fixed  top-4 ${backgroundExtraLight} text-neutral-700 border-2 ${borderColor} p-4 rounded-lg w-[85%] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center px-10 z-50`}
    >
      <div className="flex flex-wrap w-full sm:w-3/4">
        {routesPoints.map((routePoint, index) => (
          <button
            key={index}
            className="bg-white border-2 border-gray-400 m-2 focus:bg-gray-500 focus:text-white w-[60px] h-[40px] sm:w-[120px] sm:h-[60px] rounded-md"
            onClick={() => setValue(routePoint)}
          >
            {routePoint}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 h-12 w-full sm:w-3/4 mt-10 mb-5">
        <button
          disabled={value === 0}
          onClick={() => addTicketPoint()}
          className={`bg-green-500 rounded-lg disabled:opacity-50 text-lg ${
            value === 0 ? "text-green-500" : "text-white"
          }`}
        >
          {value === 0 ? "0" : `Ajouter ${value} points`}
        </button>
        <button
          disabled={value === 0}
          onClick={() => removeTicketPoint()}
          className={`bg-red-500 rounded-lg disabled:opacity-50 text-lg ${
            value === 0 ? "text-red-500" : "text-white"
          }`}
        >
          {value === 0 ? "0" : `Retirer ${value} points`}
        </button>
      </div>

      <span
        className="cursor-pointer text-lg text-red-500 hover:underline underline-offset-2"
        onClick={() => setIsModalOpen(false)}
      >
        Fermer
      </span>
    </motion.div>
  );
}
