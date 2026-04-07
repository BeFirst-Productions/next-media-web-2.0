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
