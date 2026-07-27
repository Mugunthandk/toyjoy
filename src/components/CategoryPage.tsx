import React, { useState, useMemo } from 'react';
import { Product, Currency } from '../types';

interface CategoryPageProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  currency: Currency;
  onBackToHome: () => void;
  selectedAgeGroup?: string;
  onSelectAgeGroup?: (age: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  selectedCategory,
  onSelectCategory,
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  currency,
  onBackToHome,
  selectedAgeGroup: externalAgeGroup = 'All',
  onSelectAgeGroup
}) => {
  const [selectedSubCat, setSelectedSubCat] = useState<string>('All');
  const [selectedAgeGroupInternal, setSelectedAgeGroupInternal] = useState<string>(externalAgeGroup);

  const selectedAgeGroup = externalAgeGroup !== 'All' ? externalAgeGroup : selectedAgeGroupInternal;

  const handleAgeChange = (val: string) => {
    setSelectedAgeGroupInternal(val);
    if (onSelectAgeGroup) {
      onSelectAgeGroup(val);
    }
  };
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  const categories = [
    { name: 'Wooden Toys', icon: 'forest', desc: 'Sustainably crafted Montessori wooden toys for tactile learning.' },
    { name: 'STEM Kits', icon: 'science', desc: 'Interactive science, solar robotics, magnetic tiles, and coding kits.' },
    { name: 'Plush Friends', icon: 'pets', desc: 'Ultra-soft, washable, hypoallergenic teddy bears and soothers.' },
    { name: 'Electronic Toys', icon: 'smart_toy', desc: 'Robotic dinosaurs, gesture-controlled toys, and smart devices.' },
    { name: 'Pretend Play', icon: 'kitchen', desc: 'Imaginative kitchens, doctor sets, and career playsets.' },
  ];

  const currentCategoryInfo = categories.find(
    (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
  ) || {
    name: selectedCategory || 'All Toys',
    icon: 'toys',
    desc: 'Explore our full collection of safe, educational, and fun toys.'
  };

  // Extract subcategories available for this category
  const subCategories = useMemo(() => {
    const categoryProducts = selectedCategory === 'All' 
      ? products 
      : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    
    const subs = Array.from(
      new Set(categoryProducts.map(p => p.subCategory).filter(Boolean))
    ) as string[];
    
    return ['All', ...subs];
  }, [products, selectedCategory]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Subcategory filter
      if (selectedSubCat !== 'All' && p.subCategory !== selectedSubCat) {
        return false;
      }
      // Age group filter
      if (selectedAgeGroup === '0-2') return p.minAge <= 2;
      if (selectedAgeGroup === '3-5') return p.minAge <= 5 && p.maxAge >= 3;
      if (selectedAgeGroup === '6-8') return p.minAge <= 8 && p.maxAge >= 6;
      if (selectedAgeGroup === '9+') return p.maxAge >= 9;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [products, selectedCategory, selectedSubCat, selectedAgeGroup, sortBy]);

  const formatPrice = (priceINR: number) => {
    if (currency === 'INR') return `₹${priceINR.toLocaleString('en-IN')}`;
    if (currency === 'USD') return `$${(priceINR / 83).toFixed(2)}`;
    if (currency === 'EUR') return `€${(priceINR / 90).toFixed(2)}`;
    return `₹${priceINR}`;
  };

  const handleThumbnailClick = (e: React.MouseEvent, productId: string, index: number) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({ ...prev, [productId]: index }));
  };

  return (
    <div className="min-h-screen bg-[#fbf9f1] pb-24">
      {/* Top Breadcrumb & Navigation Banner */}
      <div className="bg-[#f5f4ec] border-b border-[#e4e3db] py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#434655]">
            <button
              onClick={onBackToHome}
              className="hover:text-[#2d6a4f] flex items-center gap-1 font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-base">home</span>
              Home
            </button>
            <span>/</span>
            <span className="font-bold text-[#1b1c17]">{currentCategoryInfo.name}</span>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#c3c6d7] rounded-full text-xs font-bold text-[#1b1c17] hover:bg-[#f0eee6] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Overview
          </button>
        </div>
      </div>

      {/* Category Hero Header */}
      <div className="bg-gradient-to-r from-[#2d6a4f] to-[#40916c] text-white py-12 px-6 md:px-12 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-3 uppercase tracking-wider text-amber-200">
              <span className="material-symbols-filled text-base">{currentCategoryInfo.icon}</span>
              Featured Category Collection
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
              {currentCategoryInfo.name}
            </h1>
            <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed">
              {currentCategoryInfo.desc}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium">
              <span className="px-3 py-1.5 bg-white/10 rounded-lg flex items-center gap-1.5">
                <span className="material-symbols-filled text-amber-300">verified</span>
                100% Non-Toxic & Safety Certified
              </span>
              <span className="px-3 py-1.5 bg-white/10 rounded-lg flex items-center gap-1.5">
                <span className="material-symbols-filled text-amber-300">photo_library</span>
                Multi-Angle High Res Gallery Pictures
              </span>
              <span className="px-3 py-1.5 bg-white/10 rounded-lg flex items-center gap-1.5">
                <span className="material-symbols-filled text-amber-300">inventory_2</span>
                {filteredProducts.length} Items Available
              </span>
            </div>
          </div>

          {/* Quick Category Switcher Pills */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-full md:w-auto">
            <p className="text-xs font-bold text-amber-200 uppercase tracking-wider mb-3">Switch Category</p>
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    onSelectCategory(cat.name);
                    setSelectedSubCat('All');
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-white text-[#2d6a4f] shadow-md scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <span className="material-symbols-filled text-lg">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        {/* Subcategories & Filters Row */}
        <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-xs border border-[#e4e3db] mb-8">
          {/* Subcategory Pills */}
          {subCategories.length > 1 && (
            <div>
              <label className="text-xs font-extrabold text-[#434655] uppercase tracking-wider block mb-2">
                Subcategories in {currentCategoryInfo.name}:
              </label>
              <div className="flex flex-wrap gap-2">
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubCat(sub)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedSubCat === sub
                        ? 'bg-[#2d6a4f] text-white shadow-sm'
                        : 'bg-[#f0eee6] text-[#434655] hover:bg-[#e4e3db]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Age Filters & Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#f0eee6]">
            {/* Age Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#434655] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-base">child_care</span>
                Age Group:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'All Ages', val: 'All' },
                  { label: '0–2 Yrs', val: '0-2' },
                  { label: '3–5 Yrs', val: '3-5' },
                  { label: '6–8 Yrs', val: '6-8' },
                  { label: '9+ Yrs', val: '9+' },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => handleAgeChange(item.val)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      selectedAgeGroup === item.val
                        ? 'bg-[#ffe16d] text-[#221b00] font-bold'
                        : 'bg-[#f5f4ec] text-[#434655] hover:bg-[#e4e3db]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#434655] uppercase tracking-wider">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#f5f4ec] border border-[#c3c6d7] text-xs font-bold text-[#1b1c17] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#e4e3db] p-8">
            <span className="material-symbols-outlined text-6xl text-[#737686] mb-4">search_off</span>
            <h3 className="text-xl font-bold text-[#1b1c17]">No products found in this filter</h3>
            <p className="text-sm text-[#434655] mt-1">Try resetting your subcategory or age filter options.</p>
            <button
              onClick={() => {
                setSelectedSubCat('All');
                handleAgeChange('All');
              }}
              className="mt-6 px-6 py-2.5 bg-[#2d6a4f] text-white font-bold rounded-full text-sm hover:bg-[#1f4e38] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const gallery = product.galleryImages && product.galleryImages.length > 0 
                ? product.galleryImages 
                : [product.imageUrl];
              const activeIdx = activeImageIndexes[product.id] ?? 0;
              const currentDisplayImg = gallery[activeIdx] || product.imageUrl;
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white rounded-3xl border border-[#e4e3db] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-square bg-[#f5f4ec] overflow-hidden">
                      <img
                        src={currentDisplayImg}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        {product.isBestSeller && (
                          <span className="px-2.5 py-1 bg-[#ffe16d] text-[#221b00] rounded-full text-[10px] font-extrabold uppercase shadow-xs">
                            ⭐ Best Seller
                          </span>
                        )}
                        {product.isNew && (
                          <span className="px-2.5 py-1 bg-[#2d6a4f] text-white rounded-full text-[10px] font-extrabold uppercase shadow-xs">
                            🔥 New
                          </span>
                        )}
                        {product.stemValue >= 8 && (
                          <span className="px-2.5 py-1 bg-[#10b981] text-white rounded-full text-[10px] font-extrabold uppercase shadow-xs">
                            🧠 STEM {product.stemValue}/10
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                          isWishlisted
                            ? 'bg-[#aa3000] text-white'
                            : 'bg-white/80 text-[#434655] hover:bg-white'
                        }`}
                      >
                        <span className="material-symbols-filled text-lg">
                          {isWishlisted ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>

                      {/* Gallery Picture Thumbnails Switcher (on-card picture preview) */}
                      {gallery.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md rounded-full z-10">
                          {gallery.map((imgUrl, i) => (
                            <button
                              key={i}
                              onClick={(e) => handleThumbnailClick(e, product.id, i)}
                              className={`w-6 h-6 rounded-full overflow-hidden border transition-all ${
                                activeIdx === i
                                  ? 'border-amber-300 scale-110 ring-2 ring-amber-300'
                                  : 'border-white/50 opacity-70 hover:opacity-100'
                              }`}
                              title={`View Image ${i + 1}`}
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-[#737686] mb-1">
                        <span className="font-bold text-[#2d6a4f]">{product.brand}</span>
                        <span className="px-2 py-0.5 bg-[#f0eee6] rounded-md font-medium">{product.ageRange}</span>
                      </div>

                      <h3 className="font-extrabold text-base text-[#1b1c17] line-clamp-2 group-hover:text-[#2d6a4f] transition-colors mb-2">
                        {product.name}
                      </h3>

                      {/* Rating & Safety Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                          <span className="material-symbols-filled text-base">star</span>
                          {product.rating}
                        </div>
                        <span className="text-xs text-[#737686]">({product.reviewCount} reviews)</span>
                        {product.safetyCertified && (
                          <span className="ml-auto text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                            🛡️ Certified
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#434655] line-clamp-2 mb-4">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom / Price & Cart */}
                  <div className="p-5 pt-0 border-t border-[#f0eee6] mt-auto">
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-xs text-[#737686] block">Price</span>
                        <span className="text-lg font-black text-[#2d6a4f]">
                          {formatPrice(product.priceINR)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#ffe16d] text-[#221b00] rounded-full text-xs font-bold hover:bg-[#e9c400] active:scale-95 transition-all shadow-xs"
                      >
                        <span className="material-symbols-filled text-base">shopping_cart</span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
