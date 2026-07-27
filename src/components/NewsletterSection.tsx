import React, { useState } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-[#ea580c] via-[#e11d48] to-[#f59e0b] text-white rounded-[40px] md:rounded-[48px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 shadow-xl">
        <div className="relative z-10 flex-1 space-y-6">
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Join the Fun & <br /> Get 15% Off!
          </h2>

          <p className="text-white/90 text-base md:text-lg max-w-md">
            Sign up for our newsletter to receive magical updates, toy guides, and exclusive offers.
          </p>

          {subscribed ? (
            <div className="bg-emerald-500 text-white font-bold p-4 rounded-2xl max-w-md text-center shadow-md animate-fade-in">
              🎉 Welcome to the ToyJoy Family! Coupon code <strong>JOY15</strong> is unlocked!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white border-none rounded-2xl px-5 py-3.5 text-[#1b1c17] placeholder:text-[#737686] focus:outline-none focus:ring-4 focus:ring-[#ffe16d] text-base"
              />
              <button
                type="submit"
                className="bg-[#aa3000] hover:bg-[#d43f00] text-white px-8 py-3.5 rounded-2xl font-bold transition-colors shadow-md cursor-pointer shrink-0"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>

        {/* Floating Translucent Gift Box Icon */}
        <div className="relative z-10 flex-1 hidden lg:flex justify-center">
          <div className="w-72 h-72 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <span className="material-symbols-filled text-[140px] text-white">
              card_giftcard
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
