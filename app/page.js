import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import CtaBanner from "@/components/sections/CtaBanner";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Achievements />
      <CtaBanner />
      <Contact />
    </main>
  );
}
