'use client';

import React from 'react';
import Container from '../Common/Container/Container';

export default function TermsContent() {
  const sections = [
    {
      id: "1",
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Nextmedia website and services, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our website or services."
    },
    {
      id: "2",
      title: "2. Use of the Website",
      content: (
        <>
          <p className="mb-4">You agree to use this website only for lawful purposes. You may not:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Engage in any illegal or fraudulent activities</li>
            <li>Upload or transmit viruses, malware, or harmful content</li>
            <li>Infringe on the rights of others</li>
            <li>Send unsolicited promotions or spam</li>
          </ul>
          <p>Nextmedia reserves the right to restrict or terminate access without notice if misuse is detected.</p>
        </>
      )
    },
    {
      id: "3",
      title: "3. Intellectual Property Rights",
      content: "All content on this website—including text, logos, graphics, images, videos, and design—is the property of Nextmedia and protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission."
    },
    {
      id: "4",
      title: "4. Service Disclaimer",
      content: "Nextmedia strives to provide accurate and up-to-date information. However, we do not guarantee the completeness, accuracy, or reliability of any content. All service timelines, deliverables, and results may vary depending on project scope and external factors."
    },
    {
      id: "5",
      title: "5. Limitation of Liability",
      content: (
        <>
          <p className="mb-4">Nextmedia shall not be held liable for any direct, indirect, incidental, or consequential damages arising from:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Use or inability to use our website or services</li>
            <li>Delays in project delivery due to external factors</li>
            <li>Third-party tools, platforms, or services</li>
          </ul>
        </>
      )
    },
    {
      id: "6",
      title: "6. Third-Party Links",
      content: "Our website may contain links to third-party websites. Nextmedia does not control or take responsibility for their content, terms, or privacy practices."
    },
    {
      id: "7",
      title: "7. Payment Terms",
      content: (
        <>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>All payments must be made according to the agreed quotation or invoice.</li>
            <li>Payments made for completed work or third-party services are non-refundable</li>
            <li>Any refunds are subject to internal review and approval</li>
          </ul>
        </>
      )
    },
    {
      id: "8",
      title: "8. Governing Law",
      content: "These Terms and Conditions shall be governed by and interpreted in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of UAE courts."
    },
    {
      id: "9",
      title: "9. Amendments",
      content: "Nextmedia reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website indicates acceptance of updated terms."
    },
    {
      id: "10",
      title: "10. Contact Us",
      content: (
        <div className="space-y-4">
          <p>If you have any questions regarding these Terms and Conditions, please contact us:</p>
          <div className="space-y-2">
            <p><strong>Company:</strong> Nextmedia</p>
            <p><strong>Phone:</strong> <a href="tel:+971588984455" className="text-[#00B4D8] hover:underline">+971 58 898 4455</a></p>
            <p><strong>Phone:</strong> <a href="tel:+971525162071" className="text-[#00B4D8] hover:underline">+971 52 516 2071</a></p>
            <p><strong>Email:</strong> <a href="mailto:info.nextdms@gmail.com" className="text-[#00B4D8] hover:underline">info.nextdms@gmail.com</a></p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="bg-black py-10 md:py-20">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms and Condition</h1>
            <p className="text-lg md:text-xl leading-relaxed">
              Please read these terms and conditions carefully before using our services. They outline your rights and obligations as a user of Nextmedia.
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
                <div className="text-white text-lg leading-relaxed font-light">
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
