import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextMatchBanner from "@/components/NextMatchBanner";
import MobileBottomNav from "@/components/MobileBottomNav";
import { getNextUpcomingMatch } from "@/lib/db/queries";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextMatch = await getNextUpcomingMatch();

  return (
    <>
      <Header />
      <NextMatchBanner match={nextMatch ?? null} />
      <div className="pb-14 md:pb-0">{children}</div>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
