import { pbkdf2, randomBytes } from "node:crypto";

async function hashPassword(
  password: string,
  salt = randomBytes(16).toString("hex"),
): Promise<{
  hash: string;
  salt: string;
}> {
  const iterations = 5000;
  const keylen = 64;
  const digest = "sha512";

  const hash = await new Promise<Buffer>((res, rej) => {
    pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
      if (err) {
        rej(err);
      } else {
        res(key);
      }
    });
  });

  return {
    hash: hash.toString("hex"),
    salt,
  };
}

async function comparePassword({ hash, password, salt }: { password: string; hash: string; salt: string }) {
  const existedHash = await hashPassword(password, salt);
  return hash === existedHash.hash;
}

export const passwordService = { comparePassword, hashPassword };
