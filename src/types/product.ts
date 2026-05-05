export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  image: string;
  images?: string[];
  brand?: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  stockQuantity?: number;
  specifications?: Record<string, string>;
  features?: string[];
  tags?: string[];
  sku?: string;
  boxUnits?: string;
  variants?: string[];
  variant?: {
    id: string;
    title: string;
    price: number;
    image?: string | null;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalTaxAmount: number;
}
