"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whyChooseMeData } from "../constants/portfolioData";

export default function WhyChooseMe() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#whyme .feature-item", {
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#whyme .grid",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section
      id="whyme"
      className="py-16 sm:py-24 bg-[#ffffff] px-4 sm:px-10 border-t border-[#eae7ea]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1b1d] mb-4 font-hanken">
            {whyChooseMeData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#44474d] max-w-2xl mx-auto">
            {whyChooseMeData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseMeData.features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="feature-item flex gap-4 p-5 sm:p-6 bg-[#ffffff] hover:bg-[#f5f3f5] rounded-xl border border-[#eae7ea] transition-all shadow-xs"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full ${feature.iconBg} flex items-center justify-center`}
                >
                  <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1b1b1d] mb-2 font-hanken">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#44474d] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
