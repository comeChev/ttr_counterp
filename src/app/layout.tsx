import Header from "./components/Header";
import "./globals.css";
import { Lobster } from "@next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "TCter, compter facilement vos points à Ticket to Ride",
  description:
    "TCter, une application simple pour les joueurs de Ticket to Ride, pour comptabiliser les points en fin de tour.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="max-w-6xl mx-auto">
        <Header mainFont={lobster.className} />
        {children}
      </body>
    </html>
  );
}
