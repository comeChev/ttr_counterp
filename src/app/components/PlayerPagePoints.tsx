"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  calculateTicketPoint,
  deleteTicket,
  getColorPlayer,
  getLocalStorageGame,
  numberWagons,
} from "../library/configGame";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import { IoMdTrain } from "react-icons/io";
import {
  AiOutlineMinus,
  AiOutlineMinusCircle,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { Game, Player, WagonConfig } from "../library/types/Game.type";
import { useRouter } from "next/navigation";
import ModalTicketPoints from "./ModalTicketPoints";

export default function PlayerPagePoints() {
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [game, setGame] = useRecoilState(gameState);
  const { backgroundLight, borderColor, textIcon } = getColorPlayer(
    currentPlayer?.mainColor
  );
  const [totalWagons, setTotalWagons] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  function addScore(value: number, wagonConfigIndex: number, wagons: number) {
    const updatedWagonConfig: WagonConfig = {
      ...currentPlayer.wagonsConfig[wagonConfigIndex],
      numberWagonMade:
        currentPlayer.wagonsConfig[wagonConfigIndex].numberWagonMade + 1,
    };
    const updatedPlayer: Player = {
      ...currentPlayer,
      wagonsPoints: currentPlayer.wagonsPoints + value,
      wagonsConfig: currentPlayer.wagonsConfig.map((wagonConfig, index) => {
        if (index === wagonConfigIndex) {
          return updatedWagonConfig;
        }
        return wagonConfig;
      }),
    };

    const updatedGame: Game = {
      ...game,
      players: game.players.map((player) =>
        player.name === currentPlayer.name ? updatedPlayer : player
      ),
    };
    setGame(updatedGame);
    setCurrentPlayer(updatedPlayer);
    setTotalWagons((t) => t + wagons);
    window.localStorage.setItem("game", JSON.stringify(updatedGame));
  }

  function retireScore(
    value: number,
    wagonConfigIndex: number,
    wagons: number
  ) {
    const updatedWagonConfig: WagonConfig = {
      ...currentPlayer.wagonsConfig[wagonConfigIndex],
      numberWagonMade:
        currentPlayer.wagonsConfig[wagonConfigIndex].numberWagonMade - 1,
    };
    const updatedPlayer: Player = {
      ...currentPlayer,
      wagonsPoints: currentPlayer.wagonsPoints - value,
      wagonsConfig: currentPlayer.wagonsConfig.map((wagonConfig, index) => {
        if (index === wagonConfigIndex) {
          return updatedWagonConfig;
        }
        return wagonConfig;
      }),
    };
    const updatedGame: Game = {
      ...game,
      players: game.players.map((player) =>
        player.name === currentPlayer.name ? updatedPlayer : player
      ),
    };
    setGame(updatedGame);
    setCurrentPlayer(updatedPlayer);
    setTotalWagons((t) => t - wagons);
    window.localStorage.setItem("game", JSON.stringify(updatedGame));
  }

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

  const getPositiveTickets = () => {
    const positiveTickets = currentPlayer.ticketConfig.filter(
      (ticket) => Number(ticket) > 0
    );
    return positiveTickets.length === 0
      ? `0 trajet sur ${currentPlayer.ticketConfig.length} complété`
      : positiveTickets.length === 1
      ? `1 trajet sur ${currentPlayer.ticketConfig.length} complété`
      : `${positiveTickets.length} trajets sur ${currentPlayer.ticketConfig.length} complétés`;
  };

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
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Points des routes</h2>
          <h3>Score courant : {currentPlayer.wagonsPoints}</h3>
          <div
            className={`${backgroundLight} p-4 border-2 ${borderColor} rounded-lg`}
          >
            <div className="text-2xl">
              {currentPlayer?.wagonsConfig?.map((wagonConfig, index) => (
                <div className="flex items-center space-x-2 mb-3">
                  <span className={``}>{wagonConfig.numberWagons}</span>
                  <div className="flex flex-1">
                    {Array.from(
                      Array(wagonConfig.numberWagons),
                      (routePoint, index) => {
                        return (
                          <IoMdTrain key={index} className={`${textIcon}`} />
                        );
                      }
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        retireScore(
                          wagonConfig.pointsWagon,
                          index,
                          wagonConfig.numberWagons
                        )
                      }
                      disabled={wagonConfig.numberWagonMade === 0}
                      className="disabled:opacity-50"
                    >
                      <AiOutlineMinusCircle
                        className={`${textIcon} text-[30px]`}
                      />
                    </button>
                    <span className="w-5 text-center">
                      {wagonConfig.numberWagonMade}
                    </span>
                    <button
                      className="disabled:opacity-50"
                      disabled={
                        totalWagons === numberWagons ||
                        totalWagons + wagonConfig.pointsWagon > numberWagons
                      }
                      onClick={() =>
                        addScore(
                          wagonConfig.pointsWagon,
                          index,
                          wagonConfig.numberWagons
                        )
                      }
                    >
                      <AiOutlinePlusCircle
                        className={`${textIcon} text-[30px]`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* ticketsCounter */}
            {/* bonusCounter */}
            {/* Total wagons */}
            <p>{`Wagons restants : ${numberWagons - totalWagons}`}</p>
          </div>
        </div>

        {/* ticketsCounter */}
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

        {/* bonusCounter */}

        <div className="text-neutral-700">
          <h2 className="text-xl font-semibold">Points des bonus</h2>
          <h3>Score courant : {currentPlayer.rideTicketPoints}</h3>
          <div
            className={`${backgroundLight} p-4 border-2 ${borderColor} rounded-lg`}
          ></div>
        </div>
      </div>
      {isModalOpen && <ModalTicketPoints setIsModalOpen={setIsModalOpen} />}
    </>
  ) : null;
}
