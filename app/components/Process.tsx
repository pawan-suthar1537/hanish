"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processData } from "../constants/portfolioData";

export default function Process() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#process .process-step", {
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#process .process-grid",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section
      id="process"
      className="py-16 sm:py-24 bg-[#ffffff] px-4 sm:px-10 border-t border-[#eae7ea]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1b1d] mb-4 font-hanken">
            {processData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#44474d] max-w-2xl mx-auto">
            {processData.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#eae7ea] -translate-y-1/2 z-0" />

          <div className="process-grid grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {processData.steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.num}
                  className="process-step flex flex-col items-center text-center bg-[#ffffff] p-4 rounded-xl md:p-0"
                >
                  <div
                    className={`w-16 h-16 rounded-full ${step.numBg} flex items-center justify-center text-2xl font-extrabold mb-4 shadow-md ring-4 ring-[#ffffff] font-hanken`}
                  >
                    {step.num}
                  </div>

                  <div className={`mb-3 ${step.iconColor}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1b1b1d] mb-2 font-hanken">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
