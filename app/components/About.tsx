"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "../constants/portfolioData";

export default function About() {
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: "#about",
      start: "top 80%",
      onEnter: () => {
        aboutData.stats.forEach((stat, idx) => {
          const el = statRefs.current[idx];
          if (el) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.floor(obj.val)}${stat.suffix}`;
              },
            });
          }
        });
      },
      once: true,
    });
  }, []);

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-[#ffffff] px-4 sm:px-10 border-t border-[#eae7ea]"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="about-image-wrap relative h-[280px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-sm border border-[#eae7ea] order-2 lg:order-1">
          <img
            src={aboutData.image.src}
            alt={aboutData.image.alt}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1b1d] mb-6 font-hanken">
            {aboutData.title}
          </h2>

          {aboutData.paragraphs.map((para, idx) => (
            <p key={idx} className="text-base text-[#44474d] mb-6 leading-relaxed">
              {para}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {aboutData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 bg-[#f5f3f5] rounded-xl border border-[#eae7ea] text-center shadow-xs"
              >
                <div
                  ref={(el) => {
                    statRefs.current[idx] = el;
                  }}
                  className="text-3xl sm:text-4xl font-extrabold text-[#0d1c32] mb-2 font-hanken"
                >
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#44474d] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
