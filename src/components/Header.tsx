import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSmartSearch: () => void;
  onOpenGiftFinder: () => void;
  onOpenCompare: () => void;
  onOpenAdmin: () => void;
  notificationCount: number;
  onOpenNotifications: () => void;
  currentUser?: UserProfile | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSmartSearch,
  onOpenGiftFinder,
  onOpenCompare,
  onOpenAdmin,
  notificationCount,
  onOpenNotifications,
  currentUser,
}) => {
  return (
    <header className="w-full top-0 sticky z-40 bg-[#fbf9f1] border-b border-[#e4e3db] shadow-xs">
      <nav className="flex flex-wrap justify-between items-center px-4 md:px-12 py-3.5 max-w-7xl mx-auto gap-4">
        {/* Brand Logo - ToyJoy WOW! */}
        <div 
          onClick={() => setActiveTab('shop')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ea580c] via-[#e11d48] to-[#f59e0b] flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300">
            <span className="material-symbols-filled text-2xl text-white">toys</span>
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-[#ea580c] via-[#e11d48] to-[#d97706] bg-clip-text text-transparent">
                ToyJoy
              </span>
              <span className="px-1.5 py-0.5 bg-[#ffe16d] text-[#1b1c17] text-[10px] font-black rounded-lg shadow-2xs uppercase transform -rotate-3 border border-[#f59e0b]">
                WOW!
              </span>
            </div>
            <span className="text-[9px] font-extrabold text-[#ea580c] tracking-widest uppercase mt-0.5">
              Join The Fun • WOW!
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex gap-7 items-center font-extrabold text-sm">
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`pb-1 transition-all cursor-pointer ${
              activeTab === 'shop'
                ? 'text-[#ea580c] border-b-2 border-[#ea580c]'
                : 'text-[#434655] hover:text-[#ea580c]'
            }`}
          >
            Home 🏠
          </button>

          <button
            onClick={() => {
              if (activeTab !== 'shop') {
                setActiveTab('shop');
                setTimeout(() => {
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="pb-1 text-[#434655] hover:text-[#ea580c] transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Shop</span>
            <span className="material-symbols-outlined text-sm">arrow_downward</span>
          </button>

          <button
            onClick={() => {
              if (activeTab !== 'shop') {
                setActiveTab('shop');
                setTimeout(() => {
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="pb-1 text-[#434655] hover:text-[#ea580c] transition-all cursor-pointer"
          >
            New Arrivals ✨
          </button>

          <button
            onClick={() => {
              if (activeTab !== 'shop') {
                setActiveTab('shop');
                setTimeout(() => {
                  document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="pb-1 text-[#ea580c] hover:text-[#c8452a] transition-all cursor-pointer font-black"
          >
            Categories 🎁
          </button>
        </div>

        {/* Right Search & Action Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Bar & Mic Button */}
          <div className="flex items-center gap-1.5">
            <div 
              onClick={onOpenSmartSearch}
              className="relative hidden sm:flex items-center bg-[#f0eee6] hover:bg-[#e4e3db] rounded-full px-4 py-1.5 text-xs text-[#737686] w-40 md:w-52 cursor-pointer transition-colors border border-[#e4e3db]"
            >
              <span className="truncate">Search toys...</span>
              <span className="material-symbols-outlined absolute right-3 text-base text-[#737686]">search</span>
            </div>

            <button
              onClick={onOpenSmartSearch}
              className="p-2 bg-[#ea580c] text-white hover:bg-[#c8452a] rounded-full transition-all shadow-xs flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              title="Voice Search (Enable Mic 🎙️)"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
            </button>
          </div>

          {/* Wishlist */}
          <button 
            onClick={() => setActiveTab('wishlist')}
            className="relative p-2 text-[#434655] hover:text-[#ea580c] hover:scale-110 active:scale-95 transition-all"
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-2xl">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#ea580c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-[#ea580c] hover:scale-110 active:scale-95 transition-all"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            <span className="absolute top-0.5 right-0.5 bg-[#e11d48] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold shadow-xs">
              {cartCount > 0 ? cartCount : 2}
            </span>
          </button>

          {/* User Profile / Account Button */}
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
              currentUser
                ? 'bg-[#fff7ed] border-[#ea580c] text-[#ea580c] hover:bg-orange-100'
                : 'bg-[#ea580c] text-white border-[#ea580c] hover:bg-[#c8452a] shadow-xs'
            }`}
            title={currentUser ? `Logged in as ${currentUser.name}` : "Sign In / Create Account"}
          >
            {currentUser?.avatarUrl ? (
              <div className="relative">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover border border-[#ea580c]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
              </div>
            ) : (
              <span className="material-symbols-outlined text-lg">account_circle</span>
            )}
            <span className="text-xs font-black">
              {currentUser ? currentUser.name.split(' ')[0] : 'Log In / Sign Up'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

