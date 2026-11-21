import React, { useState } from 'react';
import { MessageCircle, Sparkles, X, Send, Phone, User, Check, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LiveChatCustomPerfume() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('custom'); // 'custom' | 'chat'

  // Form fields
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [scentVision, setScentVision] = useState('');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('50ml Extrait');
  const [longevity, setLongevity] = useState('Beast Mode (12h+)');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const quickNotesSuggestions = [
    'Oud & Leather', 'Madagascar Vanilla', 'Smoky Amber', 'French Rose',
    'Bergamot Citrus', 'Tonka & Tobacco', 'Sandalwood Santal', 'Aquatic Marine'
  ];

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    setSubmittedSuccess(false);
    setErrorMessage('');
    if (user) {
      if (!name) setName(user.name || '');
      if (!phone) setPhone(user.phone || '');
      if (!email) setEmail(user.email || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and WhatsApp phone number.');
      return;
    }

    if (activeTab === 'custom' && !notes.trim() && !scentVision.trim() && !message.trim()) {
      setErrorMessage('Please describe your desired scent notes or fragrance vision.');
      return;
    }

    if (activeTab === 'chat' && !message.trim()) {
      setErrorMessage('Please type your inquiry or message.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        customerName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        scentVision: activeTab === 'custom' ? scentVision.trim() : 'Live Concierge Inquiry',
        notes: activeTab === 'custom' ? `${notes.trim()} (Strength: ${longevity})` : '',
        budget: activeTab === 'custom' ? budget : '',
        message: message.trim(),
        isCustomCreation: activeTab === 'custom'
      };

      // 1. Send to Backend API (Saves in DB + Alerts Admin Panel)
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit inquiry.');

      // 2. Automatically launch WhatsApp to notify shop owner immediately
      let waText = '';
      if (activeTab === 'custom') {
        waText = encodeURIComponent(
          `*BESPOKE PERFUME CREATION INQUIRY - SCENTORY.LK*\n\n` +
          `*Customer Name:* ${name.trim()}\n` +
          `*WhatsApp / Phone:* ${phone.trim()}\n` +
          `*Scent Vision:* ${scentVision.trim() || 'Custom Formulation'}\n` +
          `*Preferred Notes:* ${notes.trim()}\n` +
          `*Longevity Style:* ${longevity}\n` +
          `*Bottle Size / Budget:* ${budget}\n` +
          `*Special Instructions:* ${message.trim() || 'None'}\n\n` +
          `_Submitted via SCENTORY Live Concierge. Ready for consultation!_`
        );
      } else {
        waText = encodeURIComponent(
          `*LIVE CONCIERGE CHAT INQUIRY - SCENTORY.LK*\n\n` +
          `*Customer Name:* ${name.trim()}\n` +
          `*WhatsApp / Phone:* ${phone.trim()}\n` +
          `*Message:* ${message.trim()}\n\n` +
          `_Submitted via SCENTORY Live Concierge._`
        );
      }

      window.open(`https://wa.me/94763151311?text=${waText}`, '_blank');
      setSubmittedSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'Could not deliver message. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Pill Button */}
      <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 print:hidden">
        <button
          onClick={handleToggleOpen}
          aria-label="Open Custom Perfume Creation & Live Chat"
          className="relative px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-[#12121c] via-[#1a1824] to-[#12121c] border border-[#d4af37]/60 text-[#fcf6ba] shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]" />
          </span>

          <Sparkles className="w-4 h-4 text-[#d4af37] group-hover:rotate-12 transition-transform" />
          <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold font-serif-luxury text-[#fcf6ba] whitespace-nowrap">
            Custom Perfume & Chat
          </span>
        </button>
      </div>

      {/* Slide-Up Chat & Bespoke Creation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative w-full sm:max-w-lg bg-[#0d0d14] border-t sm:border border-[#d4af37]/35 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto z-10 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#aa820a] p-0.5 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white tracking-wide">
                    SCENTORY Bespoke Atelier
                  </h3>
                  <p className="text-[10px] text-[#c5a059] uppercase tracking-widest font-mono">
                    Master Perfumer & Live Concierge
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="my-4 grid grid-cols-2 gap-2 bg-[#14141c] p-1 rounded-2xl border border-white/5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('custom');
                  setSubmittedSuccess(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'custom'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Creation</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('chat');
                  setSubmittedSuccess(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Live Concierge</span>
              </button>
            </div>

            {/* Success Confirmation State */}
            {submittedSuccess ? (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-xl font-bold text-white">
                  Inquiry Dispatched Successfully!
                </h4>
                <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Your request has been routed to our admin management panel and opened in WhatsApp (<strong>0763151311</strong>). Our master perfumer will craft and respond to your vision promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setMessage('');
                  }}
                  className="px-6 py-2 rounded-xl bg-[#14141c] hover:bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fcf6ba] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohamad Umar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0763151311"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                {activeTab === 'custom' ? (
                  <>
                    {/* Scent Vision */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Fragrance Name / Vision
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Imperial Oud Elixir, Midnight Amber Royale"
                        value={scentVision}
                        onChange={(e) => setScentVision(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none transition-colors"
                      />
                    </div>

                    {/* Preferred Notes with Quick Suggestions */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Preferred Scent Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Madagascar Vanilla, Smoky Leather, Bergamot..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none transition-colors mb-2"
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {quickNotesSuggestions.map((note) => (
                          <button
                            key={note}
                            type="button"
                            onClick={() => setNotes(prev => prev ? `${prev}, ${note}` : note)}
                            className="px-2 py-0.5 rounded-full text-[9px] bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 text-gray-300 hover:text-[#fcf6ba] transition-colors cursor-pointer"
                          >
                            + {note}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottle Size & Longevity */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Bottle Flacon Size
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none cursor-pointer"
                        >
                          <option value="30ml Travel Flacon">30ml Travel Flacon</option>
                          <option value="50ml Signature Extrait">50ml Signature Extrait</option>
                          <option value="100ml Luxury Flacon">100ml Luxury Flacon</option>
                          <option value="Custom Gift Set">Custom Gift Set</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                          Longevity Style
                        </label>
                        <select
                          value={longevity}
                          onChange={(e) => setLongevity(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none cursor-pointer"
                        >
                          <option value="Beast Mode (12h+)">Beast Mode (12h+)</option>
                          <option value="Evening Intense (8-10h)">Evening Intense (8-10h)</option>
                          <option value="Daily Fresh (6-8h)">Daily Fresh (6-8h)</option>
                          <option value="Subtle Skin Scent">Subtle Skin Scent</option>
                        </select>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                        Special Instructions / Inspiration (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Mention any designer perfumes you like or specific mood you want to evoke..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none transition-colors resize-none"
                      />
                    </div>
                  </>
                ) : (
                  /* Concierge Chat Mode */
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                      Your Message or Order Inquiry *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Ask about delivery, tracking an order, stock inquiry, or fragrance consultation..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-[#d4af37] text-white text-xs outline-none transition-colors resize-none"
                    />
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#aa820a] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitting
                      ? 'Submitting Request...'
                      : activeTab === 'custom'
                      ? 'Send to Master Perfumer & WhatsApp'
                      : 'Send Inquiry to Concierge'}
                  </span>
                </button>

                <p className="text-[10px] text-center text-gray-500">
                  Instant routing to Admin Console & WhatsApp Concierge (<strong>0763151311</strong>)
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
