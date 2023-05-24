import { Lobster } from "@next/font/google";
import NewGame from "./components/NewGame";
import ResetButton from "./components/ResetButton";
import StartGameButton from "./components/StartGameButton";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });
const stepSentences = [
  "Définissez le nombres de joueurs",
  "Lancer la partie",
  "Ajouter les trajets réussis ou non",
  "Comptez les wagons",
  "Définissez les bonus",
];

const Step = ({ text, index }: { text: string; index: number }) => {
  return (
    <li className="flex items-center justify-start">
      <div className="flex items-center text-sm my-2 h-20 bg-neutral-200 px-4 py-2 rounded-xl w-full">
        <div
          className={`rounded-full h-8 w-8 flex items-center justify-center `}
        >
          <div className="h-7 w-7 rounded-full bg-neutral-300 text-gray-700 flex items-center justify-center text-xs shadow-sm">
            {index + 1}
          </div>
        </div>
        <p className="ml-2 text-sm sm:text-sm">{text}</p>
      </div>
    </li>
  );
};

export default function Home() {
  return (
    <main className="p-4">
      <h2 className="text-xl">
        Finir une partie de Ticket To Ride{" "}
        <span className="italic text-base">
          (Les Aventuriers du Rail en français)
        </span>
        est toujours compliqué. Les points sont compliqués et longs à compter.
      </h2>
      <p className="text-xl">
        {"Dorénavant, une solution simple s'offre à vous : "}
        <span className={`font-bold ${lobster.className}`}>TCter</span>
      </p>

      <div className="hidden sm:flex my-5">
        <ul className="sm:flex sm:space-x-2 text-sm">
          {stepSentences.map((sentence, index) => (
            <Step key={index} text={sentence} index={index} />
          ))}
        </ul>
      </div>

      <p className="text-center text-4xl pt-5">
        <span className={`font-bold ${lobster.className}`}>TCter</span>{" "}
        {"s'occupe du reste !"}
      </p>
      <div className="flex items-center justify-between mt-20">
        <StartGameButton />
        <ResetButton />
      </div>
      <NewGame />
    </main>
  );
}
