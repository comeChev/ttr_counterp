import { atom } from "recoil";
import { Game, Player } from "../types/Game.type";
import { defaultPlayers } from "../configGame";

export const defaultGame: Game = {
  id: 1,
  players: [] as Player[],
};

export const gameState = atom({
  key: "gameState",
  default: defaultGame as Game,
});

export const playersState = atom({
  key: "playersState",
  default: defaultPlayers,
});

export const currentPlayerState = atom({
  key: "currentPlayerState",
  default: {} as Player,
});
