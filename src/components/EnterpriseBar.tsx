import React from 'react';
import { Currency, Language, LoyaltyProfile } from '../types';

interface EnterpriseBarProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  loyalty: LoyaltyProfile;
  onOpenStoreLocator: () => void;
  onOpenLoyaltyModal: () => void;
}

export const EnterpriseBar: React.FC<EnterpriseBarProps> = ({
  currency,
  setCurrency,
  language,
  setLanguage,
  loyalty,
  onOpenStoreLocator,
  onOpenLoyaltyModal
}) => {
  const currencyLabels: Record<Currency, string> = {
    INR: '₹ INR',
    USD: '$ USD',
    EUR: '€ EUR',
    GBP: '£ GBP',
    AED: 'AED',
    SGD: 'S$ SGD'
  };

  const languageLabels: Record<Language, string> = {
    // Indian Languages
    en: 'English 🇬🇧',
    ta: 'தமிழ் 🇮🇳',
    hi: 'हिंदी 🇮🇳',
    te: 'తెలుగు 🇮🇳',
    ml: 'മലയാളം 🇮🇳',
    kn: 'ಕನ್ನಡ 🇮🇳',
    bn: 'বাংলা 🇮🇳',
    mr: 'मराठी 🇮🇳',
    gu: 'ગુજરાતી 🇮🇳',
    pa: 'ਪੰਜਾਬੀ 🇮🇳',
    or: 'ଓଡ଼ିଆ 🇮🇳',
    ur: 'اردو 🇮🇳',
    // Global Languages
    es: 'Español 🇪🇸',
    fr: 'Français 🇫🇷',
    de: 'Deutsch 🇩🇪',
    ja: '日本語 🇯🇵',
    zh: '中文 (简体) 🇨🇳',
    ar: 'العربية 🇦🇪',
    pt: 'Português 🇧🇷',
    ru: 'Русский 🇷🇺',
    ko: '한국어 🇰🇷',
    it: 'Italiano 🇮🇹',
    nl: 'Nederlands 🇳🇱',
    id: 'Bahasa Indonesia 🇮🇩',
    vi: 'Tiếng Việt 🇻🇳',
    th: 'ไทย 🇹🇭',
    tr: 'Türkçe 🇹🇷'
  };

  return (
    <div className="bg-gradient-to-r from-[#ea580c] via-[#e11d48] to-[#d97706] text-white text-xs py-2 px-4 md:px-12 flex flex-wrap justify-between items-center shadow-xs">
      <div className="flex items-center gap-3 font-extrabold tracking-wide">
        <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full uppercase text-[10px] tracking-wider flex items-center gap-1">
          <span>🎉</span> JOIN THE FUN!
        </span>
        <span className="hidden sm:inline">Use Code <strong className="bg-white text-[#ea580c] px-1.5 py-0.5 rounded font-black">JOYFUN</strong> for Extra 15% OFF + Free Gift! 🎁</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 font-bold text-amber-200">
          <span className="material-symbols-outlined text-sm">stars</span>
          VIP ({loyalty.level}): <strong className="text-white">{loyalty.points} pts</strong>
        </span>
        <button 
          onClick={onOpenLoyaltyModal} 
          className="underline hover:text-amber-200 transition-colors font-semibold"
        >
          Redeem
        </button>

        <span className="hidden md:inline text-white/40">|</span>

        {/* Store locator */}
        <button 
          onClick={onOpenStoreLocator}
          className="hidden md:flex items-center gap-1 hover:text-amber-200 transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-sm">location_on</span>
          Stores (4)
        </button>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-white border border-white/20">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent border-none text-xs focus:ring-0 cursor-pointer outline-none text-white font-bold"
          >
            {Object.entries(languageLabels).map(([code, label]) => (
              <option key={code} value={code} className="bg-gray-900 text-white">
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Currency selector */}
        <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-white border border-white/20">
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-transparent border-none text-xs focus:ring-0 cursor-pointer outline-none text-white font-bold"
          >
            {Object.entries(currencyLabels).map(([code, label]) => (
              <option key={code} value={code} className="bg-gray-900 text-white">
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
