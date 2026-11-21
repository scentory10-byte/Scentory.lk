import React from 'react';
import { MessageCircle } from 'lucide-react';

export function InstagramIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function FloatingSocials() {
  return (
    <aside
      aria-label="Floating Concierge and Social Actions"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 print:hidden pointer-events-none"
    >
      {/* 1. Instagram Floating Icon (TOP) */}
      <a
        href="https://www.instagram.com/scentory.lk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow SCENTORY.LK on Instagram"
        title="Follow @scentory.lk on Instagram"
        className="pointer-events-auto w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-[0_4px_20px_rgba(253,29,29,0.4)] hover:shadow-[0_6px_25px_rgba(253,29,29,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/25 flex items-center justify-center relative group"
      >
        <InstagramIcon className="w-6 h-6" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 opacity-20 group-hover:opacity-70 blur-sm transition-opacity -z-10" />
      </a>

      {/* 2. WhatsApp Floating Icon (BOTTOM) */}
      <a
        href="https://wa.me/94763151311?text=Hello%20SCENTORY,%20I%20would%20like%20to%20inquire%20about%20your%20fragrances"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SCENTORY.LK Concierge on WhatsApp"
        title="Chat on WhatsApp (0763151311)"
        className="pointer-events-auto w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-400/35 flex items-center justify-center relative group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-20 group-hover:opacity-70 blur-sm transition-opacity -z-10" />
      </a>
    </aside>
  );
}
