"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import { testimonialsData } from "../constants/portfolioData";

export default function Testimonials() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#testimonials .testimonial-card", {
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#testimonials .grid",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 bg-[#fbf9fb] px-4 sm:px-10 border-t border-[#eae7ea]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1b1d] mb-4 font-hanken">
            {testimonialsData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#44474d] max-w-2xl mx-auto">
            {testimonialsData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.reviews.map((review, idx) => (
            <div
              key={idx}
              className="testimonial-card card-hover bg-[#ffffff] p-6 sm:p-8 rounded-2xl shadow-[0px_4px_20px_rgba(10,25,47,0.05)] border border-[#eae7ea]"
            >
              <div className="flex gap-1 text-[#cba72f] mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#cba72f] text-[#cba72f]"
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base text-[#44474d] italic mb-6 leading-relaxed">
                {review.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eae7ea] overflow-hidden flex-shrink-0">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1b1b1d] text-base font-hanken">
                    {review.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#44474d]">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
