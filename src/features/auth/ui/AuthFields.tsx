import { useId } from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export const AuthFields = ({
  formData,
  errors,
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
}) => {
  const loginId = useId();
  const passwordId = useId();
  console.log(JSON.stringify(errors))
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Логин</Label>
        <Input
          id={loginId}
          name="login"
          placeholder="Введите ваш логин"
          required
          defaultValue={formData?.get("login")?.toString()}
        />
        {errors?.login && <div className='text-destructive'>{errors.login}</div>}
      </div>

      <div className="space-y-2 mt-2">
        <Label htmlFor={passwordId}>Пароль</Label>

        <Input
          id={passwordId}
          name="password"
          placeholder="Введите пароль"
          type='password'
          required
          defaultValue={formData?.get("password")?.toString()}
        />
        {errors?.password && <div className='text-destructive'>{errors.password}</div>}
      </div>
    </>
  );
};
