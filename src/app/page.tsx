import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await prisma.game.findMany();
  console.log(games);
  return (
    <div>
      <Button>Hello</Button>
      {games.map((game) => (
        <Card className="w-[350px]" key={game.id}>
          <CardHeader>
            <CardTitle>{game.name}</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      ))}
    </div>
  );
}
