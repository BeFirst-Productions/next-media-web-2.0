import { servicesData } from "../../../data/ServiceData";
import ServicesHero from "../../../components/Services/ServicesHero";
import ServiceSecondaryContent from "../../../components/Services/ServiceSecondaryContent";
import WhyChooseUs from "../../../components/Services/WhyChooseUs";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);
  
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.highlight} ${service.titleSuffix} | Next Digital Media`,
    description: service.description,
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
      <WhyChooseUs />
      
    </div>
  );
}

// Pre-generate routes for performance
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}
