import React, { useState, useEffect } from 'react';
import { Product, Currency, ComparisonResult } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onAddToCart: (p: Product) => void;
  onRemoveCompare: (id: string) => void;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onAddToCart,
  onRemoveCompare
}) => {
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    if (isOpen && products.length >= 2) {
      fetchComparison();
    }
  }, [isOpen, products.length]);

  const fetchComparison = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products })
      });
      const data = await res.json();

      setComparison({
        products,
        summaryText: data.summaryText || `${products[0].name} is excellent for physical motor skills, while ${products[1].name} excels at creative STEM building.`,
        winnerByAgeGroup: {
          'Toddlers (1-4 yrs)': products[0].name,
          'Big Kids (5+ yrs)': products[1].name
        },
        bestForSTEM: data.bestForSTEM || products[1].name,
        bestValue: data.bestValue || products[0].name
      });
    } catch {
      setComparison({
        products,
        summaryText: "Both toys comply with strict non-toxic safety certifications and offer high durability.",
        winnerByAgeGroup: { 'Ages 3-8': products[0].name },
        bestForSTEM: products[0].name,
        bestValue: products[1].name
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f1] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-[#c3c6d7] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2d6a4f] text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl">compare_arrows</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold">AI Product Comparison Panel</h2>
              <p className="text-xs text-emerald-100">Comparing {products.length} toys side-by-side with AI evaluation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {products.length < 2 ? (
            <div className="py-16 text-center space-y-3">
              <span className="material-symbols-outlined text-5xl text-[#737686]">sync_alt</span>
              <h3 className="font-bold text-lg text-[#1b1c17]">Select at least 2 toys to compare!</h3>
              <p className="text-sm text-[#737686]">Click the compare icon on any product card in the store.</p>
            </div>
          ) : (
            <>
              {/* AI Summary Banner */}
              {loading ? (
                <div className="p-4 bg-white rounded-2xl border border-[#c3c6d7] text-center font-bold text-sm text-[#2d6a4f]">
                  Generating AI comparison summary...
                </div>
              ) : comparison ? (
                <div className="bg-[#d8f3dc]/50 border border-[#2d6a4f] p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1b4332]">
                    <span className="material-symbols-filled text-lg text-[#2d6a4f]">auto_awesome</span>
                    AI Comparison Verdict
                  </div>
                  <p className="text-sm text-[#1b1c17] leading-relaxed font-medium">{comparison.summaryText}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
                    <div className="bg-white p-2.5 rounded-xl border border-[#c3c6d7]">
                      <span className="text-[#737686] block">🏆 Best for STEM:</span>
                      <strong className="text-[#2d6a4f]">{comparison.bestForSTEM}</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-[#c3c6d7]">
                      <span className="text-[#737686] block">💡 Best Value:</span>
                      <strong className="text-[#aa3000]">{comparison.bestValue}</strong>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#c3c6d7]">
                      <th className="p-3 text-xs font-bold text-[#737686] uppercase">Feature</th>
                      {products.map((p) => (
                        <th key={p.id} className="p-3 min-w-[200px]">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h5 className="font-bold text-sm text-[#1b1c17]">{p.name}</h5>
                              <p className="text-xs text-[#2d6a4f] font-bold">{formatPrice(p.priceINR, currency)}</p>
                            </div>
                            <button
                              onClick={() => onRemoveCompare(p.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-bold"
                            >
                              Remove
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e4e3db]">
                    <tr>
                      <td className="p-3 font-semibold text-[#434655]">Age Suitability</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 font-medium text-[#1b1c17]">{p.ageRange}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#434655]">STEM Rating</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 font-bold text-[#2d6a4f]">{p.stemValue} / 10 ⭐</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#434655]">Materials</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 text-[#1b1c17]">{p.materials}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#434655]">Battery Required</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 text-[#1b1c17]">{p.batteryRequired ? 'Yes 🔋' : 'No ☀️'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#434655]">Warranty</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 text-[#1b1c17]">{p.warranty}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#434655]">Action</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3">
                          <button
                            onClick={() => onAddToCart(p)}
                            className="px-4 py-2 bg-[#2d6a4f] text-white text-xs font-bold rounded-xl hover:bg-[#40916c]"
                          >
                            Add to Cart
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
