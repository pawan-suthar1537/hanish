"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { Menu, X, Calendar } from "lucide-react";
import { siteConfig, navItems } from "../constants/portfolioData";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    gsap.fromTo(
      "#main-nav",
      { y: -20, opacity: 0.7 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (nextState && mobileMenu) {
      gsap.fromTo(
        mobileMenu,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        mobileLinks,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.05,
        }
      );
    }
  };

  return (
    <header
      id="main-nav"
      className={`bg-[#fbf9fb] sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
        isScrolled
          ? "shadow-md border-[#c5c6cd]"
          : "shadow-xs border-[#eae7ea]"
      }`}
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-10 max-w-[1280px] mx-auto h-20">
        <a
          href="#home"
          className="text-2xl font-extrabold text-[#000000] tracking-tight font-hanken"
        >
          {siteConfig.name}
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`text-sm transition-all duration-300 pb-1 ${
                  isActive
                    ? "text-[#000000] border-b-2 border-[#cba72f] font-bold"
                    : "text-[#5f5e5e] hover:text-[#000000] border-b-2 border-transparent font-semibold"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center gap-2 bg-[#cba72f] text-[#4e3d00] hover:opacity-90 px-6 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-xs"
        >
          <Calendar className="w-4 h-4" />
          Book a Consultation
        </a>

        {/* Mobile Menu Toggle Button */}
        <button
          aria-label="Toggle Navigation"
          onClick={toggleMenu}
          className="md:hidden text-[#1b1b1d] p-2 focus:outline-none focus:ring-2 focus:ring-[#000000] rounded-lg"
        >
          {isMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-20 bg-[#fbf9fb] backdrop-blur-lg border-b border-[#eae7ea] shadow-2xl flex flex-col px-6 py-6 space-y-3 z-40"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`mobile-nav-link text-lg py-2 border-b border-[#f5f3f5] transition-colors ${
                  isActive
                    ? "text-[#000000] font-bold"
                    : "text-[#5f5e5e] font-semibold hover:text-[#000000]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mobile-nav-link inline-flex items-center justify-center gap-2 bg-[#cba72f] text-[#4e3d00] font-bold px-6 py-3.5 rounded-full text-sm text-center mt-4 shadow-md"
          >
            <Calendar className="w-4 h-4" />
            Book a Consultation
          </a>
        </div>
      )}
    </header>
  );
}
