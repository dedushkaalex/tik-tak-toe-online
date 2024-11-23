import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

export const AuthFormLayout = ({
  actions,
  description,
  fields,
  link,
  title,
  action,
  error,
}: {
  title: string;
  description: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  action: (formData: FormData) => void
  error: React.ReactNode;
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          {fields}
          {error}
          <div className="mt-6 flex flex-col gap">{actions}</div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">{link}</CardFooter>
    </Card>
  );
};
