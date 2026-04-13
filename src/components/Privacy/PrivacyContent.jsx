'use client';

import React from 'react';
import Container from '../Common/Container/Container';

export default function PrivacyContent() {
  const sections = [
    {
      id: "1",
      title: "1. Which Data We Gather",
      content: "If you communicate with our platform, e. g. via filling out contact forms, requesting services, or updates, you may provide us with personal data like your name, phone, and email address, company information, as well as any message or question."
    },
    {
      id: "2",
      title: "2. Your Data Usage",
      content: (
        <>
          <p className="mb-4">Your data serves us to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Offer you branding, marketing, and associated services;</li>
            <li>Answer your questions and send you updates or proposals;</li>
            <li>Enhance the user experience and the performance of the site;</li>
            <li>Fulfill our legal and regulatory obligations.</li>
          </ul>
          <p>We do not trade, rent, or disclose your personal data to third parties unless by law or for providing our services.</p>
        </>
      )
    },
    {
      id: "3",
      title: "3. Protecting Data",
      content: "We adopt industry best practices to safeguard your data, including the use of secure servers and SSL encryption. However, it is impossible to guarantee that any transmission over the internet is completely secure."
    },
    {
      id: "4",
      title: "4. Cookies Policy",
      content: "Our website uses cookies to enhance your browsing experience and analyze traffic. You can control or disable cookies through your browser settings, though some features of the website may not function properly as a result."
    },
    {
      id: "5",
      title: "5. Third-Party Services",
      content: "We may use trusted third-party tools (such as analytics or social media integrations) to improve our services. These platforms have their own privacy policies, and Nextmedia Branding is not responsible for their data practices."
    },
    {
      id: "6",
      title: "6. Your Rights",
      content: (
        <>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Access the personal data we hold about you</li>
            <li>Request corrections or updates</li>
            <li>Request deletion of your data (where applicable)</li>
          </ul>
          <p>To exercise these rights, please contact us at: <a href="mailto:info@nextmediabranding.com" className="text-[#00B4D8] hover:underline">info@nextmediabranding.com</a></p>
        </>
      )
    },
    {
      id: "7",
      title: "7. Data Retention",
      content: "We retain your personal information only for as long as necessary to fulfill business, legal, or operational requirements. After this period, your data is securely deleted."
    },
    {
      id: "8",
      title: "8. Updates to This Policy",
      content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date."
    },
    {
      id: "9",
      title: "9. International Data Transfers",
      content: "As a digital service provider, your information may be processed or stored in locations outside your country of residence. We ensure that any such data transfers comply with applicable data protection laws and that your information remains secure and protected at all times."
    },
    {
      id: "10",
      title: "10. Contact Us",
      content: (
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, you can contact us at: <a href="mailto:info@nextmediabranding.com" className="text-[#00B4D8] hover:underline">info@nextmediabranding.com</a>
        </p>
      )
    }
  ];

  return (
    <section className="bg-black py-10 md:py-20">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className=" text-lg md:text-xl leading-relaxed">
              At Next Media, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit our website or engage with our services.
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                className="group animate-fade-in-up opacity-0" 
                style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: 'forwards' }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-[#00B4D8] transition-colors duration-300">
                  {section.title}
                </h2>
                <div className=" text-lg leading-relaxed font-light">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
