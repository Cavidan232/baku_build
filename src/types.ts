export type UnitType = 'kisə' | 'ədəd' | 'm²' | 'm³' | 'kq' | 'paçka' | 'metr' | 'litr' | 'tonna' | 'rulon';

export interface BulkPriceTier {
  minQty: number;
  discountPercent: number;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userRole?: string; // e.g. "Peşəkar Usta", "Tikinti Mühəndisi", "Fərdi Müştəri"
  rating: number;
  date: string;
  comment: string;
  isVerifiedBuyer: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number; // In AZN (₼)
  oldPrice?: number;
  unit: UnitType;
  weightKg?: number; // per unit weight for transport calculation
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  minOrder: number;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  tags: string[]; // e.g. "Ən çox satılan", "Zavod qiyməti", "Yeni", "Endirim", "Toplu sərfəli"
  bulkTiers?: BulkPriceTier[];
  isFeatured?: boolean;
  isDailyDeal?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  image: string;
  itemCount: number;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUnit: UnitType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'individual' | 'contractor' | 'company'; // Fərdi Alıcı, Usta/Podratçı, Şirkət/B2B
  companyName?: string;
  taxNumber?: string; // VÖEN
  addresses: Address[];
  bonusPoints: number;
  avatar?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  title: string; // e.g. "Ev", "Tikinti Obyekti - Mərdəkan", "Ofis"
  city: string; // Bakı, Sumqayıt, Xırdalan, Abşeron, Gəncə, digər
  district?: string;
  fullAddress: string;
  contactName: string;
  contactPhone: string;
  isDefault?: boolean;
  requiresCrane?: boolean; // Ağır yüklər üçün kran/manipulyator tələb olunurmu?
}

export type OrderStatus = 'Gözləyir' | 'Hazırlanır' | 'Yoldadır' | 'Təhvil verildi' | 'Ləğv edildi';
export type PaymentMethod = 'card_online' | 'cash_on_delivery' | 'card_on_delivery' | 'birkart_taksit' | 'bank_transfer';
export type DeliveryType = 'standard' | 'express_2h' | 'crane_truck' | 'pickup';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  unit: UnitType;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  totalWeightKg: number;
  status: OrderStatus;
  deliveryType: DeliveryType;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryNotes?: string;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  taksitMonth?: number;
  trackingUpdates: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  subcategory: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  tags: string[];
}

export type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'discount' | 'name';

export type ActiveTab = 'catalog' | 'deals' | 'calculator' | 'b2b' | 'about' | 'contact' | 'orders';
