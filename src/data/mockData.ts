import { Product, Review, StoreLocation, BlogPost, LoyaltyProfile, CustomerInsight, SellerInsight, InventoryForecastItem, SalesForecast, FraudAlert, NotificationItem, UserProfile, UserOrder } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'toy-101',
    name: 'Rainbow Wooden Stacker & Arch Set',
    brand: 'EcoPlay',
    category: 'Wooden Toys',
    subCategory: 'Stackers & Arches',
    priceINR: 1999,
    rating: 4.8,
    reviewCount: 142,
    ageRange: 'Ages 1–4',
    minAge: 1,
    maxAge: 4,
    description: 'Handcrafted sustainable beechwood rainbow stacker with non-toxic water-based paints. Fosters color recognition and fine motor control.',
    features: ['12 Vibrant Arches', '100% Organic German Wood', 'Non-toxic kid-safe dyes', 'Sustainably Forested'],
    materials: 'Sustainably sourced beech wood',
    safetyCertified: true,
    stemValue: 7,
    batteryRequired: false,
    warranty: '1 Year Manufacturer Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 45,
    isBestSeller: true,
    barcode: 'TJ-8901234001',
    qrCode: 'https://toyjoy.app/p/toy-101',
    tags: ['wooden', 'montessori', 'stacker', 'eco-friendly']
  },
  {
    id: 'toy-102',
    name: 'Solar Explorer Bot 7-in-1 DIY Kit',
    brand: 'RoboKids',
    category: 'STEM Kits',
    subCategory: 'Robotics & Solar',
    priceINR: 3499,
    rating: 4.9,
    reviewCount: 210,
    ageRange: 'Ages 8–14',
    minAge: 8,
    maxAge: 14,
    description: 'Build 7 different solar-powered space rovers and bots. Teaches renewable energy concepts, gear physics, and spatial engineering.',
    features: ['Solar Panel Included', '7 Convertible Builds', 'Gearbox Mechanism', 'No Batteries Needed'],
    materials: 'Recycled ABS plastic & solar unit',
    safetyCertified: true,
    stemValue: 10,
    batteryRequired: false,
    warranty: '6 Months Replacement Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 28,
    isNew: true,
    barcode: 'TJ-8901234002',
    qrCode: 'https://toyjoy.app/p/toy-102',
    tags: ['stem', 'solar', 'robotics', 'diy', 'science']
  },
  {
    id: 'toy-103',
    name: 'Giant Plush Huggy Bear (120cm)',
    brand: 'SnugglePal',
    category: 'Plush Friends',
    subCategory: 'Giant Teddy Bears',
    priceINR: 2999,
    rating: 4.7,
    reviewCount: 98,
    ageRange: 'Ages 0+',
    minAge: 0,
    maxAge: 99,
    description: 'Ultra-soft hypoallergenic velvet teddy bear with washable fur and weighted cozy paws. Perfect companion for restful sleep.',
    features: ['120cm Huggable Height', 'Machine Washable Outer Layer', 'Hypoallergenic Recycled Cotton', 'Embroidered Safe Eyes'],
    materials: 'High-density micro-plush fiber',
    safetyCertified: true,
    stemValue: 2,
    batteryRequired: false,
    warranty: '3 Months Quality Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 14,
    isBestSeller: true,
    barcode: 'TJ-8901234003',
    qrCode: 'https://toyjoy.app/p/toy-103',
    tags: ['plush', 'teddy', 'soft toy', 'huggy']
  },
  {
    id: 'toy-104',
    name: '3D Magnetic Castle Building Tiles (100 Pcs)',
    brand: 'MagnaBuild',
    category: 'STEM Kits',
    subCategory: 'Magnetic Construction',
    priceINR: 4299,
    rating: 4.9,
    reviewCount: 312,
    ageRange: 'Ages 3–10',
    minAge: 3,
    maxAge: 10,
    description: 'Translucent 3D magnetic geometric tiles for building towers, castles, and 3D geometric shapes. Enhances spatial reasoning and creativity.',
    features: ['Strong Neodymium Magnets', 'Sonic-welded Edges', 'Translucent Prism Colors', 'Includes Wheel Base'],
    materials: 'BPA-free Food Grade ABS Plastic',
    safetyCertified: true,
    stemValue: 9,
    batteryRequired: false,
    warranty: '1 Year Structural Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 18,
    isLimited: true,
    barcode: 'TJ-8901234004',
    qrCode: 'https://toyjoy.app/p/toy-104',
    tags: ['magnetic', 'tiles', 'stem', 'building', 'blocks']
  },
  {
    id: 'toy-105',
    name: 'Smart RC Dinosaur with Voice & Gesture Control',
    brand: 'DinoTech',
    category: 'Electronic Toys',
    subCategory: 'Robotics & RC',
    priceINR: 3999,
    rating: 4.6,
    reviewCount: 84,
    ageRange: 'Ages 5–12',
    minAge: 5,
    maxAge: 12,
    description: 'Interactive velociraptor with realistic walking motions, roaring audio, LED eyes, and gesture sensors. USB rechargeable battery.',
    features: ['Gesture Sensor Technology', '2.4GHz Remote Control', 'Rechargeable Li-ion Battery', 'Programmable Sequences'],
    materials: 'Durable Polycarbonate & Rubber',
    safetyCertified: true,
    stemValue: 8,
    batteryRequired: true,
    warranty: '6 Months Electronics Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 22,
    isNew: true,
    barcode: 'TJ-8901234005',
    qrCode: 'https://toyjoy.app/p/toy-105',
    tags: ['dinosaur', 'rc', 'electronic', 'rechargeable']
  },
  {
    id: 'toy-106',
    name: 'Wooden Kitchen Playset with Sounding Stove',
    brand: 'EcoPlay',
    category: 'Pretend Play',
    subCategory: 'Play Kitchens & Food',
    priceINR: 5999,
    rating: 4.8,
    reviewCount: 120,
    ageRange: 'Ages 3–8',
    minAge: 3,
    maxAge: 8,
    description: 'Deluxe wooden play kitchen featuring realistic boiling sound effects, clicking oven knobs, utensil hooks, and wooden cooking pots.',
    features: ['Light & Sizzling Sound Effects', 'Oven, Sink & Storage Shelves', 'Includes 10 Wooden Cooking Accessories', 'Rounded Edges'],
    materials: 'Solid Pine Wood & Engineered MDF',
    safetyCertified: true,
    stemValue: 5,
    batteryRequired: true,
    warranty: '1 Year Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 9,
    isBestSeller: true,
    barcode: 'TJ-8901234006',
    qrCode: 'https://toyjoy.app/p/toy-106',
    tags: ['kitchen', 'pretend play', 'wooden', 'montessori']
  },
  {
    id: 'toy-107',
    name: 'Code-a-Bot Bee Early Logic Coding Robot',
    brand: 'RoboKids',
    category: 'STEM Kits',
    subCategory: 'Coding & Logic',
    priceINR: 2799,
    rating: 4.9,
    reviewCount: 165,
    ageRange: 'Ages 4–8',
    minAge: 4,
    maxAge: 8,
    description: 'Screen-free directional coding bee robot. Kids program path sequences using physical button presses to navigate mat challenges.',
    features: ['Screen-Free Coding', 'Stores up to 40 Sequence Steps', 'Includes Grid Map Mat & Challenge Cards', 'Auditory Feedback'],
    materials: 'High-impact ABS Plastic',
    safetyCertified: true,
    stemValue: 10,
    batteryRequired: true,
    warranty: '6 Months Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 31,
    barcode: 'TJ-8901234007',
    qrCode: 'https://toyjoy.app/p/toy-107',
    tags: ['coding', 'stem', 'robot', 'logic', 'screen-free']
  },
  {
    id: 'toy-108',
    name: 'Artisan Wooden Train Track Express (60 Pcs)',
    brand: 'EcoPlay',
    category: 'Wooden Toys',
    subCategory: 'Trains & Vehicles',
    priceINR: 3299,
    rating: 4.8,
    reviewCount: 180,
    ageRange: 'Ages 2–7',
    minAge: 2,
    maxAge: 7,
    description: 'Expandable wooden train railway set with bridge, magnetic locomotives, trees, and traffic signs. Compatible with major wooden track brands.',
    features: ['60 Precision Interlocking Track Pieces', 'Magnetic Wooden Cars', 'Suspension Bridge Piece', 'Universal Compatibility'],
    materials: 'Natural Solid Beechwood',
    safetyCertified: true,
    stemValue: 7,
    batteryRequired: false,
    warranty: '1 Year Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 16,
    barcode: 'TJ-8901234008',
    qrCode: 'https://toyjoy.app/p/toy-108',
    tags: ['train', 'wooden', 'track', 'railway']
  },
  {
    id: 'toy-109',
    name: 'Little Doctor Medical Trolley Set',
    brand: 'PlayCare',
    category: 'Pretend Play',
    subCategory: 'Career Roleplay',
    priceINR: 1899,
    rating: 4.5,
    reviewCount: 76,
    ageRange: 'Ages 3–7',
    minAge: 3,
    maxAge: 7,
    description: 'Mobile doctor cart with heartbeat stethoscope, illuminated X-ray panel, syringe, thermometer, and prescription clipboard.',
    features: ['Light & Sound Stethoscope', 'Rolling Wheeled Cart', '15 Doctor Tools Included', 'Rounded Safety Handles'],
    materials: 'BPA-Free Child Safe Plastic',
    safetyCertified: true,
    stemValue: 6,
    batteryRequired: true,
    warranty: '3 Months Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 25,
    barcode: 'TJ-8901234009',
    qrCode: 'https://toyjoy.app/p/toy-109',
    tags: ['doctor', 'pretend play', 'medical', 'roleplay']
  },
  {
    id: 'toy-110',
    name: 'Space Astronaut Microscope & Galaxy Projector',
    brand: 'AstroFun',
    category: 'STEM Kits',
    subCategory: 'Science & Space',
    priceINR: 2499,
    rating: 4.9,
    reviewCount: 140,
    ageRange: 'Ages 6–12',
    minAge: 6,
    maxAge: 12,
    description: 'Dual-function science toy featuring 400x optical magnification microscope and 360-degree rotating planetarium galaxy projector.',
    features: ['Dual Microscope + Projector', 'Includes 12 Prepared Slides', 'HD Optical Glass Lenses', 'Starry Nebula Light Effect'],
    materials: 'ABS Shell & Glass Optics',
    safetyCertified: true,
    stemValue: 10,
    batteryRequired: true,
    warranty: '6 Months Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 35,
    isNew: true,
    barcode: 'TJ-8901234010',
    qrCode: 'https://toyjoy.app/p/toy-110',
    tags: ['space', 'microscope', 'projector', 'stem', 'astronomy']
  },
  {
    id: 'toy-111',
    name: 'Montessori Wooden Shape Sorting Clock & Abacus',
    brand: 'EcoPlay',
    category: 'Wooden Toys',
    subCategory: 'Montessori Puzzles',
    priceINR: 1499,
    rating: 4.8,
    reviewCount: 115,
    ageRange: 'Ages 2–5',
    minAge: 2,
    maxAge: 5,
    description: 'Interactive dual-sided wooden clock with removable numbered geometric blocks and a 10-row counting abacus frame.',
    features: ['Time Telling Hands', '12 Geometric Block Shapes', 'Color-coded Counting Beads', 'Non-toxic Natural Stain'],
    materials: 'Natural Solid Rubberwood',
    safetyCertified: true,
    stemValue: 8,
    batteryRequired: false,
    warranty: '1 Year Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 50,
    isBestSeller: false,
    barcode: 'TJ-8901234011',
    qrCode: 'https://toyjoy.app/p/toy-111',
    tags: ['wooden', 'clock', 'abacus', 'montessori', 'math']
  },
  {
    id: 'toy-112',
    name: 'Organic Cotton Baby Bunny Soother Plush',
    brand: 'SnugglePal',
    category: 'Plush Friends',
    subCategory: 'Baby Soothers',
    priceINR: 1299,
    rating: 4.9,
    reviewCount: 88,
    ageRange: 'Ages 0–3',
    minAge: 0,
    maxAge: 3,
    description: 'Ultra-gentle GOTS certified organic cotton bunny blankie soother with embroidered facial features and calming crinkle ears.',
    features: ['GOTS Certified Organic Cotton', 'Gentle Crinkle Sound Ears', 'Machine Washable at 30°C', 'Safe for Teething Infants'],
    materials: '100% Organic Cotton Knit',
    safetyCertified: true,
    stemValue: 1,
    batteryRequired: false,
    warranty: '3 Months Quality Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 40,
    isNew: true,
    barcode: 'TJ-8901234012',
    qrCode: 'https://toyjoy.app/p/toy-112',
    tags: ['plush', 'bunny', 'organic', 'soother', 'baby']
  },
  {
    id: 'toy-113',
    name: 'Interactive Talking Elephant Plush with Peek-a-Boo',
    brand: 'SnugglePal',
    category: 'Plush Friends',
    subCategory: 'Interactive Soft Toys',
    priceINR: 2199,
    rating: 4.8,
    reviewCount: 156,
    ageRange: 'Ages 0–4',
    minAge: 0,
    maxAge: 4,
    description: 'Singing animated elephant plush that moves its floppy ears during peek-a-boo games and sings nursery rhymes in English.',
    features: ['Floppy Flapping Ear Animation', 'Plays 2 Nursery Rhymes', 'Velvet Soft Fur', 'Washable Surface'],
    materials: 'Soft Plush Fiber & Electronics',
    safetyCertified: true,
    stemValue: 3,
    batteryRequired: true,
    warranty: '6 Months Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 20,
    isBestSeller: true,
    barcode: 'TJ-8901234013',
    qrCode: 'https://toyjoy.app/p/toy-113',
    tags: ['plush', 'elephant', 'interactive', 'peekaboo']
  },
  {
    id: 'toy-114',
    name: 'Vintage Wooden Villa Dollhouse with 24 Pcs Furniture',
    brand: 'EcoPlay',
    category: 'Pretend Play',
    subCategory: 'Dollhouses & Figures',
    priceINR: 6499,
    rating: 4.9,
    reviewCount: 112,
    ageRange: 'Ages 3–10',
    minAge: 3,
    maxAge: 10,
    description: '3-story handcrafted wooden dollhouse with openable windows, working staircase, balcony, and 24 hand-painted miniature wooden furniture pieces.',
    features: ['3 Storeys + Attic Roof', '24 Hand-painted Wooden Furniture', 'Non-toxic Water-based Paint', 'Easy Assembly'],
    materials: 'Sustainably sourced Baltic Birch & Beechwood',
    safetyCertified: true,
    stemValue: 6,
    batteryRequired: false,
    warranty: '1 Year Structural Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 12,
    isNew: true,
    barcode: 'TJ-8901234014',
    qrCode: 'https://toyjoy.app/p/toy-114',
    tags: ['dollhouse', 'wooden', 'pretend play', 'furniture']
  },
  {
    id: 'toy-115',
    name: 'Symphony Floor Music Mat & Glowing Dance Piano',
    brand: 'DinoTech',
    category: 'Electronic Toys',
    subCategory: 'Musical & Sound',
    priceINR: 2899,
    rating: 4.7,
    reviewCount: 94,
    ageRange: 'Ages 2–8',
    minAge: 2,
    maxAge: 8,
    description: 'Jumbo 1.5-meter step-on piano mat with 8 instrument sound modes, 10 demo tunes, recording function, and glowing LED piano keys.',
    features: ['1.5m Jumbo Play Area', '8 Instrument Sound Modes', 'Record & Playback Feature', 'Anti-Slip Waterproof Fabric'],
    materials: 'Soft Non-woven Fabric & EVA Cushion',
    safetyCertified: true,
    stemValue: 7,
    batteryRequired: true,
    warranty: '6 Months Electronics Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 26,
    isBestSeller: true,
    barcode: 'TJ-8901234015',
    qrCode: 'https://toyjoy.app/p/toy-115',
    tags: ['music', 'piano', 'mat', 'electronic', 'dance']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'toy-101',
    userName: 'Priya Sharma',
    rating: 5,
    date: '2026-07-20',
    comment: 'Exceptional craftsmanship! My 2-year-old daughter loves building bridges and stacking arches. Smooth edges and non-toxic dye smell.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'toy-101',
    userName: 'Rohan Mehta',
    rating: 5,
    date: '2026-07-18',
    comment: 'Super durable. Very aesthetic for the nursery decor as well. Worth every rupee.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'toy-102',
    userName: 'Ananya Nair',
    rating: 5,
    date: '2026-07-15',
    comment: 'My 10-year-old son assembled the solar rover in 2 hours! The solar panel works even under bright table lamps.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'toy-102',
    userName: 'Karthik Raja',
    rating: 4,
    date: '2026-07-10',
    comment: 'Great STEM kit. Gears take a little patience to align, but instruction manual is very clear.',
    verifiedPurchase: true
  }
];

export const MOCK_STORES: StoreLocation[] = [
  {
    id: 'store-1',
    name: 'ToyJoy Flagship - Phoenix Marketcity',
    city: 'Bengaluru',
    pinCode: '560048',
    address: 'GF-42, Phoenix Marketcity, Whitefield Main Rd',
    phone: '+91 80 4912 3456',
    hours: '10:00 AM - 10:00 PM',
    lat: 12.9959,
    lng: 77.6964
  },
  {
    id: 'store-2',
    name: 'ToyJoy - Express Avenue',
    city: 'Chennai',
    pinCode: '600002',
    address: 'S-18, Express Avenue Mall, Royapettah',
    phone: '+91 44 2846 9000',
    hours: '10:00 AM - 9:30 PM',
    lat: 13.0587,
    lng: 80.2642
  },
  {
    id: 'store-3',
    name: 'ToyJoy Experience Hub - DLF Avenue',
    city: 'New Delhi',
    pinCode: '110017',
    address: 'First Floor, DLF Avenue, Saket',
    phone: '+91 11 4100 8899',
    hours: '10:30 AM - 10:00 PM',
    lat: 28.5283,
    lng: 77.2188
  },
  {
    id: 'store-4',
    name: 'ToyJoy Wonderland - Inorbit Mall',
    city: 'Mumbai',
    pinCode: '400064',
    address: 'Level 2, Inorbit Mall, Malad West',
    phone: '+91 22 6677 3322',
    hours: '10:00 AM - 10:00 PM',
    lat: 19.173,
    lng: 72.8361
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Top 10 STEM Toys to Spark Curiosity in 2026',
    slug: 'top-10-stem-toys-2026',
    category: 'Educational Toy Guides',
    author: 'Dr. Meera Vasudev (Child Psychologist)',
    date: '2026-07-22',
    excerpt: 'Discover how hands-on robotics, magnetic construction, and spatial coding toys accelerate early brain development and problem-solving skills.',
    content: 'STEM toys bridge the gap between play and real-world science skills. By engaging children in active construction, solar power experiments, and screen-free coding, children build resilience and analytical confidence...',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
    status: 'Published',
    tags: ['STEM', 'Robotics', 'Parenting', 'Brain Growth']
  },
  {
    id: 'blog-2',
    title: 'Montessori Wooden Toys vs Plastic: What Parents Need to Know',
    slug: 'montessori-wooden-vs-plastic',
    category: 'Parenting Tips',
    author: 'Arjun Kapoor (Montessori Educator)',
    date: '2026-07-15',
    excerpt: 'Why tactile wooden toys with organic weight and simple shapes create calmer, more focused play environments for toddlers.',
    content: 'Overstimulating electronic toys with flashing lights often induce passive entertainment. Wooden toys require physical force, gravity awareness, and imaginative narrative creation...',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    status: 'Published',
    tags: ['Montessori', 'Wooden Toys', 'Toddler Growth']
  }
];

export const MOCK_LOYALTY: LoyaltyProfile = {
  level: 'Gold',
  points: 1450,
  cashbackEarnedINR: 725,
  perks: ['Free Gift Wrapping', '10% Extra Points on Festivals', 'Priority Express Delivery', 'Early Access to New Launches'],
  referralCode: 'JOY-PRIYA2026',
  totalReferrals: 6,
  referralEarningsINR: 1200
};

export const MOCK_CUSTOMER_INSIGHTS: CustomerInsight[] = [
  {
    segment: 'Tech-Forward Parents (Ages 30-42)',
    customerCount: 14200,
    avgOrderValueINR: 3850,
    purchaseFrequency: 'Every 45 days',
    churnRiskPct: 8,
    preferredCategories: ['STEM Kits', 'Electronic Toys', 'Robotics']
  },
  {
    segment: 'Montessori & Eco Enthusiasts',
    customerCount: 9800,
    avgOrderValueINR: 2900,
    purchaseFrequency: 'Every 60 days',
    churnRiskPct: 12,
    preferredCategories: ['Wooden Toys', 'Puzzles', 'Pretend Play']
  },
  {
    segment: 'Grandparents & Gift Buyers',
    customerCount: 7500,
    avgOrderValueINR: 4200,
    purchaseFrequency: 'Seasonal / Birthdays',
    churnRiskPct: 18,
    preferredCategories: ['Plush Friends', 'Gift Bundles', 'Board Games']
  }
];

export const MOCK_SELLER_INSIGHTS: SellerInsight = {
  bestSellers: ['Solar Explorer Bot 7-in-1', 'Rainbow Wooden Stacker', '3D Magnetic Castle Tiles'],
  slowInventory: ['Retro Wind-up Tin Cars', 'Complex 1000-Piece Paper Puzzle'],
  suggestedPromotions: [
    { title: 'Diwali STEM Bundle Offer', discountPct: 15, targetCategory: 'STEM Kits' },
    { title: 'Toddler Birthday Gift Wrapper Freebie', discountPct: 10, targetCategory: 'Wooden Toys' }
  ],
  popularSearchKeywords: ['remote control dinosaur', 'montessori wooden kitchen', 'barbie dollhouse', 'solar robot kit', 'birthday gifts under 2000'],
  pricingAdvice: 'Lowering Magnetic Tiles price by 5% during weekend sales increases volume by 28%.'
};

export const MOCK_INVENTORY_FORECASTS: InventoryForecastItem[] = [
  {
    productId: 'toy-101',
    productName: 'Rainbow Wooden Stacker',
    currentStock: 45,
    expectedDemand30Days: 120,
    suggestedReorderQty: 100,
    riskLevel: 'Low Stock Risk',
    category: 'Wooden Toys'
  },
  {
    productId: 'toy-102',
    productName: 'Solar Explorer Bot',
    currentStock: 28,
    expectedDemand30Days: 95,
    suggestedReorderQty: 80,
    riskLevel: 'Low Stock Risk',
    category: 'STEM Kits'
  },
  {
    productId: 'toy-104',
    productName: '3D Magnetic Castle Tiles',
    currentStock: 18,
    expectedDemand30Days: 110,
    suggestedReorderQty: 120,
    riskLevel: 'Low Stock Risk',
    category: 'STEM Kits'
  },
  {
    productId: 'toy-106',
    productName: 'Wooden Kitchen Playset',
    currentStock: 9,
    expectedDemand30Days: 40,
    suggestedReorderQty: 40,
    riskLevel: 'Low Stock Risk',
    category: 'Pretend Play'
  }
];

export const MOCK_SALES_FORECAST: SalesForecast = {
  dailySales: [
    { date: 'Jul 21', revenue: 125000, orders: 48 },
    { date: 'Jul 22', revenue: 142000, orders: 55 },
    { date: 'Jul 23', revenue: 138000, orders: 51 },
    { date: 'Jul 24', revenue: 165000, orders: 62 },
    { date: 'Jul 25', revenue: 189000, orders: 74 },
    { date: 'Jul 26', revenue: 210000, orders: 82 },
    { date: 'Jul 27', revenue: 235000, orders: 91 }
  ],
  monthlyRevenue: [
    { month: 'Apr', projected: 3800000, actual: 3950000 },
    { month: 'May', projected: 4200000, actual: 4320000 },
    { month: 'Jun', projected: 4500000, actual: 4480000 },
    { month: 'Jul', projected: 5200000, actual: 5410000 },
    { month: 'Aug', projected: 6100000 },
    { month: 'Sep', projected: 7500000 }
  ],
  categoryShare: [
    { category: 'STEM Kits', percentage: 34 },
    { category: 'Wooden Toys', percentage: 28 },
    { category: 'Pretend Play', percentage: 18 },
    { category: 'Electronic Toys', percentage: 12 },
    { category: 'Plush Friends', percentage: 8 }
  ],
  growthPredictionPct: 24.5,
  peakSeasonNotice: 'Festive Season (Diwali & Christmas) spike expected to surge orders by +140% starting September.'
};

export const MOCK_FRAUD_ALERTS: FraudAlert[] = [
  {
    id: 'fa-101',
    orderId: 'ORD-9921',
    customerName: 'Devesh Gupta',
    amountINR: 28500,
    riskLevel: 'High',
    reasons: ['Multiple failed card attempts in 10 mins', 'Mismatched IP location and billing address'],
    timestamp: '2026-07-26 14:22',
    status: 'Pending Review'
  },
  {
    id: 'fa-102',
    orderId: 'ORD-9918',
    customerName: 'Ritu V.',
    amountINR: 14200,
    riskLevel: 'Medium',
    reasons: ['High quantity of identical electronic items (5x)'],
    timestamp: '2026-07-26 11:05',
    status: 'Cleared'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Price Drop Alert!',
    message: 'Solar Explorer Bot 7-in-1 is now ₹3,499 (15% off).',
    type: 'price_drop',
    date: '10 mins ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Birthday Gift Offer 🎁',
    message: 'Get ₹500 off on any gift bundle for Aarav’s upcoming birthday!',
    type: 'birthday',
    date: '2 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Gold Tier Perks Unlocked ⭐',
    message: 'You have earned 1,450 ToyJoy points. Enjoy free express shipping!',
    type: 'reward',
    date: '1 day ago',
    read: true
  }
];

export const DEFAULT_USER: UserProfile = {
  id: 'usr-88912',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  role: 'VIP Member',
  kidsAges: [3, 7],
  interests: ['STEM Kits', 'Wooden Toys', 'Puzzles'],
  loyaltyPoints: 1450,
  joinedDate: 'Jan 2025',
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      line1: 'Flat 402, Sunshine Heights, MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560001',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Office',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      line1: 'TechPark Tower B, Floor 6, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560103',
      isDefault: false
    }
  ]
};

export const MOCK_USER_ORDERS: UserOrder[] = [
  {
    orderNumber: 'TJ-914002',
    date: '27 July 2026',
    status: 'Processing',
    totalINR: 2499,
    trackingNumber: 'DEL-9904120',
    carrier: 'Delhivery Express',
    estimatedDelivery: '29 July 2026',
    deliveryAddress: 'Flat 402, Sunshine Heights, MG Road, Bengaluru - 560001',
    timeline: [
      { step: 'Order Placed', time: '27 Jul, 09:30 AM', completed: true },
      { step: 'Payment Verified', time: '27 Jul, 09:32 AM', completed: true },
      { step: 'Warehouse Processing', time: 'In Progress', completed: false },
      { step: 'Handed to Courier', time: 'Expected 28 Jul', completed: false },
      { step: 'Delivered', time: 'Expected 29 Jul', completed: false }
    ],
    items: [
      { name: 'Eco Play Wooden Train Set (48 Pcs)', qty: 1, priceINR: 2499, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    orderNumber: 'TJ-912880',
    date: '26 July 2026',
    status: 'Shipped',
    totalINR: 3199,
    trackingNumber: 'BD-8830192',
    carrier: 'Blue Dart Air',
    estimatedDelivery: '28 July 2026',
    deliveryAddress: 'Flat 402, Sunshine Heights, MG Road, Bengaluru - 560001',
    timeline: [
      { step: 'Order Placed', time: '26 Jul, 02:15 PM', completed: true },
      { step: 'Quality Inspected', time: '26 Jul, 04:00 PM', completed: true },
      { step: 'Packed & Dispatched', time: '26 Jul, 07:45 PM', completed: true },
      { step: 'In Transit', time: 'Arrived at Bengaluru Hub', completed: true },
      { step: 'Out for Delivery', time: 'Tomorrow 10:00 AM', completed: false }
    ],
    items: [
      { name: 'Microscope & Biology Lab Starter Kit', qty: 1, priceINR: 3199, img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    orderNumber: 'TJ-908221',
    date: '24 July 2026',
    status: 'Delivered',
    totalINR: 5498,
    trackingNumber: 'DEL-8820194',
    carrier: 'Delhivery',
    estimatedDelivery: '24 July 2026',
    deliveryAddress: 'Flat 402, Sunshine Heights, MG Road, Bengaluru - 560001',
    timeline: [
      { step: 'Order Placed', time: '22 Jul, 11:00 AM', completed: true },
      { step: 'Packed', time: '22 Jul, 03:00 PM', completed: true },
      { step: 'Shipped', time: '23 Jul, 08:00 AM', completed: true },
      { step: 'Delivered', time: '24 Jul, 02:30 PM', completed: true }
    ],
    items: [
      { name: 'Solar Explorer Bot 7-in-1 DIY Kit', qty: 1, priceINR: 3499, img: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&q=80&w=300' },
      { name: 'Rainbow Wooden Stacker & Arch Set', qty: 1, priceINR: 1999, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    orderNumber: 'TJ-901104',
    date: '10 June 2026',
    status: 'Delivered',
    totalINR: 4299,
    trackingNumber: 'BD-771029',
    carrier: 'Blue Dart',
    estimatedDelivery: '12 June 2026',
    deliveryAddress: 'TechPark Tower B, Floor 6, Bengaluru - 560103',
    timeline: [
      { step: 'Order Placed', time: '10 Jun, 01:20 PM', completed: true },
      { step: 'Shipped', time: '11 Jun, 09:00 AM', completed: true },
      { step: 'Delivered', time: '12 Jun, 04:15 PM', completed: true }
    ],
    items: [
      { name: '3D Magnetic Castle Construction Tiles (100 Pcs)', qty: 1, priceINR: 4299, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=300' }
    ]
  }
];

