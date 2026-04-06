'use client';

import React, { useState } from 'react';
import Container from '../Common/Container/Container';

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactInfo = [
    {
      label: 'Have Question?',
      value: '+971 58 898 4455, +971 52 516 2071',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      )
    },
    {
      label: 'Email',
      value: 'info.nextdms@gmail.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      )
    },
    {
      label: 'Our Location',
      value: 'Arzoo building (Sharjah Islamic Bank), Al Qusais 2, Dubai',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      )
    }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    // Clear error for this field
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    
    // Company is optional but I'll add a placeholder for consistency if needed
    // if (!formData.company.trim()) newErrors.company = 'Company name is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Optional: Scroll to the first error
      return;
    }
    
    // Clean up the WhatsApp number
    const whatsappNum = '971588984455';
    
    // Construct the message
    const message = `*Contact Submission from Website*
-----------------------------------
*Name:* ${formData.name}
*Company:* ${formData.company || 'N/A'}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Message:* ${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    
    // Use whatsapp:// protocol to force the app to open instead of the browser
    const whatsappAppUrl = `whatsapp://send?phone=${whatsappNum}&text=${encodedMessage}`;
    const whatsappWebUrl = `https://wa.me/${whatsappNum}?text=${encodedMessage}`;
    
    // Attempt to open the app directly
    window.location.href = whatsappAppUrl;

    // Fallback or just reset fields anyway
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-1000 ease-in-out ${isScrolled ? 'bg-black' : 'bg-white'}`}>
      {/* Header Section */}
      <section className="pt-32 pb-24 relative overflow-hidden transition-all duration-1000">
        <Container>
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-light tracking-tight transition-all duration-1000 ${isScrolled ? 'text-white' : 'text-black'}`}>
              Send us your <span className="text-[#2bc5ee]">details</span> and our team will reach out.
            </h1>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className={`text-xl sm:text-2xl transition-all duration-1000 ${isScrolled ? 'text-white/90' : 'text-black/90'}`}>
               Let's Transform Your Brand Together
              </span>
              <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.514922 6.05523C-0.773929 4.13911 0.494769 1.54587 2.79847 1.38744L22.909 0.00743464C25.2129 -0.150695 26.8242 2.24472 25.8091 4.31909L16.9494 22.4255C15.9342 24.4995 13.054 24.6969 11.7652 22.7808L0.514922 6.05523ZM5.33361 2.62805C3.02986 2.78628 1.76099 5.37887 3.04952 7.29504L11.5718 19.965C12.8607 21.8812 15.741 21.6839 16.7561 19.6097L23.4673 5.89427C24.4824 3.8199 22.8711 1.42448 20.5672 1.58261L5.33361 2.62805Z" fill="#2bc5ee"/>
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* Info Cards Section */}
      <section className="-mt-12 mb-20 relative z-10 transition-all duration-1000">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, idx) => (
              <div 
                key={idx} 
                className={`bg-black text-white p-4 sm:p-5 rounded-3xl flex items-center space-x-4 border transition-all duration-1000 ${isScrolled ? 'border-[#2bc5ee]' : 'border-white/5'} hover:scale-105 shadow-xl`}
              >
                <div className="bg-[#2bc5ee] text-white p-3 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300">
                  {info.icon}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs sm:text-sm text-gray-400 font-normal">
                    {info.label}
                  </span>
                  <span className="text-[13px] sm:text-[15px] font-semibold text-white/90 leading-tight">
                    {info.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="pb-32 flex-1">
        <Container>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 max-w-[1200px] mx-auto">
            {/* My Name */}
            <div className="flex flex-col space-y-4">
              <label htmlFor="name" className={`text-base font-normal transition-all duration-700 ${errors.name ? 'text-red-500' : (isScrolled ? 'text-white/60' : 'text-black/60')}`}>
                My Name:
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b outline-none pb-2 transition-all duration-700 ${isScrolled ? 'text-white' : 'text-black'} ${errors.name ? 'border-red-500' : 'border-[#2bc5ee]/40 focus:border-[#2bc5ee]'}`}
                  placeholder=""
                />
                {errors.name && <span className="absolute left-0 -bottom-6 text-xs text-red-500 font-medium">{errors.name}</span>}
              </div>
            </div>

            {/* Company Name */}
            <div className="flex flex-col space-y-4">
              <label htmlFor="company" className={`text-base font-normal transition-all duration-700 ${isScrolled ? 'text-white/60' : 'text-black/60'}`}>
                Company Name:
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-b border-[#2bc5ee]/40 focus:border-[#2bc5ee] outline-none pb-2 transition-all duration-700 ${isScrolled ? 'text-white' : 'text-black'}`}
                placeholder=""
              />
            </div>

            {/* Mail Address */}
            <div className="flex flex-col space-y-4">
              <label htmlFor="email" className={`text-base font-normal transition-all duration-700 ${errors.email ? 'text-red-500' : (isScrolled ? 'text-white/60' : 'text-black/60')}`}>
                Mail Address:
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b outline-none pb-2 transition-all duration-700 ${isScrolled ? 'text-white' : 'text-black'} ${errors.email ? 'border-red-500' : 'border-[#2bc5ee]/40 focus:border-[#2bc5ee]'}`}
                  placeholder=""
                />
                {errors.email && <span className="absolute left-0 -bottom-6 text-xs text-red-500 font-medium">{errors.email}</span>}
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-4">
              <label htmlFor="phone" className={`text-base font-normal transition-all duration-700 ${errors.phone ? 'text-red-500' : (isScrolled ? 'text-white/60' : 'text-black/60')}`}>
                Phone Number:
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b outline-none pb-2 transition-all duration-700 ${isScrolled ? 'text-white' : 'text-black'} ${errors.phone ? 'border-red-500' : 'border-[#2bc5ee]/40 focus:border-[#2bc5ee]'}`}
                  placeholder=""
                />
                {errors.phone && <span className="absolute left-0 -bottom-6 text-xs text-red-500 font-medium">{errors.phone}</span>}
              </div>
            </div>

            {/* Send Message */}
            <div className="flex flex-col md:col-span-2 space-y-4">
              <label htmlFor="message" className={`text-base font-normal transition-all duration-700 ${errors.message ? 'text-red-500' : (isScrolled ? 'text-white/60' : 'text-black/60')}`}>
                Send Message:
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows="1"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b outline-none pb-2 resize-none transition-all duration-700 overflow-hidden ${isScrolled ? 'text-white' : 'text-black'} ${errors.message ? 'border-red-500' : 'border-[#2bc5ee]/40 focus:border-[#2bc5ee]'}`}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder=""
                />
                {errors.message && <span className="absolute left-0 -bottom-6 text-xs text-red-500 font-medium">{errors.message}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-8 flex justify-center">
              <button
                type="submit"
                className={`px-16 py-5 rounded-full font-semibold tracking-wider hover:bg-[#2bc5ee] hover:shadow-lg hover:shadow-[#2bc5ee]/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg ${isScrolled ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                SUBMIT NOW
              </button>
            </div>
          </form>
        </Container>
      </section>
    </div>
  );
}
