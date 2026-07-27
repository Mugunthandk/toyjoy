import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface BestSellersSectionProps {
  products: Product[];
  currency: Currency;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
  onToggleCompare: (product: Product) => void;
  selectedCompareIds: string[];
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  currency,
  onAddToCart,
  onSelectProduct,
  onViewAll,
  onToggleCompare,
  selectedCompareIds
}) => {
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  const handleImageSelect = (e: React.MouseEvent, productId: string, index: number) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({ ...prev, [productId]: index }));
  };

  return (
    <section id="shop-section" className="py-20 bg-[#f0eee6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="px-3 py-1 bg-[#d8f3dc] text-[#1b4332] text-xs font-black uppercase tracking-wider rounded-full mb-2 inline-block">
              TOP RATED TOYS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1b1c17] tracking-tight">
              Best Selling Toys
            </h2>
            <p className="text-[#434655] mt-1 text-base font-medium">
              Tested by kids, loved by parents — our top 4 most popular toys!
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="flex items-center gap-2 text-[#ea580c] font-extrabold text-base hover:underline group cursor-pointer"
          >
            <span>View All Products</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => {
            const isComparing = selectedCompareIds.includes(product.id);
            const gallery = product.galleryImages && product.galleryImages.length > 0 
              ? product.galleryImages 
              : [product.imageUrl];
            const activeIdx = activeImageIndexes[product.id] || 0;
            const currentImg = gallery[activeIdx] || product.imageUrl;

            return (
              <div
                key={product.id}
                className="bg-white p-5 rounded-3xl shadow-xs hover:shadow-2xl transition-all duration-300 relative flex flex-col group border border-[#c3c6d7]"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                  {product.isBestSeller && (
                    <span className="bg-[#aa3000] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase">
                      Best Seller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#2d6a4f] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase">
                      New Arrival
                    </span>
                  )}
                  {product.isLimited && (
                    <span className="bg-[#c9a900] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase">
                      Limited Stock
                    </span>
                  )}
                </div>

                {/* Compare Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompare(product);
                  }}
                  className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
                    isComparing ? 'bg-[#ea580c] text-white' : 'bg-white/90 text-[#737686] hover:bg-white'
                  }`}
                  title={isComparing ? 'Remove from compare' : 'Add to compare'}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isComparing ? 'check' : 'compare_arrows'}
                  </span>
                </button>

                {/* Main Image View */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="aspect-square bg-[#fbf9f1] rounded-2xl mb-3 overflow-hidden cursor-pointer relative group-hover:shadow-inner"
                >
                  <img
                    src={currentImg}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* STEM Rating Pill on top of image */}
                  {product.stemValue && (
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="material-symbols-filled text-xs text-[#ffe16d]">psychology</span>
                      STEM {product.stemValue}/10
                    </span>
                  )}
                </div>

                {/* Image Thumbnails Dots/Previews */}
                {gallery.length > 1 && (
                  <div className="flex gap-1.5 justify-center mb-3">
                    {gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => handleImageSelect(e, product.id, idx)}
                        className={`w-3 h-3 rounded-full transition-all border ${
                          activeIdx === idx
                            ? 'bg-[#ea580c] border-[#ea580c] scale-110'
                            : 'bg-slate-200 border-slate-300 hover:bg-slate-300'
                        }`}
                        title={`Picture ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Info */}
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="cursor-pointer flex-1 flex flex-col"
                >
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1 font-extrabold">
                    <span className="material-symbols-filled text-sm">star</span>
                    <span>{product.rating}</span>
                    <span className="text-[#737686] text-[10px] font-normal">({product.reviewCount})</span>
                  </div>

                  <h4 className="font-extrabold text-base text-[#1b1c17] mb-1 line-clamp-2 leading-snug group-hover:text-[#ea580c] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[#737686] text-xs mb-3 font-medium">
                    {product.ageRange} • {product.brand}
                  </p>
                </div>

                {/* Price & Add to Cart */}
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-[#f0eee6]">
                  <div>
                    <span className="text-[10px] text-[#737686] block leading-none">Price</span>
                    <span className="font-extrabold text-xl text-[#ea580c]">
                      {formatPrice(product.priceINR, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 bg-[#ffe16d] hover:bg-[#e9c400] text-[#221b00] rounded-full font-black text-xs flex items-center gap-1.5 shadow-xs hover-bounce active:scale-95 transition-all cursor-pointer"
                    title="Add to Cart"
                  >
                    <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

