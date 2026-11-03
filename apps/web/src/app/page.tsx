import HeroGrid from "@/src/components/hero/HeroGrid";
import HeroMobileSlider from "@/src/components/hero/HeroMobileSlider";
import LatestArticles from "@/src/features/posts/components/LatestArticles";
import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/footer/Footer";
import { BreakingNewsProvider } from "@/src/context/BreakingNewsContext";

export default function HomePage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />

      <BreakingNewsProvider>
        <section>
          <HeroGrid />
          <HeroMobileSlider />
        </section>
      </BreakingNewsProvider>

      <section>
        <LatestArticles />
      </section>

      <Footer />
    </main>
  );
}