import { Gamepad2Icon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { getIdleGames } from "@/entities/game/server";

import { routes } from "@/kernel/routes";

import { GameCard } from "../ui/GameCard";
import { Layout } from "../ui/Layout";
import { CreateButton } from './CreateButton';

export async function GamesList() {
  const games = await getIdleGames();
  console.log(games);
  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
          actions={
            <Link href={routes.game(game.id)}>
              <Button>
                <Gamepad2Icon className="w-full h-full" />
                Подключиться
              </Button>
            </Link>
          }
        />
      ))}
    </Layout>
  );
}
