import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import WhoIsItFor from "@/components/WhoIsItFor";
import ProductModules from "@/components/ProductModules";
import HowItWorks from "@/components/HowItWorks";
import Differentiator from "@/components/Differentiator";
import DocSection from "@/components/DocSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <SocialProof />
      <WhoIsItFor />
      <ProductModules />
      <HowItWorks />
      <Differentiator />
      <DocSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
