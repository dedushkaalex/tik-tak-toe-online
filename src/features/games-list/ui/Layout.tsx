export function Layout({ children, actions }: { children: React.ReactNode; actions: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-end">{actions}</div>
      <div className="grid grid-cols-4 gap-4">{children}</div>
    </div>
  );
}
