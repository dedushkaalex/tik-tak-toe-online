"use client";

import { useActionState } from "@/shared/lib/react";

import { AuthFields } from "@/features/auth/ui/AuthFields";
import { AuthFormLayout } from "@/features/auth/ui/AuthFormLayout";
import { AuthFormLink } from "@/features/auth/ui/AuthFormLink";
import { AuthSubmitButton } from "@/features/auth/ui/AuthSubmitButton";
import { ErrorMsg } from "@/features/auth/ui/ErrorMsg";

import { SignUpFormState, signUpAction } from "../actions/sign-up";

export const SignUpForm = () => {
  const [formState, action, isPending] = useActionState(signUpAction, {} as SignUpFormState);

  return (
    <AuthFormLayout
      title={"Зарегистрироваться"}
      description={"Для того, чтобы играть - создайте аккаунт"}
      fields={<AuthFields {...formState}/>}
      actions={<AuthSubmitButton disabled={isPending}>Зарегистрироваться</AuthSubmitButton>}
      link={<AuthFormLink href="/sign-in" linkText="Войдите" text="Уже есть аккаунт?" />}
      error={<ErrorMsg error={formState.errors?._errors} />}
      action={action}
    />
  );
};
