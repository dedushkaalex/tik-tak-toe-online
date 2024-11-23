import { Prisma, User } from "@prisma/client";

import { prisma } from "@/shared/lib/db";

import { UserEntity } from "../domain";

function saveUser(user: User): Promise<UserEntity> {
  return prisma.user.upsert({
    where: { id: user.id },
    create: user,
    update: user,
  });
}
function getUser(where: Prisma.UserWhereInput) {
  return prisma.user.findFirst({
    where,
  });
}
export const userRepository = {
  saveUser,
  getUser
};
