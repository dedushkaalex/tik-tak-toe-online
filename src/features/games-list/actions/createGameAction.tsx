"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/shared/lib/db";
import { left } from "@/shared/lib/either";

import { createGame } from "@/entities/game/server";

export const createGameAction = async () => {
  const user = await prisma.user.findFirst();

  if (!user) {
    return left("user-not-found" as const);
  }

  const gameResult = await createGame(user);

  if (gameResult.type === "right") {
    redirect(`/game/${gameResult.value.id}`);
  }

  return gameResult;
};
