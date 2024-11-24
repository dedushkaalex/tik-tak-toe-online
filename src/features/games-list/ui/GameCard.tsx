import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

interface GameCardProps {
  login: string;
  rating: number;
  actions: React.ReactNode;
}

export function GameCard({ login, rating, actions }: GameCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Игра с {login}</CardTitle>
        <CardContent>Рейтинг: {rating}</CardContent>
      </CardHeader>
      <CardFooter>
        {actions}
      </CardFooter>
    </Card>
  );
}
