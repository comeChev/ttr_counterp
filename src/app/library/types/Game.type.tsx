export type Game = {
  id: number;
  players: Player[]; //max 5 players
};

export type Player = {
  customName?: string;
  name: PlayerName;
  mainColor: MainColor;
  wagonsPoints: number;
  rideTicketPoints: number;
  longestRoutePoints: number;
  wagonsConfig: WagonConfig[];
  ticketConfig: number[];
};

export type WagonConfig = {
  numberWagons: number;
  pointsWagon: number;
  numberWagonMade: number;
};

type PlayerName =
  | "Joueur rouge"
  | "Joueur bleu"
  | "Joueur vert"
  | "Joueur jaune"
  | "Joueur noir";
type MainColor = "red" | "blue" | "green" | "yellow" | "black";

export type PointValue = {
  routePoints: number;
  routeWagons: number;
};
