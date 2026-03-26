import HeroSection from "../components/Home/HeroSection/HeroSection";
import HeroDetails from "../components/Home/HeroDetails/HeroDetails";
import ServicesList from "../components/Home/ServicesList/ServicesList";
import ProcessSection from "../components/Home/ProcessSection/ProcessSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroDetails />
      <ServicesList />
      <ProcessSection />
    </>
  );
}
