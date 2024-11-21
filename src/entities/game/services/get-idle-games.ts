import { GameIdleEntity } from '../domain';
import { gameRepository } from "../repositories/game";

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const gamesList = await gameRepository.gamesList({
    status: 'IDLE'
  });

  return gamesList as GameIdleEntity[];
}
