"use client";

import { useRecoilState } from "recoil";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import {
  calculateTicketPoint,
  deleteTicket,
  getColorPlayer,
} from "../library/configGame";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Game, Player } from "../library/types/Game.type";

export default function TicketsCounter({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [game, setGame] = useRecoilState(gameState);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const { backgroundLight, borderColor, textIcon } = getColorPlayer(
    currentPlayer?.mainColor
  );

  function retireTicket(index: number) {
    const newTickets = deleteTicket(index, currentPlayer.ticketConfig);
    const updatedPlayer: Player = {
      ...currentPlayer,
      ticketConfig: newTickets,
      rideTicketPoints: calculateTicketPoint(newTickets),
    };
    const updatedGame: Game = {
      ...game,
      players: game.players.map((player) =>
        player.name === currentPlayer.name ? updatedPlayer : player
      ),
    };
    setGame(updatedGame);
    window.localStorage.setItem("game", JSON.stringify(updatedGame));
    setCurrentPlayer(updatedPlayer);
  }

  function getPositiveTickets() {
    const positiveTickets = currentPlayer.ticketConfig?.filter(
      (ticket) => Number(ticket) > 0
    );
    return positiveTickets?.length === 0
      ? `0 trajet sur ${currentPlayer.ticketConfig?.length} complété`
      : positiveTickets?.length === 1
      ? `1 trajet sur ${currentPlayer.ticketConfig?.length} complété`
      : `${positiveTickets?.length} trajets sur ${currentPlayer.ticketConfig?.length} complétés`;
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">Points des trajets</h2>
      <h3>Score courant : {currentPlayer.rideTicketPoints}</h3>
      <div
        className={`${backgroundLight} p-4 border-2 ${borderColor} rounded-lg flex items-center justify-between space-x-4`}
      >
        <AiOutlinePlusCircle
          onClick={() => setIsModalOpen((t) => !t)}
          className={`text-[30px] cursor-pointer ${textIcon} `}
        />

        <div className="flex-1 grid grid-cols-5 gap-3">
          {currentPlayer.ticketConfig?.map((ticket, index) => (
            <p
              key={index}
              className={`${
                ticket < 0
                  ? "bg-red-500 border-red-600 hover:bg-red-600"
                  : "bg-green-500 border-green-600 hover:bg-green-600"
              } py-2 px-4 rounded-lg text-white cursor-pointer transition-all duration-200 border-2 text-center`}
              onClick={() => retireTicket(index)}
            >
              {String(ticket)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <span className="text-sm py-2 pr-1">{getPositiveTickets()}</span>
      </div>
    </div>
  );
}
