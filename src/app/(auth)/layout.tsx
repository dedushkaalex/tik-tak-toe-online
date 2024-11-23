"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center bg-background">{children}</div>;
}
