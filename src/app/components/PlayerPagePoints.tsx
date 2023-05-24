"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getLocalStorageGame } from "../library/configGame";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import { Game, Player } from "../library/types/Game.type";
import { useRouter } from "next/navigation";
import ModalTicketPoints from "./ModalTicketPoints";
import WagonsCounter from "./WagonsCounter";
import TicketsCounter from "./TicketsCounter";
import BonusCounter from "./BonusCounter";

export default function PlayerPagePoints() {
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [game, setGame] = useRecoilState(gameState);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <BonusCounter />
      </div>
      {/* <p>{JSON.stringify(currentPlayer)}</p> */}

      {isModalOpen && <ModalTicketPoints setIsModalOpen={setIsModalOpen} />}
    </>
  ) : null;
}
