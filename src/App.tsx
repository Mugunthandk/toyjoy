import React, { useState } from 'react';
import { Product, CartItem, Currency, Language, UserProfile, Review } from './types';
import { INITIAL_PRODUCTS, MOCK_REVIEWS, MOCK_LOYALTY, MOCK_NOTIFICATIONS, DEFAULT_USER } from './data/mockData';
import { EnterpriseBar } from './components/EnterpriseBar';
import { Header } from './components/Header';
import { AccountAuthPage } from './components/AccountAuthPage';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { CategorySection } from './components/CategorySection';
import { BestSellersSection } from './components/BestSellersSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { CategoryPage } from './components/CategoryPage';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { JoyBotChatWidget } from './components/JoyBotChatWidget';
import { AISmartSearchModal } from './components/AISmartSearchModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { AIReviewSummaryModal } from './components/AIReviewSummaryModal';
import { AdminForecastsDashboard } from './components/AdminForecastsDashboard';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { formatPrice } from './utils/currency';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('shop');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [language, setLanguage] = useState<Language>('en');

  // State for products, reviews and cart
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1, selectedGiftWrap: false },
    { product: INITIAL_PRODUCTS[1], quantity: 1, selectedGiftWrap: true }
  ]);

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === newReview.productId) {
          const prodReviews = reviews.filter((r) => r.productId === p.id);
          const newCount = p.reviewCount + 1;
          const totalSum = prodReviews.reduce((acc, r) => acc + r.rating, 0) + newReview.rating;
          const newRating = Number((totalSum / newCount).toFixed(1));
          return {
            ...p,
            reviewCount: newCount,
            rating: newRating
          };
        }
        return p;
      })
    );
    if (selectedProduct && selectedProduct.id === newReview.productId) {
      setSelectedProduct((prev) =>
        prev
          ? {
              ...prev,
              reviewCount: prev.reviewCount + 1
            }
          : null
      );
    }
  };
  const [wishlist, setWishlist] = useState<string[]>(['toy-101']);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Wooden Toys');
  const [selectedAgeGroupFilter, setSelectedAgeGroupFilter] = useState<string>('All');

  // Modal open states
  const [isJoyBotOpen, setIsJoyBotOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isSmartSearchOpen, setIsSmartSearchOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotals, setCheckoutTotals] = useState({ subtotalINR: 0, discountAmountINR: 0, finalTotalINR: 0 });

  // Selected item states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [compareProductIds, setCompareProductIds] = useState<string[]>(['toy-101', 'toy-102']);

  // User Account State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEFAULT_USER);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleUpdateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.product.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const handleToggleGiftWrap = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, selectedGiftWrap: !item.selectedGiftWrap } : item
      )
    );
  };

  const handleToggleCompare = (product: Product) => {
    setCompareProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products at a time!');
        return prev;
      }
      return [...prev, product.id];
    });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategoryFilter(category);
    setActiveTab('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f1] text-[#1b1c17] antialiased">
      {/* Top Enterprise Bar */}
      <EnterpriseBar
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        loyalty={MOCK_LOYALTY}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenLoyaltyModal={() => setIsAdminOpen(true)}
      />

      {/* Main Header Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'shop') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSmartSearch={() => setIsSmartSearchOpen(true)}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        notificationCount={MOCK_NOTIFICATIONS.filter((n) => !n.read).length}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Body Layout */}
      <main className="flex-1">
        {activeTab === 'profile' ? (
          <AccountAuthPage
            currentUser={currentUser}
            onLogin={(user) => setCurrentUser(user)}
            onLogout={() => setCurrentUser(null)}
            currency={currency}
            onBackToShop={() => setActiveTab('shop')}
          />
        ) : activeTab === 'category' ? (
          <CategoryPage
            selectedCategory={selectedCategoryFilter}
            onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
            selectedAgeGroup={selectedAgeGroupFilter}
            onSelectAgeGroup={(age) => setSelectedAgeGroupFilter(age)}
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist}
            currency={currency}
            onBackToHome={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {/* Home Overview Page */}
            <Hero
              onShopNow={() => {
                handleSelectCategory('Wooden Toys');
              }}
              onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
            />

            <TrustSection />

            <CategorySection
              onSelectCategory={(cat) => {
                setSelectedAgeGroupFilter('All');
                handleSelectCategory(cat);
              }}
              onSelectAgeGroup={(ageVal) => {
                setSelectedAgeGroupFilter(ageVal);
                setSelectedCategoryFilter('All');
                setActiveTab('category');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <BestSellersSection
              products={products}
              currency={currency}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onViewAll={() => handleSelectCategory('All')}
              onToggleCompare={handleToggleCompare}
              selectedCompareIds={compareProductIds}
            />

            <PhotoGallerySection
              products={products}
              currency={currency}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
            />

            <NewsletterSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
      />

      {/* Floating JoyBot AI Chat Assistant */}
      <JoyBotChatWidget
        isOpen={isJoyBotOpen}
        onToggle={() => setIsJoyBotOpen(!isJoyBotOpen)}
        onOpenGiftFinder={() => {
          setIsJoyBotOpen(false);
        }}
      />

      {/* AI Smart Search & Vision Modal */}
      <AISmartSearchModal
        isOpen={isSmartSearchOpen}
        onClose={() => setIsSmartSearchOpen(false)}
        products={products}
        currency={currency}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Product Comparison Modal */}
      <ProductCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={products.filter((p) => compareProductIds.includes(p.id))}
        currency={currency}
        onAddToCart={handleAddToCart}
        onRemoveCompare={(id) => setCompareProductIds((prev) => prev.filter((i) => i !== id))}
      />

      {/* AI Review Summary Modal */}
      <AIReviewSummaryModal
        isOpen={!!reviewProduct}
        onClose={() => setReviewProduct(null)}
        product={reviewProduct}
        reviews={reviews}
      />

      {/* Admin Forecasts & Intelligence Hub */}
      <AdminForecastsDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currency={currency}
      />

      {/* Store Locator Map Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

      {/* Individual Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        onOpenReviewSummary={(p) => setReviewProduct(p)}
        reviews={reviews}
        currentUser={currentUser}
        onAddReview={handleAddReview}
        onOpenAuth={() => {
          setSelectedProduct(null);
          setActiveTab('profile');
        }}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQty={handleUpdateQty}
        onToggleGiftWrap={handleToggleGiftWrap}
        onClearCart={() => setCart([])}
        onOpenCheckout={(subtotalINR, discountAmountINR, finalTotalINR) => {
          setCheckoutTotals({ subtotalINR, discountAmountINR, finalTotalINR });
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout with QR Code Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        subtotalINR={checkoutTotals.subtotalINR}
        discountAmountINR={checkoutTotals.discountAmountINR}
        finalTotalINR={checkoutTotals.finalTotalINR}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Notifications Drawer Modal */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-extrabold text-lg text-[#1b1c17] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ea580c]">notifications</span>
                AI Smart Alerts
              </h3>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0eee6] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_NOTIFICATIONS.map((n) => (
                <div key={n.id} className="p-3 bg-[#f0eee6] rounded-2xl space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="text-[#ea580c]">{n.title}</strong>
                    <span className="text-[#737686]">{n.date}</span>
                  </div>
                  <p className="text-xs text-[#1b1c17]">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
