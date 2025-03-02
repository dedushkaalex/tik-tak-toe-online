import { redirect } from "next/navigation";

import { Button } from "@/shared/ui/button";

import { sessionService } from "@/entities/user/server";
import { routes } from '@/kernel/routes';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { session } = await sessionService.verifySession();

  return (
    <div className='flex flex-col grow'>
      <header className="px-10 py-4 flex gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">Крестики нолики онлайн</div>
        <div className="flex items-center gap-2">
          <div className="text-lg">{session.login}</div>
          <form
            action={async () => {
              "use server";
              sessionService.deleteSession();
              redirect(routes.signIn());
            }}
          >
            <Button type="submit">Выход</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
