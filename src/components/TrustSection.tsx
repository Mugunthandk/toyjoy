import React from 'react';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-8 bg-[#f5f4ec]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center">
        {/* 1. Eco-Friendly Card */}
        <div className="flex items-center gap-4 p-5 bg-white rounded-3xl shadow-xs border border-[#e4e3db] hover:shadow-md transition-all max-w-md w-full">
          <div className="w-14 h-14 rounded-full bg-[#ffe16d] flex items-center justify-center text-[#221b00] shrink-0 shadow-xs">
            <span className="material-symbols-filled text-2xl">eco</span>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#1b1c17]">Eco-Friendly</h3>
            <p className="text-xs text-[#737686] font-medium">Sustainably sourced non-toxic materials.</p>
          </div>
        </div>
      </div>
    </section>
  );
};



