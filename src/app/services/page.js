import ServicesHero from "../../components/Services/ServicesHero";
import ServicesDetailList from "../../components/Services/ServicesDetailList";
import WhyChooseUs from "../../components/Services/WhyChooseUs";

export const metadata = {
  title: "Services | Next Digital Marketing",
  description: "Discover our range of digital marketing, web development, and branding services tailored to grow your business.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesDetailList />
      <WhyChooseUs />
    </>
  );
}
