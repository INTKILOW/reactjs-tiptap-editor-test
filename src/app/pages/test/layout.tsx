export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div style={{height: 200,background:'green'}} ></div>
      <div>{children}</div>
      <div style={{height: 500}}></div>
    </div>
  );
}