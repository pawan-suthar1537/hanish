import { MessageCircle } from "lucide-react";

export default function FloatingChat() {
  return (
    <div className="md:hidden fixed bottom-6 right-6 z-40 flex items-center justify-center">
      <a
        aria-label="Quick WhatsApp Contact"
        href="#contact"
        className="flex items-center justify-center text-[#ffffff] bg-[#000000] shadow-[0px_12px_32px_rgba(10,25,47,0.25)] rounded-full w-14 h-14 hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
