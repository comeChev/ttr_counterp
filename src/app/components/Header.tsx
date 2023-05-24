"use client";
import Image from "next/image";
import useIsMobile from "../library/hooks/useIsMobile";
import Link from "next/link";
import { useRecoilState } from "recoil";
import {
  defaultGame,
  gameState,
  playersState,
} from "../library/atom/gameState";
import { defaultPlayers } from "../library/configGame";
import { useParams, usePathname } from "next/navigation";

export default function Header({ mainFont }: { mainFont: string }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [game, setGame] = useRecoilState(gameState);
  const [gamePlayersDefault, setGamePlayersDefault] =
    useRecoilState(playersState);

  return (
    <header className="flex items-center sm:justify-between m-4">
      {isMobile ? (
        <Link href="/">
          <Image
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh3.googleusercontent.com%2FFPhQbcaTgNW0eXnOvCOYUPhO-DhbBj3h64LmJaAVtUJpWrgnmig-vtHFrbxJETpghQ%3Dw300&f=1&nofb=1&ipt=87a675d04e6ba4a20d78da62a1532a6760a72f08c6149012216696210c0ea249&ipo=images"
            alt="TicketToRide logo"
            height={200}
            width={200}
            // mobile
            className="mr-4 h-24 w-24"
          />
        </Link>
      ) : (
        <Link href="/">
          <Image
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdespelvogel.com%2Fwp-content%2Fuploads%2F2019%2F08%2Ftt-title-932.png&f=1&nofb=1&ipt=7a18f3461d5e3546bb13fbb147295fe43759358960edb031c55263d977e03a71&ipo=images"
            alt="TicketToRide logo"
            height={400}
            width={400}
            //desktop
          />
        </Link>
      )}
      <div className="text-end ">
        <h1 className={`font-bold text-2xl px-4 ${mainFont}`}>
          <span className={mainFont}>TCter</span>, compter vos points n'est plus
          un problème !
        </h1>
        {pathname !== "/" && (
          <Link
            href="/"
            className="text-lg font-light text-neutral-600 px-4"
            onClick={() => {
              window.localStorage.removeItem("game");
              setGame(defaultGame);
              setGamePlayersDefault(defaultPlayers);
            }}
          >
            Recommencer une partie
          </Link>
        )}
      </div>
    </header>
  );
}
