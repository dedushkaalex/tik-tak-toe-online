"use client";

import { useActionState } from "@/shared/lib/react";

import { AuthFields } from "@/features/auth/ui/AuthFields";
import { AuthFormLayout } from "@/features/auth/ui/AuthFormLayout";
import { AuthFormLink } from "@/features/auth/ui/AuthFormLink";
import { AuthSubmitButton } from "@/features/auth/ui/AuthSubmitButton";
import { ErrorMsg } from "@/features/auth/ui/ErrorMsg";

import { SignInFormState, signInAction } from "../actions/sign-in";
import { routes } from '@/kernel/routes';

export const SignInForm = () => {
  const [formState, action, isPending] = useActionState(signInAction, {} as SignInFormState);
  return (
    <AuthFormLayout
      title={"Вход"}
      description={"Введите свои учетные данные для доступа к вашей учетной записи"}
      fields={<AuthFields {...formState} />}
      actions={<AuthSubmitButton disabled={isPending}>Вход</AuthSubmitButton>}
      link={<AuthFormLink href={routes.signUp()} linkText="Зарегистрируйтесь" text="У вас нет учетной записи?" />}
      error={<ErrorMsg error={formState.errors?._errors} />}
      action={action}
    />
  );
};
