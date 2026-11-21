import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ChevronRight, Award, Truck, Sparkles } from 'lucide-react';
import { InstagramIcon } from './FloatingSocials';

export default function Footer({ onNavigate, onOpenBankInfo }) {
  return (
    <footer className="bg-gradient-to-b from-[#09090e] via-[#060608] to-[#020204] border-t border-[#d4af37]/25 text-gray-400 text-xs relative overflow-hidden">
      {/* Subtle Ambient Gold Glow at Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pb-12">
        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/5">
          {/* Column 1: Brand Identity & Ethos (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#d4af37]/60 p-0.5 overflow-hidden bg-black shadow-[0_0_15px_rgba(212,175,55,0.25)] flex-shrink-0">
                <img src="/brand-logo.png" alt="SCENTORY.LK" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold tracking-widest uppercase gold-text-gradient block leading-tight">
                  SCENTORY<span className="text-xs font-normal text-gray-300">.LK</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono block">
                  A New Destination For Your Signature Scent
                </span>
              </div>
            </div>

            <p className="text-gray-300/80 font-light leading-relaxed text-xs max-w-md">
              Sri Lanka's dedicated house for authentic niche and designer decants. Handcrafted into sterile clinical glass atomizers in Ulapane and dispatched islandwide.
            </p>

            {/* Authenticity Guaranteed Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141420]/80 border border-[#d4af37]/35 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
              <span className="text-[11px] font-semibold text-[#f3e5ab] uppercase tracking-wider">
                100% Authentic Fragrances Guaranteed
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links Navigation (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <h4 className="font-serif-luxury text-xs font-bold uppercase tracking-widest text-[#f3e5ab]">
                Boutique Navigation
              </h4>
            </div>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="group flex items-center gap-1.5 text-gray-300 hover:text-[#d4af37] transition-colors cursor-pointer py-1"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#d4af37] transition-colors" />
                  <span>Home Showcase</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="group flex items-center gap-1.5 text-gray-300 hover:text-[#d4af37] transition-colors cursor-pointer py-1"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#d4af37] transition-colors" />
                  <span>All Fragrance Decants</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('reviews')}
                  className="group flex items-center gap-1.5 text-gray-300 hover:text-[#d4af37] transition-colors cursor-pointer py-1"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#d4af37] transition-colors" />
                  <span>Customer Reviews & Ratings</span>
                  <span className="text-[10px] text-[#d4af37] font-bold px-1.5 py-0.5 rounded bg-[#181824] border border-[#d4af37]/30">★ 4.9</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBankInfo}
                  className="group flex items-center gap-1.5 text-gray-300 hover:text-[#d4af37] transition-colors cursor-pointer py-1"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#d4af37] transition-colors" />
                  <span>Official Bank Transfer Details</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profile')}
                  className="group flex items-center gap-1.5 text-gray-300 hover:text-[#d4af37] transition-colors cursor-pointer py-1"
                >
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#d4af37] transition-colors" />
                  <span>My Profile & Order History</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sri Lanka Concierge Card (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-luxury text-xs font-bold uppercase tracking-widest text-[#f3e5ab]">
              Sri Lanka Concierge
            </h4>

            <div className="glass-panel p-4 rounded-2xl border border-[#d4af37]/25 space-y-3 bg-[#0d0d16]/90 shadow-lg">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Ulapane, Sri Lanka</span>
                  <span className="text-[10px] text-gray-400">Sterile Decanting Studio & Dispatch</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-2.5 pt-1 border-t border-white/5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/94763151311"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 hover:underline font-mono text-xs font-semibold"
                >
                  0763151311 (+94 76 315 1311)
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-2.5 pt-1 border-t border-white/5">
                <InstagramIcon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/scentory.lk"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-300 hover:text-pink-200 hover:underline text-xs"
                >
                  @scentory.lk (Instagram)
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5 pt-1 border-t border-white/5">
                <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <a href="mailto:orders@scentory.lk" className="text-gray-300 hover:text-white text-xs">
                  orders@scentory.lk
                </a>
              </div>

              {/* Payment Info */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Official Payment:</span>
                <span className="text-white text-[11px] font-medium block">
                  Online Bank Transfer (Commercial Bank of Ceylon)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Trust Pillars Strip (Responsive across all screens) */}
        <div className="py-6 border-b border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <Award className="w-4 h-4 text-[#d4af37] mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-gray-200 block">100% Authentic</span>
            <span className="text-[9px] text-gray-500">Pure Designer & Niche</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-gray-200 block">Clinical Atomizers</span>
            <span className="text-[9px] text-gray-500">Sealed & Sterile Flacons</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <Truck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-gray-200 block">Islandwide Delivery</span>
            <span className="text-[9px] text-gray-500">Fast Doorstep Courier</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <Phone className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[11px] font-semibold text-gray-200 block">WhatsApp Concierge</span>
            <span className="text-[9px] text-gray-500">0763151311 Support</span>
          </div>
        </div>

        {/* Bottom Copyright Bar with safe padding */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} SCENTORY.LK. All Rights Reserved. Handcrafted & Curated for Sri Lanka.
          </div>
          <div className="text-[10px] text-gray-500 font-mono">
            Ulapane Studio • Islandwide Courier Service
          </div>
        </div>
      </div>
    </footer>
  );
}
