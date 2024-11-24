import { useEventsSource } from "@/shared/lib/sse/client";

import { GameDomain } from "@/entities/game";
import { routes } from '@/kernel/routes';
import { GameId } from '@/kernel/ids';

export function useGame(gameId: GameId) {
  console.log(gameId)
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(routes.gameStream(gameId));

  return {
    game: dataStream,
    isPending,
  };
}
