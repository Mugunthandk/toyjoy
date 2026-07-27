import React from 'react';

interface HeroProps {
  onShopNow: () => void;
  onOpenGiftFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onOpenGiftFinder }) => {
  return (
    <section className="relative min-h-[520px] md:min-h-[580px] flex items-center overflow-hidden rounded-b-3xl">
      {/* Background Image with soft warm overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1600"
          alt="Welcome to The Wonderland Toy Shop"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent md:to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column: Text & CTAs */}
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffe16d] text-[#544600] font-black text-xs uppercase tracking-wider shadow-xs">
            <span className="material-symbols-filled text-sm text-[#856400]">celebration</span>
            🎉 JOIN THE FUN AT TOYJOY
          </div>

          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1b1c17] leading-[1.12] tracking-tight">
            Unleash the <span className="text-[#ea580c] font-extrabold">Magic</span> <br /> of Play
          </h1>

          <p className="text-[#434655] text-base sm:text-lg leading-relaxed max-w-lg font-medium">
            Discover a curated collection of toys designed to spark imagination, nurture curiosity, and create lasting childhood memories.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onShopNow}
              className="px-8 py-3.5 bg-[#ea580c] hover:bg-[#c8452a] text-white rounded-full font-extrabold text-base shadow-lg transition-all cursor-pointer hover-bounce"
            >
              Shop Now
            </button>

            <button
              onClick={onOpenGiftFinder}
              className="px-8 py-3.5 bg-white border-2 border-[#ea580c] text-[#ea580c] hover:bg-orange-50 rounded-full font-extrabold text-base transition-all cursor-pointer shadow-xs"
            >
              Learn More
            </button>
          </div>

          {/* Customer Avatar & Rating Ribbon */}
          <div className="pt-4 flex items-center gap-4">
            <div className="flex -space-x-2 overflow-hidden">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Customer" referrerPolicy="no-referrer" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Customer" referrerPolicy="no-referrer" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Customer" referrerPolicy="no-referrer" />
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                <span className="material-symbols-filled text-sm">star</span>
                <span className="material-symbols-filled text-sm">star</span>
                <span className="material-symbols-filled text-sm">star</span>
                <span className="material-symbols-filled text-sm">star</span>
                <span className="material-symbols-filled text-sm">star</span>
                <span className="text-[#1b1c17] ml-1">4.9/5</span>
              </div>
              <p className="text-[#737686] font-medium">Trusted by 10,000+ Happy Parents</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Picture Feature Cards */}
        <div className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white shadow-xl flex items-center gap-3 hover-bounce transition-transform">
            <img
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=200"
              alt="Wooden Rainbow"
              className="w-16 h-16 object-cover rounded-2xl border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-[10px] uppercase font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                #1 Best Seller
              </span>
              <h4 className="font-extrabold text-xs text-[#1b1c17] mt-1">Rainbow Wooden Arch</h4>
              <p className="text-[11px] text-[#ea580c] font-black">₹1,999 • 100% Eco-wood</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white shadow-xl flex items-center gap-3 hover-bounce transition-transform ml-6">
            <img
              src="https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=200"
              alt="STEM Solar Bot"
              className="w-16 h-16 object-cover rounded-2xl border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-[10px] uppercase font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                STEM Certified
              </span>
              <h4 className="font-extrabold text-xs text-[#1b1c17] mt-1">Solar Explorer Bot</h4>
              <p className="text-[11px] text-[#ea580c] font-black">₹3,499 • 7 DIY Builds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Yellow Star Accent on the top right */}
      <div className="absolute right-12 md:right-28 top-16 hidden md:block pointer-events-none opacity-85">
        <span className="material-symbols-filled text-7xl md:text-9xl text-[#ffe16d] select-none drop-shadow-md">
          star
        </span>
      </div>
    </section>
  );
};


