import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  subtotalINR: number;
  discountAmountINR: number;
  finalTotalINR: number;
  onOrderSuccess: () => void;
}

type PaymentMethod = 'qr' | 'card' | 'netbanking' | 'cod';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  subtotalINR,
  discountAmountINR,
  finalTotalINR,
  onOrderSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  // Shipping details state
  const [shipping, setShipping] = useState({
    name: 'Ananya Sharma',
    phone: '+91 98765 43210',
    address: 'Flat 402, Sunshine Heights, MG Road',
    city: 'Bengaluru',
    pincode: '560001'
  });

  // Expiration timer for QR Code (5 minutes)
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!isOpen) return;
    // Reset state on open
    setIsSuccess(false);
    setIsProcessing(false);
    setTimeLeft(300);
    setOrderId(`TJ-${Math.floor(100000 + Math.random() * 900000)}`);
    setUtrNumber(`UPI/2026${Math.floor(10000000 + Math.random() * 90000000)}/SUCCESS`);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isSuccess) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isSuccess]);

  if (!isOpen) return null;

  const upiId = 'toyjoy.pay@upi';
  const upiUri = `upi://pay?pa=${upiId}&pn=ToyJoy%20Store&am=${finalTotalINR}&cu=INR&tn=Order%20${orderId}`;

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSimulateQrPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onOrderSuccess();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#fbf9f1] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#c3c6d7] max-h-[92vh] flex flex-col my-auto">
        {/* Top Header */}
        <div className="bg-[#2d6a4f] text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffe16d] text-[#221b00] flex items-center justify-center font-bold shadow-xs">
              <span className="material-symbols-filled text-2xl">qr_code_2</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Secure ToyJoy Checkout</h2>
              <p className="text-xs text-emerald-100 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lock</span> 256-bit Encrypted Payment Gateway
              </p>
            </div>
          </div>
          {!isSuccess && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSuccess ? (
            /* ORDER SUCCESS VIEW */
            <div className="text-center py-8 px-4 max-w-lg mx-auto space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#2d6a4f] flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-filled text-5xl">check_circle</span>
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-100 text-[#1b4332] text-xs font-bold rounded-full uppercase tracking-wider">
                  Payment Received via UPI QR
                </span>
                <h3 className="text-2xl font-extrabold text-[#1b1c17] mt-2">Order Confirmed! 🎉</h3>
                <p className="text-sm text-[#434655] mt-1">
                  Thank you for shopping at ToyJoy. Your items are being gift-wrapped and prepped for dispatch!
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7] text-left space-y-2.5 text-xs shadow-xs">
                <div className="flex justify-between border-b border-[#f0eee6] pb-2">
                  <span className="text-[#737686]">Order ID:</span>
                  <span className="font-bold text-[#1b1c17]">{orderId}</span>
                </div>
                <div className="flex justify-between border-b border-[#f0eee6] pb-2">
                  <span className="text-[#737686]">Payment Reference (UTR):</span>
                  <span className="font-mono text-emerald-700 font-semibold">{utrNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#f0eee6] pb-2">
                  <span className="text-[#737686]">Amount Paid:</span>
                  <span className="font-extrabold text-sm text-[#2d6a4f]">
                    {formatPrice(finalTotalINR, currency)}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#737686]">Est. Delivery:</span>
                  <span className="font-bold text-[#1b1c17]">2 - 3 Business Days 🚚</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 bg-[#2d6a4f] text-white font-extrabold rounded-xl hover:bg-[#1f4e38] transition-colors shadow-md"
                >
                  Continue Shopping 🛍️
                </button>
              </div>
            </div>
          ) : (
            /* MAIN CHECKOUT FORM & PAYMENT OPTIONS */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Shipping & Payment Method (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Delivery Address Section */}
                <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7] shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-[#1b1c17] flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg text-[#2d6a4f]">local_shipping</span>
                      1. Delivery Address
                    </h3>
                    <span className="text-[11px] text-[#2d6a4f] font-bold">Standard Free Shipping</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-[#737686] uppercase">Full Name</label>
                      <input
                        type="text"
                        value={shipping.name}
                        onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                        className="w-full mt-1 p-2 bg-[#f0eee6] rounded-lg border border-[#c3c6d7] font-semibold text-[#1b1c17]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#737686] uppercase">Mobile Number</label>
                      <input
                        type="text"
                        value={shipping.phone}
                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        className="w-full mt-1 p-2 bg-[#f0eee6] rounded-lg border border-[#c3c6d7] font-semibold text-[#1b1c17]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-[#737686] uppercase">Address</label>
                      <input
                        type="text"
                        value={shipping.address}
                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                        className="w-full mt-1 p-2 bg-[#f0eee6] rounded-lg border border-[#c3c6d7] font-semibold text-[#1b1c17]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Options Header & Tabs */}
                <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7] shadow-xs space-y-4">
                  <h3 className="font-extrabold text-sm text-[#1b1c17] flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-[#2d6a4f]">payments</span>
                    2. Select Payment Option
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setPaymentMethod('qr')}
                      className={`p-3 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1.5 transition-all relative ${
                        paymentMethod === 'qr'
                          ? 'border-[#2d6a4f] bg-[#d8f3dc] text-[#1b4332] shadow-sm ring-2 ring-[#2d6a4f]/20'
                          : 'border-[#c3c6d7] bg-[#f0eee6] text-[#434655] hover:bg-[#e4e3db]'
                      }`}
                    >
                      <span className="material-symbols-filled text-xl text-[#2d6a4f]">qr_code_scanner</span>
                      <span>Scan QR / UPI</span>
                      <span className="absolute -top-2 right-1 px-1.5 py-0.5 bg-amber-400 text-[9px] font-black rounded-md text-slate-900 uppercase">
                        Instant
                      </span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#2d6a4f] bg-[#d8f3dc] text-[#1b4332] shadow-sm'
                          : 'border-[#c3c6d7] bg-[#f0eee6] text-[#434655] hover:bg-[#e4e3db]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">credit_card</span>
                      <span>Credit/Debit</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'border-[#2d6a4f] bg-[#d8f3dc] text-[#1b4332] shadow-sm'
                          : 'border-[#c3c6d7] bg-[#f0eee6] text-[#434655] hover:bg-[#e4e3db]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">account_balance</span>
                      <span>Net Banking</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#2d6a4f] bg-[#d8f3dc] text-[#1b4332] shadow-sm'
                          : 'border-[#c3c6d7] bg-[#f0eee6] text-[#434655] hover:bg-[#e4e3db]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">local_atm</span>
                      <span>Cash on Delivery</span>
                    </button>
                  </div>

                  {/* PAYMENT METHOD DETAILED CONTENT */}
                  {paymentMethod === 'qr' && (
                    <div className="pt-2 space-y-4 animate-fadeIn">
                      <div className="bg-[#fbf9f1] border border-[#c3c6d7] p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                        {/* QR Code Container */}
                        <div className="bg-white p-3.5 rounded-2xl border-2 border-[#2d6a4f] shadow-md flex flex-col items-center shrink-0 group relative">
                          <QRCodeSVG
                            value={upiUri}
                            size={160}
                            bgColor="#ffffff"
                            fgColor="#1b4332"
                            level="H"
                            includeMargin={false}
                          />
                          <div className="mt-2 text-[10px] font-black uppercase tracking-wider text-[#2d6a4f] bg-[#d8f3dc] px-2 py-0.5 rounded-full">
                            UPI AUTO-VERIFY
                          </div>
                        </div>

                        {/* QR Details */}
                        <div className="space-y-3 flex-1 text-center md:text-left">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#737686]">
                              Scan with any UPI App
                            </span>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-1">
                              <span className="px-2 py-0.5 bg-white border border-[#c3c6d7] rounded text-[11px] font-black text-blue-600">
                                GPay
                              </span>
                              <span className="px-2 py-0.5 bg-white border border-[#c3c6d7] rounded text-[11px] font-black text-purple-700">
                                PhonePe
                              </span>
                              <span className="px-2 py-0.5 bg-white border border-[#c3c6d7] rounded text-[11px] font-black text-sky-500">
                                Paytm
                              </span>
                              <span className="px-2 py-0.5 bg-white border border-[#c3c6d7] rounded text-[11px] font-black text-[#2d6a4f]">
                                BHIM
                              </span>
                            </div>
                          </div>

                          {/* Copyable VPA */}
                          <div className="bg-white p-2.5 rounded-xl border border-[#c3c6d7] flex items-center justify-between text-xs gap-2">
                            <div className="truncate">
                              <span className="text-[10px] text-[#737686] block">UPI VPA ID:</span>
                              <span className="font-mono font-bold text-[#1b1c17]">{upiId}</span>
                            </div>
                            <button
                              onClick={handleCopyUpi}
                              className="px-3 py-1.5 bg-[#f0eee6] hover:bg-[#e4e3db] text-[#1b1c17] rounded-lg font-bold text-[11px] shrink-0 transition-colors flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-sm">
                                {copiedUpi ? 'check' : 'content_copy'}
                              </span>
                              {copiedUpi ? 'Copied!' : 'Copy ID'}
                            </button>
                          </div>

                          {/* Timer */}
                          <div className="flex items-center gap-2 text-xs text-[#737686]">
                            <span className="material-symbols-outlined text-amber-600 text-base animate-pulse">
                              timer
                            </span>
                            <span>QR Code Session expires in:</span>
                            <span className="font-mono font-extrabold text-[#aa3000]">
                              {formatTimer(timeLeft)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Simulate Payment Action Button */}
                      <button
                        onClick={handleSimulateQrPayment}
                        disabled={isProcessing}
                        className="w-full py-4 bg-[#2d6a4f] hover:bg-[#1f4e38] text-white font-black text-base rounded-2xl shadow-lg transition-all hover-bounce cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Verifying UPI Payment Stream...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
                            <span>Simulate Successful QR Payment ({formatPrice(finalTotalINR, currency)})</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 pt-2 text-xs">
                      <div>
                        <label className="font-bold text-[#737686]">Card Number</label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8821"
                          className="w-full mt-1 p-2.5 bg-[#f0eee6] rounded-xl border border-[#c3c6d7]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-[#737686]">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            placeholder="08/28"
                            className="w-full mt-1 p-2.5 bg-[#f0eee6] rounded-xl border border-[#c3c6d7]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#737686]">CVV</label>
                          <input
                            type="password"
                            placeholder="•••"
                            className="w-full mt-1 p-2.5 bg-[#f0eee6] rounded-xl border border-[#c3c6d7]"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleSimulateQrPayment}
                        disabled={isProcessing}
                        className="w-full py-3.5 bg-[#2d6a4f] hover:bg-[#1f4e38] text-white font-extrabold rounded-xl transition-colors shadow-md mt-2"
                      >
                        {isProcessing ? 'Processing Card...' : `Pay ${formatPrice(finalTotalINR, currency)}`}
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-3 pt-2 text-xs">
                      <label className="font-bold text-[#737686]">Select Bank</label>
                      <select className="w-full p-2.5 bg-[#f0eee6] rounded-xl border border-[#c3c6d7] font-semibold text-[#1b1c17]">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                      <button
                        onClick={handleSimulateQrPayment}
                        disabled={isProcessing}
                        className="w-full py-3.5 bg-[#2d6a4f] hover:bg-[#1f4e38] text-white font-extrabold rounded-xl transition-colors shadow-md mt-2"
                      >
                        {isProcessing ? 'Redirecting to Bank...' : `Pay ${formatPrice(finalTotalINR, currency)}`}
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="space-y-3 pt-2 text-xs">
                      <p className="text-[#434655]">
                        Pay cash directly to our delivery executive when your parcel arrives.
                      </p>
                      <button
                        onClick={handleSimulateQrPayment}
                        disabled={isProcessing}
                        className="w-full py-3.5 bg-[#2d6a4f] hover:bg-[#1f4e38] text-white font-extrabold rounded-xl transition-colors shadow-md"
                      >
                        Confirm COD Order ({formatPrice(finalTotalINR, currency)})
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Items & Summary (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7] shadow-xs space-y-4">
                  <h3 className="font-extrabold text-sm text-[#1b1c17] flex justify-between items-center">
                    <span>Order Summary</span>
                    <span className="text-xs text-[#737686] font-normal">{items.length} items</span>
                  </h3>

                  {/* Items List */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 text-xs border-b border-[#f0eee6] pb-2.5">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-xl border border-[#c3c6d7]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#1b1c17] truncate">{item.product.name}</h4>
                          <p className="text-[#737686]">
                            Qty: {item.quantity} {item.selectedGiftWrap && '• 🎁 Gift Wrapped'}
                          </p>
                        </div>
                        <span className="font-bold text-[#2d6a4f]">
                          {formatPrice(item.product.priceINR * item.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-2 text-xs pt-2 border-t border-[#c3c6d7]">
                    <div className="flex justify-between text-[#737686]">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotalINR, currency)}</span>
                    </div>
                    {discountAmountINR > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Coupon Discount</span>
                        <span>-{formatPrice(discountAmountINR, currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#737686]">
                      <span>Express Shipping</span>
                      <span className="text-emerald-700 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-base text-[#1b1c17] pt-2 border-t border-[#e4e3db]">
                      <span>Grand Total</span>
                      <span className="text-[#2d6a4f] text-lg font-black">
                        {formatPrice(finalTotalINR, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Safe & Verified Badge */}
                  <div className="bg-[#f0eee6] p-3 rounded-xl flex items-center gap-2 text-[11px] text-[#434655]">
                    <span className="material-symbols-filled text-emerald-700 text-base">verified_user</span>
                    <span>Safe ToyJoy Purchase Guarantee with 7-day hassle-free returns.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
