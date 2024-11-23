import * as z from "zod";
import { Game, GameStatus, Prisma, User } from "@prisma/client";

import { prisma } from "@/shared/lib/db";
import { removePassword } from "@/shared/lib/password";
import { TNullable } from "@/shared/lib/types";

import { GameEntity, GameIdleEntity, GameInProgressEntity, GameOverDrawEntity, GameStatusEntity } from "../domain";

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  // include подгрузит relation связи

  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  return games.map(dbGameToGameEntity);
}

export async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      id: game.id,
      field: Array(9).fill(null),
      players: {
        connect: [{ id: game.creator.id }],
      },
      status: gameStatusEntityToDbGameStatus(game.status),
    },
    include: {
      players: true,
      winner: true,
    }
    
  });

  return dbGameToGameEntity(createdGame);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: User[];
    winner?: TNullable<User>;
  },
): GameEntity {
  const players = game.players.map(removePassword);

  switch (game.status) {
    case "IDLE":
      const [creator] = players;

      if (!creator) {
        throw new Error("Создатель должен быть в комнате");
      }

      return {
        creator,
        id: game.id,
        status: "idle",
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    case "GAME_OVER":
      if (!game.winner) {
        throw new Error("требуется победитель в статусе game_over");
      }

      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: "game-over",
        winner: removePassword(game.winner),
      };
    case "GAME_OVER_DRAW":
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: "game-over-draw",
      } satisfies GameOverDrawEntity;
    case "IN_PROGRESS":
      return {
        field: fieldSchema.parse(game.field),
        id: game.id,
        players: players,
        status: "in-progress",
      } satisfies GameInProgressEntity;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gameStatusEntityToDbGameStatus(status: GameStatusEntity): GameStatus {
  switch (status) {
    case "game-over":
      return "GAME_OVER";
    case "game-over-draw":
      return "GAME_OVER_DRAW";
    case "idle":
      return "IDLE";
    case "in-progress":
      return "IN_PROGRESS";
  }
}

export const gameRepository = {
  gamesList,
  createGame
};
