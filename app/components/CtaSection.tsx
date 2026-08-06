"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar } from "lucide-react";
import { ctaData } from "../constants/portfolioData";

export default function CtaSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      "#cta-section .cta-content",
      { y: 20, opacity: 0.8 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#cta-section",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      id="cta-section"
      className="py-16 sm:py-24 px-4 sm:px-10 bg-[#0d1c32] relative overflow-hidden text-white border-t border-[#eae7ea]"
    >
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#cba72f] via-transparent to-transparent" />
      
      <div className="cta-content max-w-[1280px] mx-auto text-center relative z-10">
        <h2
          style={{ color: "#ffffff" }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 font-hanken leading-tight"
        >
          {ctaData.title}
        </h2>

        <p
          style={{ color: "#b9c7e4" }}
          className="text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {ctaData.subtitle}
        </p>

        <a
          href={ctaData.buttonHref}
          className="inline-flex items-center justify-center gap-3 bg-[#cba72f] text-[#4e3d00] hover:bg-[#735c00] hover:text-[#ffffff] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-extrabold text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl"
        >
          <Calendar className="w-5 h-5" />
          {ctaData.buttonLabel}
        </a>
      </div>
    </section>
  );
}
