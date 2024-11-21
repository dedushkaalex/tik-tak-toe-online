import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  const game1 = prisma.game.create({
    data: {
      name: "game-1",
    },
  });
  const game2 = prisma.game.create({
    data: {
      name: "game-2",
    },
  });

  await Promise.all([game1, game2]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
