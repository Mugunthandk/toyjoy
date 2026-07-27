import React from 'react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenStoreLocator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenStoreLocator }) => {
  return (
    <footer className="w-full rounded-t-[40px] md:rounded-t-[48px] bg-[#eae8e0] text-[#1b1c17] mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12 py-16">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ea580c] via-[#e11d48] to-[#f59e0b] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-filled text-2xl">toys</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl bg-gradient-to-r from-[#ea580c] via-[#e11d48] to-[#d97706] bg-clip-text text-transparent">ToyJoy</span>
              <span className="px-1.5 py-0.5 bg-[#ffe16d] text-[#1b1c17] text-[10px] font-black rounded-lg uppercase border border-[#f59e0b] transform -rotate-3">WOW!</span>
            </div>
          </div>
          <p className="text-sm text-[#434655] leading-relaxed">
            © 2026 ToyJoy WOW! Play is the heart of childhood. Bringing joy, laughter, and learning to every home.
          </p>
          <div className="flex gap-3 pt-2">
            <button className="w-9 h-9 bg-[#2d6a4f]/10 rounded-full flex items-center justify-center text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
            <button className="w-9 h-9 bg-[#2d6a4f]/10 rounded-full flex items-center justify-center text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">thumb_up</span>
            </button>
            <button className="w-9 h-9 bg-[#2d6a4f]/10 rounded-full flex items-center justify-center text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">play_circle</span>
            </button>
          </div>
        </div>

        {/* Column 2: Products */}
        <div className="space-y-3">
          <h5 className="font-bold text-base text-[#1b1c17]">Products</h5>
          <ul className="space-y-2 text-sm text-[#434655]">
            <li 
              onClick={() => onSelectCategory('Wooden Toys')} 
              className="hover:text-[#2d6a4f] cursor-pointer transition-colors"
            >
              Wooden Toys
            </li>
            <li 
              onClick={() => onSelectCategory('STEM Kits')} 
              className="hover:text-[#2d6a4f] cursor-pointer transition-colors"
            >
              STEM & Robotics
            </li>
            <li 
              onClick={() => onSelectCategory('Plush Friends')} 
              className="hover:text-[#2d6a4f] cursor-pointer transition-colors"
            >
              Soft Toys & Plush
            </li>
            <li 
              onClick={() => onSelectCategory('Pretend Play')} 
              className="hover:text-[#2d6a4f] cursor-pointer transition-colors"
            >
              Pretend Play
            </li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="space-y-3">
          <h5 className="font-bold text-base text-[#1b1c17]">Support & Services</h5>
          <ul className="space-y-2 text-sm text-[#434655]">
            <li className="hover:text-[#2d6a4f] cursor-pointer transition-colors">About ToyJoy</li>
            <li className="hover:text-[#2d6a4f] cursor-pointer transition-colors">Free Shipping & Returns</li>
            <li onClick={onOpenStoreLocator} className="hover:text-[#2d6a4f] cursor-pointer transition-colors font-medium text-[#2d6a4f]">
              Store Locator
            </li>
            <li className="hover:text-[#2d6a4f] cursor-pointer transition-colors">Safety & Eco Certificates</li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="space-y-3">
          <h5 className="font-bold text-base text-[#1b1c17]">Contact Us</h5>
          <ul className="space-y-3 text-sm text-[#434655]">
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#2d6a4f] shrink-0 text-lg">location_on</span>
              <span>123 Wonderland Ave, <br /> Imagination City, IC 56789</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#2d6a4f] shrink-0 text-lg">call</span>
              <span>+1 (800) PLAY-JOY / +91 80 4912 3456</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#2d6a4f] shrink-0 text-lg">mail</span>
              <span>support@toyjoy.app</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
