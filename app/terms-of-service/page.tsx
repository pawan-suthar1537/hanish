import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingChat from "../components/FloatingChat";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | CA Portfolio",
  description:
    "Terms of Service and professional engagement conditions for Chartered Accountant advisory services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <FloatingChat />
      <main className="flex-1 bg-[#fafafa] py-12 sm:py-20 px-4 sm:px-10">
        <div className="max-w-[1000px] mx-auto bg-white p-6 sm:p-12 rounded-2xl shadow-sm border border-[#eae7ea]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0A192F] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#eae7ea]">
            <div className="w-12 h-12 rounded-full bg-[#ffe088] flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#241a00]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1b1d] font-hanken">
                Terms of Service
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Last updated: August 2026
              </p>
            </div>
          </div>

          <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website or engaging our professional services (including Income Tax Planning, GST Filing, Statutory Auditing, and Financial Consulting), you agree to be bound by these Terms of Service and applicable professional guidelines.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                2. Professional Engagement &amp; Scope
              </h2>
              <p>
                All consulting services provided are governed by specific engagement letters or agreements executed between CA Portfolio and the client. Services are rendered based strictly on the accurate and complete documentation provided by the client.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                3. Client Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Providing authentic, complete, and timely financial statements, vouchers, and tax records required for regulatory filings.</li>
                <li>Ensuring compliance with statutory deadlines by transmitting required records in advance of government due dates.</li>
                <li>Reviewing all returns and draft filings prior to final submission.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                4. Disclaimer &amp; Regulatory Compliance
              </h2>
              <p>
                While we exercise maximum professional care to ensure accuracy and compliance, final acceptance of returns or assessments rests with respective tax authorities (such as the Income Tax Department and GSTN Council). Advisory provided on this website is for general informational purposes and does not constitute a formal audit opinion until an engagement contract is executed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                5. Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of India and regulations issued by the Institute of Chartered Accountants of India (ICAI).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                6. Contact Us
              </h2>
              <div className="bg-[#f5f3f5] p-4 rounded-xl border border-[#eae7ea] text-sm text-[#1b1b1d] font-medium space-y-1">
                <p>Email: contact@caportfolio.com</p>
                <p>Phone: +91 7073507978</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
