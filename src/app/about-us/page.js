import ServicesHero from '../../components/Services/ServicesHero';
import AboutDetails from '../../components/About/AboutDetails';
import AboutTeam from '../../components/About/AboutTeam';

export const metadata = {
  title: "About Us | Next Digital Marketing Agency",
  description: "Learn about Next Digital Marketing Agency - our mission, vision, and the creative team behind our success.",
};

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Starting with ServicesHero as requested */}
      <ServicesHero 
        title="We Are Your" 
        highlight="Creative" 
        titleSuffix="Digital Partner"
        heroImage="/images/about/about_hero.png" 
        altText="Our Creative Studio"
      />
      
      {/* About Details Section (White Background) */}
      <AboutDetails />

      {/* Founders & Team Section (Transition back to Black) */}
      <AboutTeam />
      
    </main>
  );
}
