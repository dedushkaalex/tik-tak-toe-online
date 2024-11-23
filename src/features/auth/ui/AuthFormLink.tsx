import Link from "next/link";

export const AuthFormLink = ({ href, linkText, text }: { text: string; linkText: string; href: string }) => {
  return (
    <p className="text-sm text-primary/50">
      {text}{" "}
      <Link href={href} className="text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
};
