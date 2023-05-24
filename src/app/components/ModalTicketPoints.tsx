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
      className={`fixed top-4 flex flex-col justify-evenly items-center ${backgroundExtraLight} text-neutral-700 border-2 ${borderColor} p-2 rounded-lg w-[85%] h-[60%] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center px-10 z-50 overflow-scroll`}
    >
      <div className="flex flex-wrap w-full pt-4">
        {routesPoints.map((routePoint, index) => (
          <button
            key={index}
            className="bg-white border-2 border-gray-400 m-2 focus:bg-gray-500 focus:text-white w-[60px] h-[40px] sm:w-[70px] sm:h-[35px] rounded-md"
            onClick={() => setValue(routePoint)}
          >
            {routePoint}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 h-6 w-full sm:w-3/4 mt-3 pb-5">
        <button
          disabled={value === 0}
          onClick={() => addTicketPoint()}
          className={`bg-green-500 rounded-lg disabled:opacity-50 text-lg ${
            value === 0 ? "text-green-500" : "text-white"
          }`}
        >
          {value === 0 ? "Ajouter 0 points" : `Ajouter ${value} points`}
        </button>
        <button
          disabled={value === 0}
          onClick={() => removeTicketPoint()}
          className={`bg-red-500 rounded-lg disabled:opacity-50 text-lg ${
            value === 0 ? "text-red-500" : "text-white"
          }`}
        >
          {value === 0 ? "Retirer 0 points" : `Retirer ${value} points`}
        </button>
      </div>
      <span
        className="absolute top-1 cursor-pointer text-lg text-blue-500 hover:underline underline-offset-2 w-full text-center col-span-2"
        onClick={() => setIsModalOpen(false)}
      >
        Fermer
      </span>
    </motion.div>
  );
}
