import ServicesHero from "../../components/Services/ServicesHero";
import ServicesDetailList from "../../components/Services/ServicesDetailList";
import WhyChooseUs from "../../components/Services/WhyChooseUs";

export const metadata = {
  title:
    "Creative Agency in Dubai | Branding, Design & Digital Marketing",
  description:
    "Explore our creative agency services in Dubai, including branding, design, content marketing, and social media marketing. We deliver tailored solutions to grow your brand.",
  keywords: [
    "creative agency in dubai",
    "advertising agencies in dubai",
    "branding agencies in dubai",
    "top advertising agencies in dubai",
    "top branding agency in dubai",
    "best branding agencies in dubai",
    "branding companies in uae",
    "branding in dubai",
    "top creative agencies in dubai",
    "top 10 advertising agencies in dubai",
    "graphic design agency dubai",
    "professional marketing agency dubai",
    "smm company dubai",
    "social media marketing company dubai",
    "content marketing agency uae",
    "dubai creative agency",
    "Branding & Advertising Agency in Dubai",
    "digital marketing agency in dubai"
  ],
  alternates: {
    canonical: "https://nextmedia.ae/services",
  },
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
