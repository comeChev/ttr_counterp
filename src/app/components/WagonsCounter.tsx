"use client";

import { useRecoilState } from "recoil";
import { currentPlayerState, gameState } from "../library/atom/gameState";
import { getColorPlayer, numberWagons } from "../library/configGame";
import { IoMdTrain } from "react-icons/io";
import { Game, Player, WagonConfig } from "../library/types/Game.type";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function WagonsCounter() {
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [game, setGame] = useRecoilState(gameState);
  const { backgroundLight, borderColor, textIcon } = getColorPlayer(
    currentPlayer?.mainColor
  );

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
      remainingWagons: currentPlayer.remainingWagons + wagons,
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
    window.localStorage.setItem("game", JSON.stringify(updatedGame));
  }

  function addScore(value: number, wagonConfigIndex: number, wagons: number) {
    const updatedWagonConfig: WagonConfig = {
      ...currentPlayer.wagonsConfig[wagonConfigIndex],
      numberWagonMade:
        currentPlayer.wagonsConfig[wagonConfigIndex].numberWagonMade + 1,
    };
    const updatedPlayer: Player = {
      ...currentPlayer,
      //retire wagons from remainingWagons
      remainingWagons: currentPlayer.remainingWagons - wagons,
      //add points to wagonsPoints
      wagonsPoints: currentPlayer.wagonsPoints + value,
      //update wagonsConfig of currentPlayer
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
    window.localStorage.setItem("game", JSON.stringify(updatedGame));
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">Points des routes</h2>
      <h3>Score courant : {currentPlayer.wagonsPoints}</h3>
      <div
        className={`${backgroundLight} p-4 border-2 ${borderColor} rounded-lg`}
      >
        <div className="text-lg sm:text-2xl">
          {currentPlayer?.wagonsConfig?.map((wagonConfig, index) => (
            <div className="flex items-center space-x-2 mb-3" key={index}>
              <span className={``}>{wagonConfig.numberWagons}</span>
              {/* Array of wagons icons depending on number wagons defined */}
              <div className="flex flex-1">
                {Array.from(
                  Array(wagonConfig.numberWagons),
                  (routePoint, index) => {
                    return <IoMdTrain key={index} className={`${textIcon}`} />;
                  }
                )}
              </div>

              <div className="flex items-center space-x-3">
                {/* retire button */}
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
                  <AiOutlineMinusCircle className={`${textIcon} text-[30px]`} />
                </button>

                {/* number routes made with this type of train */}
                <span className="w-5 text-center">
                  {wagonConfig.numberWagonMade}
                </span>

                {/* add button */}
                <button
                  className="disabled:opacity-50"
                  disabled={
                    currentPlayer.remainingWagons - wagonConfig.numberWagons < 0
                  }
                  onClick={() =>
                    addScore(
                      wagonConfig.pointsWagon,
                      index,
                      wagonConfig.numberWagons
                    )
                  }
                >
                  <AiOutlinePlusCircle className={`${textIcon} text-[30px]`} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* ticketsCounter */}
        {/* bonusCounter */}
        {/* Total wagons */}
        <p>{`Wagons restants : ${currentPlayer.remainingWagons}`}</p>
      </div>
    </div>
  );
}
