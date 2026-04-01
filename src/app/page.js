import HeroSection from "../components/Home/HeroSection/HeroSection";
import HeroDetails from "../components/Home/HeroDetails/HeroDetails";
import ServicesList from "../components/Home/ServicesList/ServicesList";
import ProjectSection from "../components/Home/ProjectSection/ProjectSection";
import ProcessSection from "../components/Home/ProcessSection/ProcessSection";
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
      <ClientSection />
      <TestimonialSection />
      <ProjectSection />
      <FaqSection />
      <SocialMediaSection />
    </>
  );
}
