import { TNullable } from "@/shared/lib/types";

import { GameId, UserId } from "@/kernel/ids";

export type GameStatusEntity = GameEntity["status"];
export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  field: Field;
  status: "idle";
};

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "in-progress";
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "game-over";
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "game-over-draw";
};

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = TNullable<GameSymbol>[];
export type GameSymbol = string;

const GameSymbols = {
  X: "X",
  O: "O",
};

export const getGameCurrentStep = (game: GameEntity) => {
  const symbolIds = game.field.filter(Boolean).length;

  return symbolIds % 2 === 0 ? GameSymbols.X : GameSymbols.O;
};

export const getNextSymbol = (gameSymbol: GameSymbol) => {
  if (gameSymbol === GameSymbols.X) {
    return GameSymbols.O;
  }

  return GameSymbols.X;
};
