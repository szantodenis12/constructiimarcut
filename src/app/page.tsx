import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import StatementBand from "@/components/StatementBand";
import Principles from "@/components/Principles";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Values from "@/components/Values";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <StatementBand />
        <Principles />
        <Services />
        <Projects />
        <Process />
        <Values />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
