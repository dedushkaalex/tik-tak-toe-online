/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { mapLeft, matchEither, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";

import { createGameAction } from "../actions/createGameAction";
import { startTransition } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */

export function CreateButton() {
  const [state, dispatch, isPending] = useActionState(createGameAction, right(undefined));

  return (
    <div className="flex flex-col gap-1">
      <Button
        disabled={isPending}
        onClick={() => startTransition(dispatch)}
        error={mapLeft(
          state,
          (e) =>
            ({
              ["can-create-only-one-game"]: "Игрок может создать только одну игру",
              ["user-not-found"]: "Пользователь не найден",
            })[e],
        )}
      >
        Создать игру
      </Button>
    </div>
  );
}
