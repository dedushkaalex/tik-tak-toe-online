import { Button, ButtonProps } from "@/shared/ui/button";

export const AuthSubmitButton = ({ children, ...props }: { children: React.ReactNode } & ButtonProps) => {
  return (
    <Button type="submit" variant="default" className="w-full" {...props}>
      {children}
    </Button>
  );
};
