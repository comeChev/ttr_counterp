import { useEffect } from "react";
import ListPlayers from "../../components/ListPlayers";
import PlayerPagePoints from "../../components/PlayerPagePoints";

export default function page() {
  return (
    <div className=" flex flex-col sm:flex-row px-6 sm:mt-10 relative mb-20">
      {/* Players List */}
      <ListPlayers />
      {/* PlayerPagePoints */}
      <PlayerPagePoints />
    </div>
  );
}
