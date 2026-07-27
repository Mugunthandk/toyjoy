import React, { useState } from 'react';

interface CategorySectionProps {
  onSelectCategory: (category: string) => void;
  onSelectAgeGroup?: (age: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onSelectAgeGroup
}) => {
  const [viewMode, setViewMode] = useState<'categories' | 'ages'>('categories');

  const categories = [
    {
      title: 'Wooden Toys',
      tagline: 'Eco-friendly Montessori',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
      badge: '100% Organic',
      badgeBg: 'bg-emerald-600',
      itemCount: '18 Toys'
    },
    {
      title: 'STEM Kits',
      tagline: 'Robotics & Solar Power',
      image: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=800',
      badge: 'Top Rated',
      badgeBg: 'bg-[#ea580c]',
      itemCount: '24 Kits'
    },
    {
      title: 'Plush Friends',
      tagline: 'Ultra-Soft & Hypoallergenic',
      image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=800',
      badge: 'Best Seller',
      badgeBg: 'bg-[#e11d48]',
      itemCount: '15 Bears'
    },
    {
      title: 'Electronic Toys',
      tagline: 'RC Dinosaurs & Gesture Bots',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=800',
      badge: 'New Tech',
      badgeBg: 'bg-purple-600',
      itemCount: '12 Items'
    },
    {
      title: 'Pretend Play',
      tagline: 'Play Kitchens & Doctor Sets',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
      badge: 'Imaginative',
      badgeBg: 'bg-amber-600',
      itemCount: '16 Sets'
    },
    {
      title: 'Building Blocks',
      tagline: '3D Magnetic Tiles & Towers',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
      badge: 'Popular',
      badgeBg: 'bg-sky-600',
      itemCount: '20 Packs'
    }
  ];

  const ageGroups = [
    {
      val: 'All',
      title: 'All Ages & Family Fun',
      ageLabel: '0+ Years to Adults',
      tagline: 'Universal brainteasers, plush, board games & family activities',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
      badge: '★ For Everyone',
      badgeBg: 'bg-[#ea580c]'
    },
    {
      val: '0-2',
      title: 'Infants & Toddlers',
      ageLabel: '0 – 2 Years',
      tagline: 'Sensory rattles, soft plush, wooden stackers & teethers',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
      badge: 'Baby Safe',
      badgeBg: 'bg-emerald-600'
    },
    {
      val: '3-5',
      title: 'Preschool Explorers',
      ageLabel: '3 – 5 Years',
      tagline: 'Montessori puzzles, play kitchens, magnetic tiles & art',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
      badge: 'Montessori',
      badgeBg: 'bg-amber-600'
    },
    {
      val: '6-8',
      title: 'Early Elementary',
      ageLabel: '6 – 8 Years',
      tagline: 'Solar bots, RC dinosaurs, starter microscopes & science',
      image: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=800',
      badge: 'STEM & Tech',
      badgeBg: 'bg-sky-600'
    },
    {
      val: '9+',
      title: 'Tweens & Innovators',
      ageLabel: '9+ Years',
      tagline: 'Advanced robotics, 3D building, coding & challenge sets',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
      badge: 'Advanced',
      badgeBg: 'bg-purple-600'
    }
  ];

  const handleAgeClick = (val: string) => {
    if (onSelectAgeGroup) {
      onSelectAgeGroup(val);
    } else {
      onSelectCategory('All');
    }
  };

  return (
    <section id="categories-section" className="py-20 relative overflow-hidden bg-[#fbf9f1]">
      {/* Soft Coral Ambient Background Glow */}
      <div className="blob-bg bg-[#ea580c]/10 w-96 h-96 -left-32 top-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12 space-y-3">
          <span className="px-3.5 py-1 bg-[#ffe16d] text-[#544600] font-black text-xs uppercase tracking-wider rounded-full inline-block">
            EXPLORE THE COLLECTION 🎉
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1b1c17] tracking-tight">
            Find the Perfect Toy
          </h2>
          <p className="text-[#434655] text-base max-w-xl mx-auto font-medium">
            Browse by toy category or explore age-tailored collections designed for developmental milestones.
          </p>

          {/* View Mode Selector Tabs */}
          <div className="inline-flex items-center bg-[#e4e3db] p-1.5 rounded-full mt-4 border border-[#c3c6d7]">
            <button
              onClick={() => setViewMode('categories')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                viewMode === 'categories'
                  ? 'bg-[#ea580c] text-white shadow-xs'
                  : 'text-[#434655] hover:text-[#1b1c17]'
              }`}
            >
              Shop by Category
            </button>
            <button
              onClick={() => setViewMode('ages')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'ages'
                  ? 'bg-[#ea580c] text-white shadow-xs'
                  : 'text-[#434655] hover:text-[#1b1c17]'
              }`}
            >
              <span>Shop by Age Group</span>
              <span className="px-1.5 py-0.2 bg-[#ffe16d] text-[#221b00] rounded-full text-[10px] font-extrabold">
                All Ages
              </span>
            </button>
          </div>
        </div>

        {viewMode === 'categories' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.title}
                onClick={() => onSelectCategory(cat.title)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#c3c6d7] shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col relative"
              >
                {/* Image Box */}
                <div className="aspect-[16/10] bg-[#f0eee6] relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Badge */}
                  <span className={`absolute top-4 left-4 ${cat.badgeBg} text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md`}>
                    {cat.badge}
                  </span>

                  {/* Item Count */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-[#1b1c17] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {cat.itemCount}
                  </span>

                  {/* Category Name overlay */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="font-black text-2xl tracking-tight leading-tight group-hover:text-[#ffe16d] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5 font-medium">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA bar */}
                <div className="p-4 bg-white flex justify-between items-center text-xs font-extrabold text-[#ea580c] group-hover:bg-[#ffedd5] transition-colors">
                  <span>Explore {cat.title}</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ageGroups.map((age) => (
              <div
                key={age.val}
                onClick={() => handleAgeClick(age.val)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#c3c6d7] shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col relative"
              >
                {/* Image Box */}
                <div className="aspect-[16/10] bg-[#f0eee6] relative overflow-hidden">
                  <img
                    src={age.image}
                    alt={age.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                  {/* Badge */}
                  <span className={`absolute top-4 left-4 ${age.badgeBg} text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md`}>
                    {age.badge}
                  </span>

                  {/* Age Range Tag */}
                  <span className="absolute top-4 right-4 bg-white text-[#1b1c17] text-[11px] font-black px-3 py-1 rounded-full shadow-xs">
                    {age.ageLabel}
                  </span>

                  {/* Age Category Name overlay */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="font-black text-2xl tracking-tight leading-tight group-hover:text-[#ffe16d] transition-colors">
                      {age.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5 font-medium">
                      {age.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA bar */}
                <div className="p-4 bg-white flex justify-between items-center text-xs font-extrabold text-[#ea580c] group-hover:bg-[#ffedd5] transition-colors">
                  <span>View Toys for {age.ageLabel}</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

