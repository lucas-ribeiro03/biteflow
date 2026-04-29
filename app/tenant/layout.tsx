import Header from "@/components/Home/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function TenantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr] h-screen">
      <Sidebar className="col-span-3 row-span-2" />
      <Header className="col-span-9" />
      <main className="row-span-1 col-span-9">{children}</main>
    </div>
  );
}
