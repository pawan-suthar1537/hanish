"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MessageCircle } from "lucide-react";
import { heroData } from "../constants/portfolioData";

export default function Hero() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    heroTl
      .fromTo(
        ".hero-text-content h1",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, delay: 0.1 }
      )
      .fromTo(
        ".hero-text-content p",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4"
      )
      .fromTo(
        ".hero-buttons > a",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12 },
        "-=0.3"
      )
      .fromTo(
        ".hero-badges",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0 },
        "-=0.2"
      )
      .fromTo(
        ".hero-image-wrap",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

    gsap.to(".hero-image-wrap img", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="home"
      className="relative py-12 md:py-24 px-4 sm:px-10 overflow-hidden flex items-center min-h-[calc(100vh-80px)] lg:min-h-[700px] bg-gradient-to-br from-[#d6e3ff]/40 to-[#ffffff]"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        <div className="hero-text-content">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#1b1b1d] mb-6 leading-tight font-hanken">
            {heroData.title}
          </h1>

          <p className="text-base sm:text-lg text-[#44474d] mb-8 max-w-xl font-normal leading-relaxed">
            {heroData.subtitle}
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12">
            <a
              href={heroData.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-[#cba72f] text-[#4e3d00] hover:bg-[#735c00] hover:text-[#ffffff] px-8 py-4 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              {heroData.primaryCta.label}
            </a>
            <a
              href={heroData.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0d1c32] text-[#0d1c32] hover:bg-[#f5f3f5] px-8 py-4 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              {heroData.secondaryCta.label}
            </a>
          </div>

          <div className="hero-badges flex flex-wrap items-center gap-4 sm:gap-6 text-[#44474d]">
            {heroData.badges.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <IconComp className="w-5 h-5 text-[#cba72f] fill-[#ffe088]" />
                  <span className="text-sm font-semibold">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hero-image-wrap relative h-[320px] sm:h-[420px] lg:h-[540px] rounded-2xl overflow-hidden shadow-[0px_12px_32px_rgba(10,25,47,0.12)] bg-[#efedef] border border-[#eae7ea] mt-4 lg:mt-0">
          <img
            src={heroData.image.src}
            alt={heroData.image.alt}
            className="object-cover w-full h-full scale-105"
          />
        </div>
      </div>
    </section>
  );
}
