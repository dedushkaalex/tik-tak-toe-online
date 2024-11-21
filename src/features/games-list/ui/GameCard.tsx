import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface GameCardProps {
  login: string;
  rating: number;
}

export function GameCard({ login, rating }: GameCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Игра с {login}</CardTitle>
        <CardContent>Рейтинг: {rating}</CardContent>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
