"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import { contactData, siteConfig } from "../constants/portfolioData";

export default function Contact() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#contact .contact-col", {
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string) || "Not specified";
    const phone = (formData.get("phone") as string) || "Not specified";
    const email = (formData.get("email") as string) || "Not specified";
    const service = (formData.get("service") as string) || "General Consulting";
    const message = (formData.get("message") as string) || "No message provided";

    const formattedText = `Hi Team, I'm interested in your CA & Financial services and would like to discuss my project.\n\n📋 *Inquiry Details:*\n• *Name:* ${name}\n• *Phone:* ${phone}\n• *Email:* ${email}\n• *Service Requested:* ${service}\n\n💬 *Message:*\n${message}`;

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsappPhone}&text=${encodeURIComponent(
      formattedText
    )}&type=phone_number&app_absent=0`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#fbf9fb] px-4 sm:px-10 border-t border-[#eae7ea]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Details */}
          <div className="contact-col">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1b1d] mb-4 font-hanken">
              {contactData.title}
            </h2>
            <p className="text-base sm:text-lg text-[#44474d] mb-8 leading-relaxed">
              {contactData.subtitle}
            </p>

            <div className="space-y-6 mb-8">
              {contactData.infoItems.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d6e3ff] flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-5 h-5 text-[#0d1c32]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1b1b1d] text-base font-hanken">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#44474d] font-normal leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Embedded Live Interactive Google Map */}
            <div className="w-full h-64 sm:h-72 bg-[#ffffff] rounded-2xl overflow-hidden shadow-md border border-[#eae7ea] relative">
              <iframe
                title="Office Location Map"
                src={siteConfig.mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-col bg-[#ffffff] p-6 sm:p-8 rounded-2xl shadow-[0px_12px_32px_rgba(10,25,47,0.08)] border border-[#eae7ea]">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1b1b1d] mb-6 font-hanken">
              {contactData.formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-semibold text-[#1b1b1d] mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="w-full rounded-lg border border-[#c5c6cd] bg-[#fbf9fb] px-4 py-3 text-sm text-[#1b1b1d] placeholder:text-[#75777e] focus:border-[#000000] focus:ring-1 focus:ring-[#000000] outline-none transition-colors"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-[#1b1b1d] mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#c5c6cd] bg-[#fbf9fb] px-4 py-3 text-sm text-[#1b1b1d] placeholder:text-[#75777e] focus:border-[#000000] focus:ring-1 focus:ring-[#000000] outline-none transition-colors"
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    type="tel"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-[#1b1b1d] mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#c5c6cd] bg-[#fbf9fb] px-4 py-3 text-sm text-[#1b1b1d] placeholder:text-[#75777e] focus:border-[#000000] focus:ring-1 focus:ring-[#000000] outline-none transition-colors"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-[#1b1b1d] mb-2"
                  htmlFor="service"
                >
                  Service Required
                </label>
                <select
                  className="w-full rounded-lg border border-[#c5c6cd] bg-[#fbf9fb] px-4 py-3 text-sm text-[#44474d] focus:border-[#000000] focus:ring-1 focus:ring-[#000000] outline-none transition-colors"
                  id="service"
                  name="service"
                >
                  <option value="">Select a service...</option>
                  {contactData.servicesOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-[#1b1b1d] mb-2"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  className="w-full rounded-lg border border-[#c5c6cd] bg-[#fbf9fb] px-4 py-3 text-sm text-[#1b1b1d] placeholder:text-[#75777e] focus:border-[#000000] focus:ring-1 focus:ring-[#000000] outline-none transition-colors"
                  id="message"
                  name="message"
                  placeholder="Briefly describe your requirements..."
                  rows={4}
                />
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 bg-[#000000] text-[#ffffff] px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#0d1c32] transition-colors shadow-sm mt-4 cursor-pointer"
                type="submit"
              >
                <MessageCircle className="w-5 h-5" />
                {contactData.submitButtonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
