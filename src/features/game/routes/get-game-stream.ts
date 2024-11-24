import { NextRequest } from "next/server";

import { sseStream } from "@/shared/lib/sse/server";

import { getGameById } from "@/entities/game/server";

import { GameId } from "@/kernel/ids";

import { gameEvents } from "../services/game-events";

export const getGameStream = async (req: NextRequest, { params }: { params: Promise<{ id: GameId }> }) => {
  const gameId = (await params).id;

  const game = await getGameById(gameId);

  if (!game) {
    return new Response(`Game not found: id - ${gameId}`, {
      status: 404,
    });
  }

  const { addCloseListener, response, write } = sseStream(req);

  write(game);

  addCloseListener(
    await gameEvents.addListener(game.id, (e) => {
      console.log(JSON.stringify(e), 'event')
      write(e.data);
    }),
  );

  return response;
};
