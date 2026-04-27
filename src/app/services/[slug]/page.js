import { servicesData } from "../../../data/ServiceData";
import ServicesHero from "../../../components/Services/ServicesHero";
import ServiceSecondaryContent from "../../../components/Services/ServiceSecondaryContent";
import WhyChooseUs from "../../../components/Services/WhyChooseUs";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);
  
  if (!service) return { title: "Service Not Found" };

  // Pulls the custom SEO data if it exists, otherwise falls back to defaults
  return {
    title: service.metaTitle || `${service.highlight} ${service.titleSuffix} | Next Digital Media`,
    description: service.metaDescription || service.description,
    keywords: service.keywords || "",
    alternates: {
      canonical: service.canonicalUrl || undefined,
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Dynamic ServicesHero */}
      <ServicesHero 
        title={service.title}
        highlight={service.highlight}
        titleSuffix={service.titleSuffix}
        heroImage={service.heroImage}
        altText={service.id}
      />

      {/* Structured Content Section */}
      <ServiceSecondaryContent service={service} />

      {/* Why Choose Us Section */}
      {/* Note: I added 'whyChooseIntro' to the JSON. You can pass it here if your component supports it */}
      <WhyChooseUs 
        reasons={service.whyChooseReasons} 
        introText={service.whyChooseIntro} 
      />
      
    </div>
  );
}

// Pre-generate routes for performance
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}