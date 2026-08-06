import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingChat from "../components/FloatingChat";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | CA Portfolio",
  description:
    "Privacy Policy and data protection guidelines for Chartered Accountant financial services.",
};

export default function PrivacyPolicyPage() {
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
            <div className="w-12 h-12 rounded-full bg-[#d6e3ff] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#0d1c32]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1b1d] font-hanken">
                Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Last updated: August 2026
              </p>
            </div>
          </div>

          <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                1. Overview &amp; Commitment
              </h2>
              <p>
                At CA Portfolio, confidentiality and client trust form the bedrock of our practice. As Chartered Accountants governed by strict professional standards, we adhere to rigorous ethical guidelines and legal frameworks regarding the handling, storage, and processing of your personal and financial information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                2. Information We Collect
              </h2>
              <p>
                To provide comprehensive tax planning, auditing, and financial consulting services, we may collect the following categories of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>Personal Identification Data:</strong> Full Name, Phone Number, Email Address, PAN/Aadhaar information.</li>
                <li><strong>Financial &amp; Business Records:</strong> Income statements, GST registration details, tax returns, bank statements, ledger entries, and corporate registration documents.</li>
                <li><strong>Inquiry Form Data:</strong> Information submitted voluntarily via our contact and WhatsApp consultation forms.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                3. How We Use Your Information
              </h2>
              <p>Your information is strictly utilized for legitimate professional purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Preparing and filing Income Tax, GST, and statutory regulatory compliance documents on your behalf.</li>
                <li>Conducting statutory and internal financial audits as instructed by your organization.</li>
                <li>Communicating updates regarding tax deadlines, filings, or advisory inquiries.</li>
                <li>Maintaining compliance with the Institute of Chartered Accountants (ICAI) code of ethics.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                4. Data Protection &amp; Confidentiality
              </h2>
              <p>
                We do not sell, rent, or trade your personal or financial data to third-party advertisers. Information is only shared with authorized statutory government bodies (such as the Income Tax Department or GSTN Portal) as mandated by law for completing regulatory filings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#1b1b1d] font-hanken">
                5. Contact Information
              </h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or your data protection rights, please contact us at:
              </p>
              <div className="bg-[#f5f3f5] p-4 rounded-xl border border-[#eae7ea] text-sm text-[#1b1b1d] font-medium space-y-1">
                <p>Email: contact@caportfolio.com</p>
                <p>Phone: +91 7073507978</p>
                <p>Office: Financial District, Mumbai, MH 400001</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
