import {
  BonusConfig,
  Game,
  Player,
  PointValue,
  WagonConfig,
} from "./types/Game.type";

const defaultWagonConfig: WagonConfig[] = [
  {
    numberWagons: 1,
    pointsWagon: 1,
    numberWagonMade: 0,
  },
  {
    numberWagons: 2,
    pointsWagon: 2,
    numberWagonMade: 0,
  },
  {
    numberWagons: 3,
    pointsWagon: 4,
    numberWagonMade: 0,
  },
  {
    numberWagons: 4,
    pointsWagon: 7,
    numberWagonMade: 0,
  },
  {
    numberWagons: 6,
    pointsWagon: 15,
    numberWagonMade: 0,
  },
  {
    numberWagons: 8,
    pointsWagon: 21,
    numberWagonMade: 0,
  },
];
const defaultBonusConfig: BonusConfig = {
  hasLongestRoute: false,
  longestRoutePoints: 10,
  railwayStationPoints: 4,
  railwayStationRemaining: 4,
};
export const numberWagons: number = 45;

const defaultBonusPoints = () => {
  let score: number = 0;
  defaultBonusConfig.hasLongestRoute &&
    (score += defaultBonusConfig.longestRoutePoints);
  defaultBonusConfig.railwayStationRemaining > 0 &&
    (score +=
      defaultBonusConfig.railwayStationRemaining *
      defaultBonusConfig.railwayStationPoints);
  return score;
};

export const defaultPlayers: Player[] = [
  {
    name: "Joueur rouge",
    mainColor: "red",
    wagonsPoints: 0,
    remainingWagons: numberWagons,
    rideTicketPoints: 0,
    wagonsConfig: defaultWagonConfig,
    ticketConfig: [],
    bonusConfig: defaultBonusConfig,
    bonusPoints: defaultBonusPoints(),
  },
  {
    name: "Joueur bleu",
    mainColor: "blue",
    wagonsPoints: 0,
    remainingWagons: numberWagons,
    rideTicketPoints: 0,
    wagonsConfig: defaultWagonConfig,
    ticketConfig: [],
    bonusConfig: defaultBonusConfig,
    bonusPoints: defaultBonusPoints(),
  },
  {
    name: "Joueur vert",
    mainColor: "green",
    wagonsPoints: 0,
    remainingWagons: numberWagons,
    rideTicketPoints: 0,
    wagonsConfig: defaultWagonConfig,
    ticketConfig: [],
    bonusConfig: defaultBonusConfig,
    bonusPoints: defaultBonusPoints(),
  },
  {
    name: "Joueur jaune",
    mainColor: "yellow",
    wagonsPoints: 0,
    remainingWagons: numberWagons,
    rideTicketPoints: 0,
    wagonsConfig: defaultWagonConfig,
    ticketConfig: [],
    bonusConfig: defaultBonusConfig,
    bonusPoints: defaultBonusPoints(),
  },
  {
    name: "Joueur noir",
    mainColor: "black",
    wagonsPoints: 0,
    remainingWagons: numberWagons,
    rideTicketPoints: 0,
    wagonsConfig: defaultWagonConfig,
    ticketConfig: [],
    bonusConfig: defaultBonusConfig,
    bonusPoints: defaultBonusPoints(),
  },
];
export const wagonsPoints: PointValue[] = [
  { routeWagons: 1, routePoints: 1 },
  { routeWagons: 2, routePoints: 2 },
  { routeWagons: 3, routePoints: 4 },
  { routeWagons: 4, routePoints: 7 },
  { routeWagons: 6, routePoints: 15 },
  { routeWagons: 8, routePoints: 21 },
];

export const routesPoints: number[] = [21, 20, 13, 12, 11, 10, 9, 8, 7, 6, 5];
export const longestRoutePoint: number = +10;

export function handleAddPlayer(
  namePlayer: string,
  game: Game,
  gamePlayersDefault: Player[],
  setGame: (game: Game) => void,
  setGamePlayersDefault: (players: Player[]) => void
) {
  const playerToAdd: Player = defaultPlayers.filter(
    (player) => player.name === namePlayer
  )[0];
  //add player to game
  setGame({ ...game, players: [...game.players, playerToAdd] });
  //remove player from default players
  setGamePlayersDefault(
    gamePlayersDefault.filter((player) => player.name !== namePlayer)
  );
}

export function handleDeletePlayer(
  namePlayer: string,
  game: Game,
  gamePlayersDefault: Player[],
  setGame: (game: Game) => void,
  setGamePlayersDefault: (players: Player[]) => void
) {
  const newDeletedPlayer: Player = game.players.filter(
    (player) => player.name === namePlayer
  )[0];
  const newPlayers = game.players.filter(
    (player) => player.name !== namePlayer
  );

  //add array of players without deleted player
  setGame({ ...game, players: newPlayers });

  //add deleted player to default players
  setGamePlayersDefault([...gamePlayersDefault, newDeletedPlayer]);
}

export function handleResetPlayers(
  setGamePlayersDefault: (players: Player[]) => void,
  setGame: (game: Game) => void,
  game: Game
) {
  setGame({ ...game, players: [] });
  setGamePlayersDefault(defaultPlayers);
}

export function getColorPlayer(mainColor: Player["mainColor"]) {
  let color = {
    backgroundSolid: "",
    textSolid: "text-white",
    ringSolid: "ring-white",
    backgroundLight: "",
    textLight: "text-gray-500",
    borderColor: "border-gray-500",
    textIcon: "text-gray-500",
  };

  switch (mainColor) {
    case "red":
      color = {
        ...color,
        backgroundSolid: "bg-red-500",
        backgroundLight: "bg-red-200",
        ringSolid: "ring-red-500",
        borderColor: "border-red-500",
        textIcon: "text-red-500",
      };
      break;
    case "blue":
      color = {
        ...color,
        backgroundSolid: "bg-blue-500",
        backgroundLight: "bg-blue-200",
        ringSolid: "ring-blue-500",
        borderColor: "border-blue-500",
        textIcon: "text-blue-500",
      };
      break;
    case "green":
      color = {
        ...color,
        backgroundSolid: "bg-green-500",
        backgroundLight: "bg-green-200",
        ringSolid: "ring-green-500",
        borderColor: "border-green-500",
        textIcon: "text-green-500",
      };
      break;
    case "yellow":
      color = {
        ...color,
        backgroundSolid: "bg-yellow-500",
        backgroundLight: "bg-yellow-200",
        ringSolid: "ring-yellow-500",
        borderColor: "border-yellow-700",
        textIcon: "text-amber-500",
      };
      break;
    case "black":
      color = {
        ...color,
        backgroundSolid: "bg-black",
        backgroundLight: "bg-neutral-300",
        ringSolid: "ring-black",
      };
      break;
  }
  return color;
}

export function getPlayerResult(player: Player) {
  return Number(
    player.wagonsPoints + player.rideTicketPoints + player.bonusPoints
  );
}

export function getPlayer(playersState: Player[], namePlayer: Player["name"]) {
  return playersState.filter((player) => player.name === namePlayer)[0];
}

export function getLocalStorageGame(): Game | null {
  if (window.localStorage.getItem("game")) {
    const gameKey = window.localStorage.getItem("game");
    const localGame: Game = JSON.parse(gameKey as string);

    return localGame;
  }
  return null;
}

export function deleteTicket(indexToDelete: number, tickets: number[]) {
  const newTickets = tickets.filter((ticket, index) => index !== indexToDelete);
  return newTickets;
}

export function calculateTicketPoint(tickets: number[]) {
  let ticketPoints = 0;
  tickets.map((ticket) => {
    ticketPoints += ticket;
  });
  return ticketPoints;
}

export function calculateBonusPointsRailwayStation(
  playerBonusConfig: Player["bonusConfig"]
) {
  let score = 0;
  if (playerBonusConfig.railwayStationRemaining > 0) {
    let railwayStationScore =
      playerBonusConfig.railwayStationRemaining *
      playerBonusConfig.railwayStationPoints;
    score += railwayStationScore;
  }
  return score;
}
