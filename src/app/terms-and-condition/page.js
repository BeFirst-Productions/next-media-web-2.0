import React from 'react';
import ServicesHero from '../../components/Services/ServicesHero';
import TermsContent from '../../components/Terms/TermsContent';

export const metadata = {
  title: "Terms and Conditions | Nextmedia",
  description: "Read Nextmedia UAE’s Terms and Conditions to understand our website usage policies, services, payment terms, and legal guidelines for users.",
  alternates: {
    canonical: "https://nextmedia.ae/terms-and-condition",
  },
  keywords: [
    "privacy policy",
    "privacy policy for website",
    "top creative agencies in dubai",
    "digital advertising agency dubai",
    "creative companies in dubai",
    "graphic design agency dubai",
    "top branding agency in dubai",
    "branding in dubai",
    "branding agency in uae",
    "dubai creative agency"
  ],
};

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-black min-h-screen">
      <ServicesHero 
        title="Terms &" 
        highlight="Conditions" 
        titleSuffix=""
        heroImage="/images/services/hero_bg.png"
        altText="Terms and Conditions - Next Media"
      />
      
      <TermsContent />
    </main>
  );
}
