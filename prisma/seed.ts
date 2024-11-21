/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function generateSeeds(userCount: number) {
  for (let i = 0; i < userCount; i++) {
    const userName = faker.name.firstName(); // Случайное имя пользователя

    const user = await prisma.user.create({
      data: {
        login: userName,
        passwordHash: crypto.randomUUID(), // Генерация случайного пароля
        rating: 1000, // Пример начального рейтинга
      },
    });

    await prisma.game.create({
      data: {
        status: "IDLE",
        players: {
          connect: [{ id: user.id }],
        },
      },
    });
  }
}

async function main() {

  const user_1 = await prisma.user.create({
    data: {
      login: faker.internet.username(),
      passwordHash: faker.internet.password({ length: 10 }),
      rating: faker.number.int({max: 1000}),
    },
  });

  const user_2 = await prisma.user.create({
    data: {
      login: faker.internet.username(),
      passwordHash: faker.internet.password({ length: 10 }),
      rating: faker.number.int({max: 1000}),
    },
  });

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
