import { GameDomain } from "@/entities/game";
import { GameEntity } from "@/entities/game/domain";

export function GameStatus({ game }: { game: GameEntity }) {
  switch (game.status) {
    case "idle":
      return <div className="text-lg">Ожидание игрока</div>;
    case "game-over": {
      const currentSymbol = GameDomain.getGameCurrentStep(game);
      return <div className="text-lg">Победитель: {currentSymbol}</div>;
    }
    case "game-over-draw":
      return <div className="text-lg">Ничья</div>;
    case "in-progress": {
      const currentSymbol = GameDomain.getGameCurrentStep(game);
      return <div className="text-lg">Ход: {currentSymbol}</div>;
    }
  }
}
