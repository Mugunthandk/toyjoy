import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface PhotoGallerySectionProps {
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

interface GalleryMoments {
  id: string;
  title: string;
  childAge: string;
  customerName: string;
  location: string;
  quote: string;
  photoUrl: string;
  productId: string;
  likesCount: number;
  tag: string;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  products,
  currency,
  onSelectProduct,
  onAddToCart
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryMoments | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const galleryMoments: GalleryMoments[] = [
    {
      id: 'photo-1',
      title: 'Building Rainbow Towers at Sunrise',
      childAge: 'Age 3',
      customerName: 'Meera & Aarav K.',
      location: 'Bengaluru',
      quote: 'Aarav spends hours organizing these arches! The wooden quality is unmatched and paints are non-toxic.',
      photoUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1000',
      productId: 'toy-101',
      likesCount: 342,
      tag: 'Wooden Classic'
    },
    {
      id: 'photo-2',
      title: 'Testing the Solar Rover in the Backyard',
      childAge: 'Age 9',
      customerName: 'David & Leo S.',
      location: 'Mumbai',
      quote: 'Leo built the solar rover all by himself! Seeing it move under natural sunlight was pure joy.',
      photoUrl: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=1000',
      productId: 'toy-102',
      likesCount: 512,
      tag: 'STEM Solar'
    },
    {
      id: 'photo-[#photo-3]',
      title: 'Bedtime Snuggles with Giant Huggy Bear',
      childAge: 'Age 4',
      customerName: 'Priya & Riya R.',
      location: 'Delhi',
      quote: 'Riya will not go to sleep without Huggy Bear! So velvety soft and zero shedding.',
      photoUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=1000',
      productId: 'toy-103',
      likesCount: 429,
      tag: 'Plush Friend'
    },
    {
      id: 'photo-4',
      title: 'Building a 3D Translucent Magnetic Kingdom',
      childAge: 'Age 6',
      customerName: 'Samantha & Noah M.',
      location: 'Hyderabad',
      quote: 'The magnets are super strong! The translucent colors shine like stained glass near the window.',
      photoUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=1000',
      productId: 'toy-104',
      likesCount: 680,
      tag: 'Magnetic STEM'
    },
    {
      id: 'photo-5',
      title: 'Little Chef Cooking Evening Feast',
      childAge: 'Age 5',
      customerName: 'Ananya & Kabir T.',
      location: 'Chennai',
      quote: 'The sizzling stove sound effects are adorable. Solid wood that stands up to energetic toddlers.',
      photoUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=1000',
      productId: 'toy-106',
      likesCount: 289,
      tag: 'Pretend Play'
    },
    {
      id: 'photo-6',
      title: 'Screen-Free Bee Robot Coding Challenge',
      childAge: 'Age 7',
      customerName: 'Sanjay & Ishaan K.',
      location: 'Pune',
      quote: 'Great introduction to algorithms! Ishaan loves creating obstacle courses across the living room.',
      photoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
      productId: 'toy-107',
      likesCount: 395,
      tag: 'Screen-Free Logic'
    }
  ];

  const handleToggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-[#fbf9f1] border-t border-[#e4e3db] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffe16d] text-[#544600] rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <span className="material-symbols-filled text-sm">photo_camera</span>
              Play in Action
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1b1c17] tracking-tight">
              #ToyJoyMoments Photo Showcase
            </h2>
            <p className="text-[#434655] mt-2 text-base max-w-xl font-medium">
              Real smiles, real learning, and real play from verified families across the globe.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#c3c6d7] shadow-xs">
            <span className="material-symbols-filled text-[#e11d48] text-xl">favorite</span>
            <div>
              <span className="font-extrabold text-sm text-[#1b1c17] block leading-none">12,400+ Photos Tagged</span>
              <span className="text-[11px] text-[#737686]">Tag @ToyJoyApp on Instagram to get featured!</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid (Bento style layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryMoments.map((item) => {
            const linkedProduct = products.find((p) => p.id === item.productId);
            const isLiked = likedPhotos[item.id];
            const displayLikes = item.likesCount + (isLiked ? 1 : 0);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#c3c6d7] shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col relative"
              >
                {/* Photo Header Pill */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleToggleLike(e, item.id)}
                  className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md ${
                    isLiked
                      ? 'bg-[#e11d48] text-white'
                      : 'bg-white/85 text-[#434655] hover:bg-white'
                  }`}
                  title={isLiked ? 'Liked' : 'Like Photo'}
                >
                  <span className="material-symbols-filled text-lg">
                    {isLiked ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Main Image View */}
                <div className="aspect-[4/3] bg-[#f0eee6] relative overflow-hidden">
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Title overlay on bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-extrabold text-base leading-snug drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">account_circle</span>
                      {item.customerName} • {item.childAge} ({item.location})
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Customer Review snippet + Linked Product CTA */}
                <div className="p-4 bg-white flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-[#434655] italic leading-relaxed line-clamp-2">
                    "{item.quote}"
                  </p>

                  {/* Linked Product Bar */}
                  {linkedProduct && (
                    <div className="pt-2 border-t border-[#f0eee6] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={linkedProduct.imageUrl}
                          alt={linkedProduct.name}
                          className="w-10 h-10 object-cover rounded-xl border border-[#c3c6d7] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-extrabold text-[#737686] block">
                            Featured Toy
                          </span>
                          <h4 className="font-bold text-xs text-[#1b1c17] truncate">
                            {linkedProduct.name}
                          </h4>
                          <span className="font-extrabold text-xs text-[#ea580c]">
                            {formatPrice(linkedProduct.priceINR, currency)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(linkedProduct);
                        }}
                        className="px-3 py-1.5 bg-[#ffe16d] hover:bg-[#e9c400] text-[#221b00] font-black text-xs rounded-xl shadow-xs shrink-0 hover-bounce"
                      >
                        Buy Toy 🛍️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#fbf9f1] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#c3c6d7] max-h-[90vh] flex flex-col animate-fadeIn">
            <div className="p-4 bg-white border-b border-[#e4e3db] flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#ea580c] text-white text-xs font-black rounded-full">
                  #ToyJoyMoments
                </span>
                <span className="text-xs font-extrabold text-[#1b1c17]">
                  {selectedPhoto.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-[#f0eee6] hover:bg-[#e4e3db] flex items-center justify-center text-[#1b1c17]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="aspect-[16/10] bg-black rounded-2xl overflow-hidden relative shadow-lg">
                <img
                  src={selectedPhoto.photoUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1b1c17]">{selectedPhoto.title}</h3>
                    <p className="text-xs text-[#737686] mt-0.5">
                      Shared by <strong>{selectedPhoto.customerName}</strong> from {selectedPhoto.location} for {selectedPhoto.childAge}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleToggleLike(e, selectedPhoto.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e11d48]/10 text-[#e11d48] rounded-full text-xs font-black"
                  >
                    <span className="material-symbols-filled text-base">favorite</span>
                    <span>{selectedPhoto.likesCount + (likedPhotos[selectedPhoto.id] ? 1 : 0)} Likes</span>
                  </button>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7] text-sm text-[#434655] italic">
                  "{selectedPhoto.quote}"
                </div>

                {/* Linked Product Purchase Bar */}
                {(() => {
                  const p = products.find((prod) => prod.id === selectedPhoto.productId);
                  if (!p) return null;

                  return (
                    <div className="bg-[#ffedd5] p-4 rounded-2xl border border-[#ea580c]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-xl border border-white shadow-xs shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="text-[10px] font-black text-[#ea580c] uppercase tracking-wider block">
                            Featured Toy in Photo
                          </span>
                          <h4 className="font-extrabold text-sm text-[#1b1c17]">{p.name}</h4>
                          <span className="text-xs text-[#434655]">
                            {p.ageRange} • {p.brand}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="text-lg font-black text-[#ea580c]">
                          {formatPrice(p.priceINR, currency)}
                        </span>
                        <button
                          onClick={() => {
                            onAddToCart(p);
                            setSelectedPhoto(null);
                          }}
                          className="flex-1 sm:flex-none px-5 py-2.5 bg-[#ea580c] hover:bg-[#c8452a] text-white font-extrabold text-xs rounded-xl shadow-md transition-all hover-bounce"
                        >
                          Add Toy to Cart 🛍️
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
