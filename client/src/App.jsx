import { SmoothScroll } from "./components/SmoothScroll";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Why } from "./components/Why";
import { Team } from "./components/Team";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <main className="relative overflow-x-clip bg-background text-foreground">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Why />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}
