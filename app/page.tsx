import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ProductModules from "@/components/ProductModules";
import HowItWorks from "@/components/HowItWorks";
import Differentiator from "@/components/Differentiator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <SocialProof />
      <ProductModules />
      <HowItWorks />
      <Differentiator />
      <ContactForm />
      <Footer />
    </main>
  );
}
