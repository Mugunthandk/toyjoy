import React, { useState } from 'react';
import { Product, Currency, Review, UserProfile } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: Currency;
  onAddToCart: (p: Product) => void;
  onOpenReviewSummary: (p: Product) => void;
  reviews: Review[];
  currentUser?: UserProfile | null;
  onAddReview?: (review: Review) => void;
  onOpenAuth?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
  onOpenReviewSummary,
  reviews,
  currentUser,
  onAddReview,
  onOpenAuth
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Review Form State
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!product) return null;

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const gallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.imageUrl];
  
  const currentImg = gallery[selectedImgIndex] || product.imageUrl;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!commentText.trim()) {
      setFormError('Please write a short review comment before submitting.');
      return;
    }
    if (!currentUser) {
      setFormError('You must be logged in to post a review.');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatarUrl,
      rating: userRating,
      date: new Date().toISOString().split('T')[0],
      comment: commentText.trim(),
      verifiedPurchase: true
    };

    if (onAddReview) {
      onAddReview(newRev);
    }

    setSubmitSuccess(true);
    setCommentText('');
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 5: return '5/5 - Outstanding! Highly Recommended';
      case 4: return '4/5 - Very Good Toy';
      case 3: return '3/5 - Average Play Value';
      case 2: return '2/5 - Needs Improvement';
      case 1: return '1/5 - Poor Quality';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f1] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#c3c6d7] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b border-[#e4e3db] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider">
              {product.category} • {product.brand}
            </span>
            {product.subCategory && (
              <span className="text-xs font-semibold px-2 py-0.5 bg-[#f0eee6] rounded-md text-[#434655]">
                {product.subCategory}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0eee6] hover:bg-[#e4e3db] flex items-center justify-center text-[#1b1c17] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Image Box */}
            <div className="space-y-3">
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-[#c3c6d7] shadow-sm group">
                <img
                  src={currentImg}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Arrow navigation if multiple pictures */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImgIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
                      title="Previous Picture"
                    >
                      <span className="material-symbols-outlined text-base">chevron_left</span>
                    </button>
                    <button
                      onClick={() => setSelectedImgIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
                      title="Next Picture"
                    >
                      <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 text-white text-[10px] font-bold rounded-full backdrop-blur-xs">
                      Picture {selectedImgIndex + 1} of {gallery.length}
                    </span>
                  </>
                )}
              </div>

              {/* Picture Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div>
                  <p className="text-[10px] font-extrabold text-[#737686] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-filled text-xs text-[#2d6a4f]">photo_library</span>
                    Product Pictures Gallery ({gallery.length} photos):
                  </p>
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImgIndex(idx)}
                        className={`w-16 h-16 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          selectedImgIndex === idx
                            ? 'border-[#2d6a4f] ring-2 ring-[#2d6a4f]/30 scale-105 shadow-md'
                            : 'border-[#c3c6d7] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#1b1c17] leading-tight">{product.name}</h2>
              
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold text-sm">★ {product.rating}</span>
                <span className="text-xs text-[#737686]">({product.reviewCount} reviews)</span>
                <button
                  onClick={() => onOpenReviewSummary(product)}
                  className="ml-auto text-xs font-bold text-[#2d6a4f] underline hover:text-[#40916c] cursor-pointer"
                >
                  AI Review Summary 🤖
                </button>
              </div>

              <div className="text-3xl font-extrabold text-[#2d6a4f]">
                {formatPrice(product.priceINR, currency)}
              </div>

              <p className="text-sm text-[#434655] leading-relaxed">{product.description}</p>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="bg-white p-3 rounded-2xl border border-[#e4e3db]">
                  <p className="text-xs font-bold text-[#1b1c17] mb-2">Key Highlights:</p>
                  <ul className="grid grid-cols-2 gap-1.5 text-xs text-[#434655]">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="material-symbols-filled text-xs text-emerald-600">check_circle</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#737686]">Age Suitability:</span>
                  <strong className="text-[#1b1c17]">{product.ageRange}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737686]">STEM Development Score:</span>
                  <strong className="text-[#2d6a4f]">{product.stemValue} / 10 ⭐</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737686]">Material & Safety:</span>
                  <strong className="text-emerald-700">{product.materials} (Certified Non-Toxic)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737686]">Warranty:</span>
                  <strong className="text-[#1b1c17]">{product.warranty}</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-4 bg-[#ffe16d] hover:bg-[#e9c400] text-[#221b00] font-extrabold rounded-2xl shadow-md transition-all hover-bounce cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-filled text-xl">shopping_cart</span>
                Add to Cart ({formatPrice(product.priceINR, currency)})
              </button>
            </div>
          </div>

          {/* Barcode & QR Code Card */}
          <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7] flex flex-wrap justify-between items-center gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#737686] uppercase">In-Store Barcode & QR Scan Code</span>
              <p className="font-mono text-xs font-bold text-[#1b1c17]">{product.barcode}</p>
            </div>
            <div className="w-12 h-12 bg-[#1b1c17] text-white flex items-center justify-center font-bold text-xs rounded-xl">
              QR
            </div>
          </div>

          {/* CUSTOMER REVIEWS & WRITE A REVIEW SECTION */}
          <div className="pt-6 border-t border-[#e4e3db] space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="text-xl font-extrabold text-[#1b1c17] flex items-center gap-2">
                  <span>Customer Reviews & Ratings</span>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-black rounded-full border border-amber-200">
                    ★ {product.rating} / 5.0
                  </span>
                </h3>
                <p className="text-xs text-[#737686] mt-0.5">
                  Verified feedback from parents, educators, and toy lovers.
                </p>
              </div>

              <button
                onClick={() => onOpenReviewSummary(product)}
                className="px-3.5 py-1.5 bg-[#f0eee6] hover:bg-[#e4e3db] text-[#2d6a4f] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Summarize with AI</span>
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
              </button>
            </div>

            {/* WRITE A REVIEW SUBMISSION FORM */}
            <div className="bg-white p-5 rounded-3xl border border-[#e4e3db] shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-[#f0eee6] pb-3">
                <h4 className="font-extrabold text-sm text-[#1b1c17] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ea580c]">rate_review</span>
                  Write a Product Review
                </h4>
                {currentUser && (
                  <div className="flex items-center gap-2 text-xs text-[#737686]">
                    <span>Posting as:</span>
                    <strong className="text-[#ea580c] font-black">{currentUser.name}</strong>
                  </div>
                )}
              </div>

              {currentUser ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Star Rating Input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#1b1c17]">Your Rating:</label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setUserRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                          >
                            <span
                              className={
                                star <= (hoverRating || userRating)
                                  ? 'text-amber-400 fill-current'
                                  : 'text-slate-300'
                              }
                            >
                              ★
                            </span>
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-[#ea580c]">
                        {getRatingLabel(hoverRating || userRating)}
                      </span>
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#1b1c17]">
                      Your Review Comment:
                    </label>
                    <textarea
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share what you or your child liked most about this toy, durability, assembly, educational value..."
                      className="w-full p-3 bg-[#fbf9f1] border border-[#e4e3db] rounded-2xl text-xs font-medium text-[#1b1c17] focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {formError}
                    </div>
                  )}

                  {submitSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black rounded-xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                      🎉 Thank you! Your review has been posted successfully.
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#ea580c] hover:bg-[#c8452a] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                      Post Review
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-[#fff7ed] rounded-2xl border border-orange-200 flex flex-wrap justify-between items-center gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-extrabold text-[#1b1c17]">
                      Want to share your rating and experience?
                    </p>
                    <p className="text-xs text-[#737686]">
                      Please log in or create a free ToyJoy account to post verified toy reviews.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (onOpenAuth) onOpenAuth();
                    }}
                    className="px-4 py-2 bg-[#ea580c] text-white text-xs font-black rounded-xl hover:bg-[#c8452a] shadow-xs cursor-pointer"
                  >
                    Log In / Sign Up to Review
                  </button>
                </div>
              )}
            </div>

            {/* REVIEWS LIST */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-[#1b1c17]">
                User Reviews ({productReviews.length})
              </h4>

              {productReviews.length > 0 ? (
                <div className="space-y-3">
                  {productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white p-4 rounded-2xl border border-[#e4e3db] space-y-2 shadow-2xs"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          {rev.userAvatar ? (
                            <img
                              src={rev.userAvatar}
                              alt={rev.userName}
                              className="w-8 h-8 rounded-full object-cover border border-[#ea580c]"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-orange-100 text-[#ea580c] font-black text-xs flex items-center justify-center border border-[#ea580c]/30">
                              {rev.userName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="font-extrabold text-xs text-[#1b1c17]">{rev.userName}</h5>
                              {rev.verifiedPurchase && (
                                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md border border-emerald-200">
                                  ✓ Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#737686]">{rev.date}</span>
                          </div>
                        </div>

                        <div className="text-amber-500 text-xs font-bold">
                          {'★'.repeat(rev.rating)}
                          <span className="text-slate-300">{'★'.repeat(5 - rev.rating)}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#434655] leading-relaxed pl-1">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-[#e4e3db] text-center space-y-2">
                  <p className="text-xs text-[#737686]">
                    No reviews written yet for this toy. Be the first parent or customer to leave a review above!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


