export type Game = {
  id: number;
  players: [Player, Player, Player?, Player?, Player?]; //max 5 players
};

export type Player = {
  customName?: string;
  name: PlayerName;
  colorbg: BgColor;
  mainColor: MainColor;
  rountesPoints: number;
  rideTicketPoints: number;
  longestRoutePoints: number;
};

type PlayerName = "Red" | "Blue" | "Green" | "Yellow" | "Black";
type BgColor =
  | "red-300"
  | "blue-300"
  | "green-300"
  | "yellow-300"
  | "black-300";
type MainColor =
  | "red-600"
  | "blue-600"
  | "green-600"
  | "yellow-600"
  | "black-600";
