import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BilMoGSection from "@/components/sections/BilMoGSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { useSEO } from "@/hooks/useSEO";
import JsonLd, {
  organizationSchema,
  professionalServiceSchema,
  faqSchema,
  websiteSchema,
} from "@/components/JsonLd";

export default function Home() {
  useSEO({
    title: "Versicherungsmathematische Beratung & Gutachten",
    description:
      "GBG Consulting – Ihr Partner für versicherungsmathematische Gutachten, Pensionszusagen, BilMoG-Bewertungen und betriebliche Altersversorgung. Über 25 Jahre Erfahrung. Kostenlose Erstberatung.",
    path: "/",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={organizationSchema} />
      <JsonLd data={professionalServiceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={websiteSchema} />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BilMoGSection />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
