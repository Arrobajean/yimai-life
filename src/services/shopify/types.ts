// Tipos de datos de Shopify
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    id: string;
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      title: string;
      handle: string;
      images: {
        edges: Array<{
          node: {
            id: string;
            url: string;
            altText: string;
          };
        }>;
      };
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
}

// Tipos para filtros y búsqueda
export interface ProductFilters {
  available?: boolean;
  price?: {
    min?: number;
    max?: number;
  };
  productType?: string[];
  vendor?: string[];
  tags?: string[];
}

import { ShopifySortKey } from "@/app/services/shopify/sort-keys";

export interface SortOptions {
  key: ShopifySortKey;
  reverse?: boolean;
}

export interface SearchFilters {
  query?: string;
  filters?: ProductFilters;
  sort?: SortOptions;
  first?: number;
  after?: string;
}

export interface AvailableFilters {
  tags: string[];
  productTypes: string[];
  vendors: string[];
  priceRange: {
    min: number;
    max: number;
  };
}
