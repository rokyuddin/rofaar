import { StoreHydrator } from "@/components/molecules/store-hydrator";
import { Footer } from "@/components/organisms/footer";
import { Navbar } from "@/components/organisms/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreHydrator />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
