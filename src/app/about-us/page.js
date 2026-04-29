import ServicesHero from '../../components/Services/ServicesHero';
import AboutDetails from '../../components/About/AboutDetails';
import AboutTeam from '../../components/About/AboutTeam';

export const metadata = {
  title: "About Us| Branding Agency in Dubai,UAE| Nextmedia",
  description: "Next Media is a leading branding and creative agency in Dubai, delivering innovative strategies, digital marketing, and design solutions that make your brand stand out.",
keywords: [
  "branding agency in dubai",
  "creative agency dubai",
  "branding companies in dubai",
  "best advertising agencies in dubai",
  "graphic design agency dubai",
  "top branding agency in dubai",
  "best branding agencies in dubai",
  "best logo design company in dubai",
  "branding in dubai",
  "top creative agencies in dubai",
  "best branding agency dubai",
  "branding services in dubai",
  "branding agencies in dubai",
  "top advertising agencies in dubai",
  "Graphic Design Agency in Dubai",
  "Graphic design companies in dubai",
  "graphic design in dubai",
  "web development company in dubai",
  "website design company dubai"
],
  alternates: {
    canonical: 'https://nextmedia.ae/about-us',
  }
};

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Starting with ServicesHero as requested */}
      <ServicesHero 
        title="We Are Your" 
        highlight="Creative" 
        titleSuffix="Digital Partner"
        heroVideo="/video/about.mp4"
      />
      
      {/* About Details Section (White Background) */}
      <AboutDetails />

      {/* Founders & Team Section (Transition back to Black) */}
      <AboutTeam />
      
    </main>
  );
}
