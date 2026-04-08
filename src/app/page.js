import HeroSection from "../components/Home/HeroSection/HeroSection";
import HeroDetails from "../components/Home/HeroDetails/HeroDetails";
import ServicesList from "../components/Home/ServicesList/ServicesList";
import ProjectSection from "../components/Home/ProjectSection/ProjectSection";
import ProcessSection from "../components/Home/ProcessSection/ProcessSection";
import TechTools from "../components/Home/TechTools/TechTools";
import CreateSuccess from "../components/Home/CreateSuccess/CreateSuccess";
import BlogSection from "../components/Home/BlogSection/BlogSection";
import ClientSection from "../components/Home/ClientSection/ClientSection";
import TestimonialSection from "../components/Home/TestimonialSection/TestimonialSection";
import FaqSection from "../components/Home/FaqSection/FaqSection";
import SocialMediaSection from "../components/Home/SocialMediaSection/SocialMediaSection";

export const metadata = {
  title: "A leading Creative Agency in Dubai | Next Media",
  description: "Next Media is a leading creative agency in Dubai, offering innovative branding, design, and digital marketing solutions. We help brands grow.",
  keywords: [
    "creative agency in dubai",
    "advertising agencies in dubai",
    "branding agencies in dubai",
    "top advertising agencies in dubai",
    "top creative agencies in dubai",
    "digital advertising agency dubai",
    "creative companies in dubai",
    "graphic design agency dubai",
    "top branding agency in dubai",
    "branding in dubai",
    "branding agency in uae",
    "dubai creative agency",
    "creative agency uae",
    "Branding & Advertising Agency in Dubai",
    "digital marketing agency dubai",
    "social media marketing companies in dubai"
  ]
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroDetails />
      <ServicesList />
      <ProcessSection />
      <BlogSection />
      <TechTools />
      <CreateSuccess />
      <ClientSection />
      <TestimonialSection />
      <ProjectSection />
      <FaqSection />
      <SocialMediaSection />
    </>
  );
}
