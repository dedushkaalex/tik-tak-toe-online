'use client';

import { Button } from "@/shared/ui/button";

import { GameDomain } from "@/entities/game";

export function GameField({
  game,
  onCellClick,
}: {
  game: GameDomain.GameEntity;
  onCellClick?: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3">
      {game.field.map((symbol, index) => (
        <Button key={index} variant="outline" className={`rounded-none w-10 h-10 ${symbol ?  'hover:bg-background' : '' }`} onClick={() => onCellClick?.(index)}>
          {symbol ?? ""}
        </Button>
      ))}
    </div>
  );
}
