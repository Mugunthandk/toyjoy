import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQty: (id: string, qty: number) => void;
  onToggleGiftWrap: (id: string) => void;
  onClearCart: () => void;
  onOpenCheckout: (subtotalINR: number, discountAmountINR: number, finalTotalINR: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQty,
  onToggleGiftWrap,
  onClearCart,
  onOpenCheckout
}) => {
  const [coupon, setCoupon] = useState('');
  const [appliedDiscountPct, setAppliedDiscountPct] = useState(0);

  if (!isOpen) return null;

  const subtotalINR = items.reduce(
    (acc, curr) => acc + curr.product.priceINR * curr.quantity + (curr.selectedGiftWrap ? 49 * curr.quantity : 0),
    0
  );

  const discountAmountINR = Math.round(subtotalINR * (appliedDiscountPct / 100));
  const finalTotalINR = Math.max(0, subtotalINR - discountAmountINR);

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'JOY15') {
      setAppliedDiscountPct(15);
    } else {
      alert('Invalid coupon. Try coupon code: JOY15 for 15% off!');
    }
  };

  const handleCheckout = () => {
    onClose();
    onOpenCheckout(subtotalINR, discountAmountINR, finalTotalINR);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#fbf9f1] w-full max-w-md h-full shadow-2xl flex flex-col overflow-hidden animate-slide-left border-l border-[#c3c6d7]">
        {/* Header */}
        <div className="p-5 bg-[#2d6a4f] text-white flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            Your ToyJoy Shopping Cart ({items.reduce((a, c) => a + c.quantity, 0)})
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {items.length === 0 ? (
                <div className="py-20 text-center text-[#737686] space-y-3">
                  <span className="material-symbols-outlined text-6xl text-[#c3c6d7]">shopping_bag</span>
                  <p className="font-bold text-base">Your cart is empty!</p>
                  <p className="text-xs">Explore our best sellers or ask JoyBot AI for recommendations!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white p-4 rounded-2xl border border-[#c3c6d7] shadow-xs space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h5 className="font-bold text-sm text-[#1b1c17] line-clamp-1">{item.product.name}</h5>
                        <p className="text-xs text-[#2d6a4f] font-bold">
                          {formatPrice(item.product.priceINR, currency)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 bg-[#f0eee6] rounded-md font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 bg-[#f0eee6] rounded-md font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Gift Wrap Addon */}
                    <div className="pt-2 border-t border-[#f0eee6] flex justify-between items-center text-xs">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-[#434655]">
                        <input
                          type="checkbox"
                          checked={item.selectedGiftWrap || false}
                          onChange={() => onToggleGiftWrap(item.product.id)}
                          className="accent-[#2d6a4f]"
                        />
                        🎁 Add Signature Gift Wrap (+₹49)
                      </label>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-5 bg-white border-t border-[#c3c6d7] space-y-4">
                {/* Coupon Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code (JOY15)"
                    className="flex-1 bg-[#f0eee6] rounded-xl px-3 py-2 text-xs uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#aa3000] text-white font-bold text-xs rounded-xl hover:bg-[#d43f00]"
                  >
                    Apply
                  </button>
                </div>

                {appliedDiscountPct > 0 && (
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl flex justify-between">
                    <span>15% Discount Applied!</span>
                    <span>-{formatPrice(discountAmountINR, currency)}</span>
                  </div>
                )}

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#737686]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotalINR, currency)}</span>
                  </div>
                  <div className="flex justify-between text-[#737686]">
                    <span>Express Shipping</span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-base text-[#1b1c17] pt-2 border-t border-[#e4e3db]">
                    <span>Total</span>
                    <span className="text-[#2d6a4f]">{formatPrice(finalTotalINR, currency)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#2d6a4f] hover:bg-[#40916c] text-white font-extrabold text-base rounded-2xl shadow-md transition-all hover-bounce cursor-pointer"
                >
                  Proceed to Checkout ({formatPrice(finalTotalINR, currency)})
                </button>
              </div>
            )}
      </div>
    </div>
  );
};
