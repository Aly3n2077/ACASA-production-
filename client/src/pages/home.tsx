import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustIndicators from "@/components/TrustIndicators";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyContactBar from "@/components/StickyContactBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <Services />
      <TrustIndicators />
      <About />
      <Contact />
      <Footer />
      <StickyContactBar />
    </div>
  );
}
