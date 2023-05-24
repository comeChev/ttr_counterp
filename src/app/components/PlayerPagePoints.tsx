"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  calculateTicketPoint,
  deleteTicket,
  getColorPlayer,
  getLocalStorageGame,
} from "../library/configGame";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Game, Player, WagonConfig } from "../library/types/Game.type";
import { useRouter } from "next/navigation";
import ModalTicketPoints from "./ModalTicketPoints";
import WagonsCounter from "./WagonsCounter";
import TicketsCounter from "./TicketsCounter";

export default function PlayerPagePoints() {
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [game, setGame] = useRecoilState(gameState);
  const { backgroundLight, borderColor, textIcon } = getColorPlayer(
    currentPlayer?.mainColor
  );
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!getLocalStorageGame()) {
      router.push("/");
    }
    !game && setGame(getLocalStorageGame() as Game);
    !currentPlayer &&
      setCurrentPlayer(getLocalStorageGame()?.players[0] as Player);
  }, []);

  return currentPlayer !== null ? (
    <>
      <div className="flex flex-col h-[75vh] flex-1">
        {/* wagonsCounter */}
        <WagonsCounter />

        {/* ticketsCounter */}
        <TicketsCounter setIsModalOpen={setIsModalOpen} />

        {/* bonusCounter */}

        <div className="text-neutral-700">
          <h2 className="text-xl font-semibold">Points des bonus</h2>
          <h3>Score courant : {currentPlayer.bonusPoints}</h3>
          <div
            className={`${backgroundLight} p-4 border-2 ${borderColor} rounded-lg`}
          ></div>
        </div>
      </div>
      {isModalOpen && <ModalTicketPoints setIsModalOpen={setIsModalOpen} />}
    </>
  ) : null;
}
