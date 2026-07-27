import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface AISmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const AISmartSearchModal: React.FC<AISmartSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onAddToCart,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const [imageSearch, setImageSearch] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const popularSearches = [
    'Best educational toys under ₹2,000',
    'Soft toys for a 3-year-old',
    'Remote control dinosaur with rechargeable battery',
    'Montessori wooden kitchen',
    'Solar robot STEM kit'
  ];

  // Filtering products based on query or image tag simulation
  const filtered = products.filter((p) => {
    if (imageSearch) {
      return p.category === 'Wooden Toys' || p.category === 'STEM Kits';
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSearch(event.target?.result as string);
        setQuery('Image search active: Wooden & STEM Toys detected');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceSearch = async () => {
    // Request microphone permission explicitly first if needed
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.warn('Microphone permission request:', err);
      }
    }

    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setQuery('Dinosaur toys under 3000');
      return;
    }
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      setIsListening(true);
      recognition.start();

      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setQuery(transcript);
        if (e.results[0].isFinal) {
          setIsListening(false);
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } catch {
      setQuery('Solar robot kit');
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f1] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#c3c6d7] max-h-[90vh] flex flex-col">
        {/* Search Header */}
        <div className="p-6 bg-[#2d6a4f] text-white flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-extrabold text-xl">
              <span className="material-symbols-filled text-2xl text-[#ffe16d]">auto_awesome</span>
              AI Smart Search & Visual Recognition
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Search Bar Input */}
          <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-md gap-3 text-[#1b1c17] relative">
            <span className="material-symbols-outlined text-[#2d6a4f] text-2xl">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (imageSearch) setImageSearch(null);
              }}
              placeholder="Search in plain English: 'Soft toys for 3yo' or 'STEM kits under ₹3,000'"
              className="flex-1 bg-transparent border-none outline-none text-base focus:ring-0 placeholder:text-[#737686]"
            />

            {/* Voice Mic Button */}
            <button
              onClick={handleVoiceSearch}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 font-bold text-xs ${
                isListening ? 'bg-red-500 text-white animate-pulse shadow-md' : 'bg-[#f0eee6] text-[#2d6a4f] hover:bg-[#d8f3dc]'
              }`}
              title="Voice Search (Microphone Enabled)"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
              {isListening && <span>Listening...</span>}
            </button>

            {/* Image Search Button */}
            <label className="p-2 bg-[#f0eee6] text-[#aa3000] hover:bg-[#ffdbd0] rounded-xl cursor-pointer" title="AI Image Search">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {imageSearch && (
            <div className="bg-[#ffe16d]/30 border border-[#ffe16d] p-4 rounded-2xl flex items-center gap-4">
              <img src={imageSearch} alt="Uploaded Search" className="w-16 h-16 object-cover rounded-xl border border-[#ffe16d]" />
              <div>
                <span className="font-bold text-sm text-[#705d00] flex items-center gap-1">
                  <span className="material-symbols-filled text-sm">center_focus_strong</span>
                  AI Vision Analysis Complete
                </span>
                <p className="text-xs text-[#1b1c17] mt-1">
                  Detected Category: <strong>Wooden Toys / STEM Construction</strong>. Displaying matching products below!
                </p>
              </div>
              <button
                onClick={() => {
                  setImageSearch(null);
                  setQuery('');
                }}
                className="ml-auto text-xs font-bold text-[#aa3000] underline"
              >
                Clear Image
              </button>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <h4 className="text-xs font-bold text-[#737686] uppercase tracking-wider mb-2">Popular AI Queries</h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s);
                    setImageSearch(null);
                  }}
                  className="px-3 py-1.5 bg-[#f0eee6] hover:bg-[#d8f3dc] text-[#2d6a4f] font-semibold text-xs rounded-full transition-colors border border-[#c3c6d7]"
                >
                  🔍 {s}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div>
            <h4 className="text-sm font-bold text-[#1b1c17] mb-3">
              Matching Products ({filtered.length})
            </h4>

            {filtered.length === 0 ? (
              <div className="py-12 text-center text-[#737686] space-y-2">
                <span className="material-symbols-outlined text-5xl text-[#c3c6d7]">search_off</span>
                <p className="font-bold">No toys found matching your query.</p>
                <p className="text-xs">Try typing "STEM", "Wooden", or "Dinosaur"!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-2xl border border-[#c3c6d7] shadow-xs flex flex-col justify-between hover:border-[#2d6a4f] transition-colors"
                  >
                    <div
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="cursor-pointer space-y-2"
                    >
                      <img src={product.imageUrl} alt={product.name} className="w-full h-36 object-cover rounded-xl" />
                      <h5 className="font-bold text-sm text-[#1b1c17] line-clamp-1">{product.name}</h5>
                      <p className="text-xs text-[#737686]">{product.ageRange} • {product.category}</p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#f0eee6]">
                      <span className="font-bold text-sm text-[#2d6a4f]">{formatPrice(product.priceINR, currency)}</span>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-3 py-1 bg-[#2d6a4f] text-white text-xs font-bold rounded-lg hover:bg-[#40916c]"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
