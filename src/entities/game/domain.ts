import { TNullable } from '@/shared/lib/types';

export type GameStatusEntity = GameEntity["status"];
export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity;

export type GameIdleEntity = {
  id: string;
  creator: PlayerEntity;
  status: "idle";
};

export type GameInProgressEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: "in-progress";
};

export type GameOverEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: "game-over";
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: "game-over-draw";
};

export type PlayerEntity = {
  id: string;
  login: string;
  rating: number;
};

export type Field = TNullable<GameSymbol>[];
export type GameSymbol = string;
