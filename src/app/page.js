import HeroSection from "../components/Home/HeroSection/HeroSection";
import HeroDetails from "../components/Home/HeroDetails/HeroDetails";
import ServicesList from "../components/Home/ServicesList/ServicesList";
import ProcessSection from "../components/Home/ProcessSection/ProcessSection";
import TechTools from "../components/Home/TechTools/TechTools";
import CreateSuccess from "../components/Home/CreateSuccess/CreateSuccess";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroDetails />
      <ServicesList />
      <ProcessSection />
      <TechTools />
      <CreateSuccess />
    </>
  );
}
