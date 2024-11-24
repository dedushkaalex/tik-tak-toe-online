import { GameId } from "@/kernel/ids";

import { gameRepository } from "../repositories/game";

export async function getGameById(gameId: GameId) {
  return gameRepository.getGame({ id: gameId });
}
