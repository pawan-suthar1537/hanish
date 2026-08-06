import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseMe from "./components/WhyChooseMe";
import Testimonials from "./components/Testimonials";
import Process from "./components/Process";
import CtaSection from "./components/CtaSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";

export default function Home() {
  return (
    <>
      <Header />
      <FloatingChat />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <WhyChooseMe />
        <Testimonials />
        <Process />
        <CtaSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
