import { EventsChannel } from "@/shared/lib/events";

import { GameDomain } from "@/entities/game";

import { GameId } from "@/kernel/ids";

type GameEvent = {
  type: "game-changed";
  data: GameDomain.GameEntity;
};

type Listener = (game: GameEvent) => void;

class GameEventsService {
  events = new EventsChannel("game");

  addListener(gameId: GameId, listener: Listener) {
    return this.events.concume(gameId, (data) => {
      listener(data as GameEvent);
    });
  }

  emit(game: GameDomain.GameEntity) {
    return this.events.emit(game.id, {
      type: "game-changed",
      data: game,
    } satisfies GameEvent);
  }
}

export const gameEvents = new GameEventsService();
