export type Game = {
  id: number;
  players: Player[]; //max 5 players
};

export type Player = {
  customName?: string;
  name: PlayerName;
  mainColor: MainColor;
  remainingWagons: number;
  wagonsConfig: WagonConfig[];
  wagonsPoints: number;
  ticketConfig: number[];
  rideTicketPoints: number;
  bonusConfig: BonusConfig;
  bonusPoints: number;
};

export type WagonConfig = {
  numberWagons: number;
  pointsWagon: number;
  numberWagonMade: number;
};

export type BonusConfig = {
  hasLongestRoute: boolean;
  longestRoutePoints: number;
  railwayStationPoints: number;
  railwayStationRemaining: number;
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
