"use client";

import { useEventsSource } from "@/shared/lib/sse/client";

import { GameEntity } from "@/entities/game/domain";

import { GameId } from "@/kernel/ids";

import { GameField } from "../ui/GameField";
import { GameLayout } from "../ui/GameLayout";
import { GamePlayers } from "../ui/GamePlayers";
import { GameStatus } from "../ui/GameStatus";

export function Game({ gameId }: { gameId: GameId }) {
  const { dataStream, errorStream } = useEventsSource<any>(`/game/${gameId}/stream`, 1);

  const game: GameEntity = {
    id: "1",
    creator: {
      id: "1",
      login: "test",
      rating: 1000,
    },
    status: "idle",
    field: [null, null, null, "O", "X", null, null, null, null],
  };
  return <div>{dataStream}</div>;
  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
