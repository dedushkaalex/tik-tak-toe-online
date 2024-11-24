import * as z from "zod";
import { Game, GamePlayer, GameStatus, Prisma, User } from "@prisma/client";

import { prisma } from "@/shared/lib/db";
import { TNullable } from "@/shared/lib/types";

import { GameId } from "@/kernel/ids";

import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameStatusEntity,
  PlayerEntity,
} from "../domain";

const gameInclude = {
  winner: {
    include: {
      user: true,
    },
  },
  players: {
    include: {
      user: true,
    },
  },
};

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  // include подгрузит relation связи

  const games = await prisma.game.findMany({
    where,
    include: gameInclude,
  });

  return games.map(dbGameToGameEntity);
}

export async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: gameInclude,
  });

  if (game) {
    return dbGameToGameEntity(game);
  }

  return undefined;
}

export async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      id: game.id,
      field: game.field,
      players: {
        create: {
          index: 0,
          userId: game.creator.id,
        },
      },
      status: gameStatusEntityToDbGameStatus(game.status),
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(createdGame);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: Array<GamePlayer & { user: User }>;
    winner?: TNullable<GamePlayer & { user: User }>;
  },
): GameEntity {
  const players = game.players.sort((a, b) => a.index - b.index).map(dbPlayerToPlayer);

  switch (game.status) {
    case "IDLE":
      const [creator] = players;

      if (!creator) {
        throw new Error("Создатель должен быть в комнате");
      }

      return {
        creator: creator,
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
        winner: dbPlayerToPlayer(game.winner),
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

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await prisma.game.update({
      where: { id: gameId },
      data: {
        players: {
          create: {
            index: 1,
            userId: player.id,
          },
        },
        status: "IN_PROGRESS",
      },

      include: gameInclude,
    }),
  );
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

export const dbPlayerToPlayer = (dbPlayer: GamePlayer & { user: User }): PlayerEntity => {
  return {
    id: dbPlayer.user.id,
    login: dbPlayer.user.login,
    rating: dbPlayer.user.rating,
  };
};
export const gameRepository = {
  gamesList,
  createGame,
  getGame,
  startGame,
};
