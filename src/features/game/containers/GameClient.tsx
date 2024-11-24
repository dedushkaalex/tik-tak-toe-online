"use client";

import { GameDomain } from "@/entities/game";

import { useGame } from "../model/useGame";
import { GameField } from "../ui/GameField";
import { GameLayout } from "../ui/GameLayout";
import { GamePlayers } from "../ui/GamePlayers";
import { GameStatus } from "../ui/GameStatus";

export function GameClient({ defaultGame }: { defaultGame: GameDomain.GameEntity }) {
  const { game = defaultGame, isPending,  } = useGame(defaultGame.id);

  if (!game || isPending) {
    return <GameLayout status={"Загрузка"} />;
  }
  
  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
