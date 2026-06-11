import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import Backers from "@/components/Backers";
import Themes from "@/components/Themes";
import Judges from "@/components/Judges";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Roadmap />
        <Backers />
        <Themes />
        <Judges />
        <Team />
      </main>
      <Footer />
    </>
  );
}
