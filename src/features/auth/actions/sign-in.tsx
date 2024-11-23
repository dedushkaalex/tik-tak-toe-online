"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { sessionService, verifyUserPassword } from "@/entities/user/server";

export type SignInFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: SignInFormState, formData: FormData): Promise<SignInFormState> => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.format();
    return {
      formData,
      errors: {
        login: formattedErrors.login?._errors.join(", "),
        password: formattedErrors.password?._errors.join(", "),
        _errors: formattedErrors._errors.join(", "),
      },
    };
  }

  const userResult = await verifyUserPassword(result.data);

  if (userResult.type === "right") {
    await sessionService.addSession(userResult.value);

    redirect("/");
  }

  const errors = {
    ["wron-login-or-password"]: "Неверный логин или пароль",
  }[userResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};
