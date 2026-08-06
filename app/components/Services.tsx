"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "../constants/portfolioData";

export default function Services() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#services .service-card", {
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#services .grid",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#fbf9fb] px-4 sm:px-10 border-t border-[#eae7ea]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1b1d] mb-4 font-hanken">
            {servicesData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#44474d] max-w-2xl mx-auto">
            {servicesData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.items.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className={`service-card card-hover bg-[#ffffff] p-6 sm:p-8 rounded-2xl shadow-[0px_4px_20px_rgba(10,25,47,0.05)] border ${
                  service.highlight
                    ? "border-t-4 border-t-[#cba72f] border-x border-b border-[#eae7ea]"
                    : "border-[#eae7ea]"
                } relative overflow-hidden`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${service.iconBg} flex items-center justify-center mb-6 relative z-10`}
                >
                  <IconComp className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1b1b1d] mb-3 relative z-10 font-hanken">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-[#44474d] relative z-10 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
