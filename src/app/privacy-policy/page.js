import React from 'react';
import ServicesHero from '../../components/Services/ServicesHero';
import PrivacyContent from '../../components/Privacy/PrivacyContent';

export const metadata = {
  title: "Privacy Policy | Nextmedia",
  description: "Read Nextmedia’s Privacy Policy to understand how we collect, use, and protect your personal information while ensuring transparency and data security.",
  alternates: {
    canonical: "https://nextmedia.ae/privacy-policy",
  },
  keywords: [
    "privacy policy",
    "branding agency in dubai",
    "creative agency dubai",
    "branding companies in dubai",
    "best advertising agencies in dubai",
    "graphic design agency dubai",
    "top branding agency in dubai"
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black min-h-screen">
      <ServicesHero 
        title="Our" 
        highlight="Privacy" 
        titleSuffix="Policy"
        heroImage="/images/services/hero_bg.png" // Using existing hero image or could use a specific one if available
        altText="Privacy Policy - Next Media"
      />
      
      <PrivacyContent />
    </main>
  );
}
