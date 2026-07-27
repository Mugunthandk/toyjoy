export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';
export type Language = 
  | 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn' | 'bn' | 'mr' | 'gu' | 'pa' | 'or' | 'ur'
  | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'ar' | 'pt' | 'ru' | 'ko' | 'it' | 'nl' | 'id' | 'vi' | 'th' | 'tr';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory?: string;
  priceINR: number;
  rating: number;
  reviewCount: number;
  ageRange: string;
  minAge: number;
  maxAge: number;
  description: string;
  features: string[];
  materials: string;
  safetyCertified: boolean;
  stemValue: number; // 1 - 10
  batteryRequired: boolean;
  warranty: string;
  imageUrl: string;
  galleryImages?: string[];
  stock: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  barcode: string;
  qrCode: string;
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedGiftWrap?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  totalINR: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  carrier: 'Delhivery' | 'Blue Dart' | 'DTDC' | 'India Post' | 'XpressBees';
  deliveryAddress: string;
  estimatedDelivery: string;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  riskScore: 'Low' | 'Medium' | 'High';
  deliveryOtp?: string;
}

export interface GiftFinderCriteria {
  recipient: string; // e.g., "Son", "Daughter", "Nephew", "Friend"
  age: number;
  gender?: string;
  budgetINR: number;
  occasion: string; // e.g., "Birthday", "Diwali", "Christmas", "General"
  interests: string[];
  educationalOrFun: 'educational' | 'fun' | 'both';
  indoorOrOutdoor: 'indoor' | 'outdoor' | 'both';
  brandPreference?: string;
}

export interface GiftFinderResult {
  bestMatches: Product[];
  budgetOptions: Product[];
  premiumOptions: Product[];
  bundleSuggestions: {
    title: string;
    products: Product[];
    discountPercentage: number;
    totalINR: number;
  }[];
  wrappingAdvice: string;
  aiExplanation: string;
}

export interface ReviewSummary {
  overallSentiment: 'Positive' | 'Mixed' | 'Critical';
  pros: string[];
  cons: string[];
  summaryText: string;
}

export interface ComparisonResult {
  products: Product[];
  summaryText: string;
  winnerByAgeGroup: Record<string, string>;
  bestForSTEM: string;
  bestValue: string;
}

export interface InventoryForecastItem {
  productId: string;
  productName: string;
  currentStock: number;
  expectedDemand30Days: number;
  suggestedReorderQty: number;
  riskLevel: 'Normal' | 'Low Stock Risk' | 'Overstock';
  category: string;
}

export interface SalesForecast {
  dailySales: { date: string; revenue: number; orders: number }[];
  monthlyRevenue: { month: string; projected: number; actual?: number }[];
  categoryShare: { category: string; percentage: number }[];
  growthPredictionPct: number;
  peakSeasonNotice: string;
}

export interface FraudAlert {
  id: string;
  orderId: string;
  customerName: string;
  amountINR: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  reasons: string[];
  timestamp: string;
  status: 'Pending Review' | 'Cleared' | 'Blocked';
}

export interface CustomerInsight {
  segment: string;
  customerCount: number;
  avgOrderValueINR: number;
  purchaseFrequency: string;
  churnRiskPct: number;
  preferredCategories: string[];
}

export interface SellerInsight {
  bestSellers: string[];
  slowInventory: string[];
  suggestedPromotions: { title: string; discountPct: number; targetCategory: string }[];
  popularSearchKeywords: string[];
  pricingAdvice: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  pinCode: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  distanceKm?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  status: 'Draft' | 'Published';
  tags: string[];
}

export interface GiftCard {
  id: string;
  code: string;
  type: 'Birthday' | 'Christmas' | 'New Year' | 'Festival' | 'General';
  amountINR: number;
  senderName: string;
  recipientEmail: string;
  message: string;
  isRedeemed: boolean;
  expiryDate: string;
}

export interface LoyaltyProfile {
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  points: number;
  cashbackEarnedINR: number;
  perks: string[];
  referralCode: string;
  totalReferrals: number;
  referralEarningsINR: number;
}

export interface OrderItem {
  name: string;
  qty: number;
  priceINR: number;
  img: string;
}

export interface UserOrder {
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalINR: number;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery?: string;
  deliveryAddress?: string;
  timeline?: {
    step: string;
    time: string;
    completed: boolean;
  }[];
  items: OrderItem[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role?: 'Customer' | 'VIP Member' | 'Admin';
  kidsAges?: number[];
  interests?: string[];
  loyaltyPoints: number;
  joinedDate: string;
  addresses?: {
    id: string;
    label: string;
    name: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    pinCode: string;
    isDefault: boolean;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'price_drop' | 'wishlist' | 'birthday' | 'renewal' | 'festival' | 'reward';
  date: string;
  read: boolean;
}
