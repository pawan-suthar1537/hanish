import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig, navItems, footerData } from "../constants/portfolioData";

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white border-t-4 border-[#D4AF37] pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Contact Summary */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-extrabold text-white tracking-tight font-hanken block"
            >
              {siteConfig.name}
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              {footerData.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] bg-slate-900/80 px-3 py-1.5 rounded-full w-fit border border-slate-800">
              <ShieldCheck className="w-4 h-4" />
              <span>{footerData.certificationBadge}</span>
            </div>
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-base font-bold font-hanken text-[#D4AF37] mb-5 tracking-wide uppercase text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-[#D4AF37] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Offered */}
          <div>
            <h4 className="text-base font-bold font-hanken text-[#D4AF37] mb-5 tracking-wide uppercase text-xs">
              Core Solutions
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {footerData.coreSolutions.map((solution, idx) => (
                <li key={idx}>{solution}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div>
            <h4 className="text-base font-bold font-hanken text-[#D4AF37] mb-5 tracking-wide uppercase text-xs">
              Legal &amp; Governance
            </h4>
            <ul className="space-y-3 text-sm">
              {footerData.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-[#D4AF37] transition-colors font-medium underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{footerData.copyrightText}</p>
          <p className="text-slate-500">
            Crafted with precision for financial growth &amp; compliance.
          </p>
        </div>
      </div>
    </footer>
  );
}
