import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextMatchBanner from "@/components/NextMatchBanner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <NextMatchBanner />
      {children}
      <Footer />
    </>
  );
}
