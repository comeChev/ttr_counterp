import { Lobster } from "@next/font/google";
import { VscDebugStepInto } from "react-icons/vsc";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

const Step = ({ text, color }: { text: string; color: string }) => {
  return (
    <li className="flex items-center text-lg my-2">
      <div
        className={`rounded-full h-8 w-8 flex items-center justify-center ${color} `}
      >
        <VscDebugStepInto className="text-white" />
      </div>
      <p className="ml-4">{text}</p>
    </li>
  );
};

export default function Home() {
  return (
    <main className="p-4">
      <h2 className="text-xl">
        Finir une partie de Ticket To Ride (Les Aventuriers du Rail en français)
        est toujours compliqué. Les points sont compliqués et longs à compter.
      </h2>
      <p className="text-xl">
        Dorénavant, une solution simple s'offre à vous :{" "}
        <span className={`font-bold ${lobster.className}`}>TCter</span>
      </p>
      <div className="my-5 text-lg sm:ml-20">
        <ul className="">
          <Step text="Définissez le nombre de joueurs" color="bg-green-500" />
          <Step
            text="Ajouter les tickets (ceux réussis comme ceux non réalisés)"
            color="bg-yellow-500"
          />
          <Step text="Ajouter les groupes de wagons" color="bg-red-500" />
        </ul>
      </div>
      <p className="text-center text-4xl pt-5">
        <span className={`font-bold ${lobster.className}`}>TCter</span> s'occupe
        du reste !
      </p>
      <div className="flex items-center justify-center mt-20">
        <button className="px-3 py-2.5 bg-blue-500 rounded-md shadow-md text-white hover:bg-blue-600 transition-colors duration-200">
          Commencer une nouvelle partie
        </button>
      </div>
    </main>
  );
}
