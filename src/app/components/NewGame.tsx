"use client";

import { useRecoilState } from "recoil";
import { gameState, playersState } from "../library/atom/gameState";
import { FaCircle } from "react-icons/fa";
import { Game, Player } from "../library/types/Game.type";
import { FiDelete } from "react-icons/fi";
import {
  defaultPlayers,
  handleAddPlayer,
  handleDeletePlayer,
} from "../library/configGame";
import { useEffect, useState } from "react";

const PlayerWindow = ({
  player,
  deletePlayer,
  numberPlayers,
}: {
  player: Player;
  deletePlayer: () => void;
  numberPlayers: number;
}) => {
  let textColor;
  switch (player.mainColor) {
    case "red":
      textColor = "text-red-500";
      break;
    case "blue":
      textColor = "text-blue-500";
      break;
    case "green":
      textColor = "text-green-500";
      break;
    case "yellow":
      textColor = "text-yellow-500";
      break;
    case "black":
      textColor = "text-black-500";
      break;
    default:
      textColor = "text-black-500";
  }

  return (
    <div className="flex items-center p-4 space-x-4 bg-gray-200 my-4 rounded-full shadow-md">
      <FaCircle className={`${textColor} text-4xl`} />
      <p className="flex-1">{player.name}</p>
      {numberPlayers > 2 && (
        <FiDelete
          className="text-2xl text-red-500 hover:scale-125 transition-transform duration-200 cursor-pointer"
          onClick={deletePlayer}
        />
      )}
    </div>
  );
};
const AddPlayerButton = ({
  name,
  mainColor,
  handleAdd,
  disabled,
}: {
  name: string;
  mainColor: string;
  handleAdd: () => void;
  disabled: boolean;
}) => {
  let color;
  switch (mainColor) {
    case "red":
      color = "bg-red-500";
      break;
    case "blue":
      color = "bg-blue-500";
      break;
    case "green":
      color = "bg-green-500";
      break;
    case "yellow":
      color = "bg-yellow-500";
      break;
    case "black":
      color = "bg-gray-800";
      break;
  }
  return (
    <button
      key={name}
      onClick={handleAdd}
      disabled={disabled}
      className={`${color} px-3 py-1.5 rounded-full text-[10px] text-white sm:text-sm disabled:opacity-20`}
    >
      {name}
    </button>
  );
};

export default function NewGame() {
  //game
  const [game, setGame] = useRecoilState(gameState);
  //default players
  const [gamePlayersDefault, setGamePlayersDefault] =
    useRecoilState(playersState);
  const [hasGame, setHasGame] = useState(false);

  const handleDelete = (namePlayer: string) => {
    handleDeletePlayer(
      namePlayer,
      game,
      gamePlayersDefault,
      setGame,
      setGamePlayersDefault
    );
  };
  const handleAdd = (namePlayer: string) => {
    !window.localStorage.getItem("game") &&
      handleAddPlayer(
        namePlayer,
        game,
        gamePlayersDefault,
        setGame,
        setGamePlayersDefault
      );
  };

  function handleGame() {
    if (window.localStorage?.getItem("game")) {
      const gameStringified = window.localStorage.getItem("game");
      const game: Game = gameStringified && JSON.parse(gameStringified);
      setGame(game);
      setHasGame(true);
      const players = game.players;
      setGamePlayersDefault(
        defaultPlayers.filter((defaultPlayer) => {
          return !players.some((player) => player.name === defaultPlayer.name);
        })
      );
    }
  }

  useEffect(() => {
    handleGame();
  }, []);

  return (
    <div>
      <div className="flex space-x-3 my-4">
        {gamePlayersDefault.map((player: Player, index: number) => (
          <AddPlayerButton
            key={index}
            disabled={hasGame}
            name={player.name}
            mainColor={player.mainColor}
            handleAdd={() => handleAdd(player.name)}
          />
        ))}
      </div>
      {game.players.map((player: Player) => {
        return (
          <PlayerWindow
            player={player}
            key={player.name}
            deletePlayer={() => handleDelete(player.name)}
            numberPlayers={game.players.length}
          />
        );
      })}
    </div>
  );
}
