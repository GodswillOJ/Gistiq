import HeroGrid from "@/src/components/hero/HeroGrid";
import HeroMobileSlider from "@/src/components/hero/HeroMobileSlider";
import Categories from "@/src/components/category/Categories";
import LatestArticles from "@/src/features/posts/components/LatestArticles";
import  Navbar from "@/src/components/navbar/Navbar";

export default function HomePage() {
  return (
    <main className="bg-white text-black min-h-screen">
      {/* Hero section */}
      <section>
        <Navbar />

        <Categories />

        <HeroGrid />

        <HeroMobileSlider />
      </section>

      {/* post section */}
      <section>
        <LatestArticles />
      </section>
    </main>
  );
}