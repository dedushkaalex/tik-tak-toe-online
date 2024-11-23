import cuid from "cuid";

import { left, right } from "@/shared/lib/either";

import { DEFAULT_RATING } from "../domain";
import { userRepository } from "../repositories/user";
import { passwordService } from "./password";

export const createUser = async ({ login, password }: { login: string; password: string }) => {
  const isUserLoginExist = await userRepository.getUser({
    login,
  });

  if (isUserLoginExist) return left("user-login-exists" as const);

  const { hash, salt } = await passwordService.hashPassword(password);

  const newUser = await userRepository.saveUser({
    id: cuid(),
    login,
    rating: DEFAULT_RATING,
    passwordHash: hash,
    salt,
  });

  return right(newUser);
};
