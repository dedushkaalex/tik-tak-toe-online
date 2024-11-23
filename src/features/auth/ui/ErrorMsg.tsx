import { Alert, AlertDescription } from "@/shared/ui/alert";

export const ErrorMsg = ({ error }: { error?: string }) => {
  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  return null;
};
