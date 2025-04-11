export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <div style={{height: 800,background:'black'}}></div>
      {children}
    </div>
  );
}