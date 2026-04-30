import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  shopifyQuery,
  PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
  FILTERED_PRODUCTS_QUERY,
  GET_AVAILABLE_FILTERS_QUERY,
  PRODUCTS_BY_TYPE_QUERY,
  type ShopifyProduct,
  type SearchFilters,
  type AvailableFilters,
} from "@/services/shopify";
import {
  isValidSortKey,
  getDefaultSortKey,
} from "@/services/shopify/sort-keys";

// Función para obtener palabras clave específicas de cada categoría
const getCategoryKeywords = (productType: string): string[] => {
  const keywordsMap: Record<string, string[]> = {
    Electronics: [
      "electronic",
      "device",
      "tech",
      "technology",
      "digital",
      "smart",
      "phone",
      "computer",
      "laptop",
      "tablet",
    ],
    "Home & Garden": [
      "home",
      "garden",
      "household",
      "kitchen",
      "bathroom",
      "bedroom",
      "living",
      "outdoor",
      "garden",
      "lawn",
      "decor",
    ],
    "Toys & Games": [
      "toy",
      "game",
      "play",
      "fun",
      "entertainment",
      "children",
      "kids",
      "educational",
      "puzzle",
      "board",
    ],
    "Personal Care": [
      "personal",
      "care",
      "beauty",
      "health",
      "hygiene",
      "skincare",
      "haircare",
      "cosmetic",
      "wellness",
    ],
    "Baby & Kids": [
      "baby",
      "kids",
      "children",
      "infant",
      "toddler",
      "nursery",
      "diaper",
      "feeding",
      "safety",
    ],
    "Eco-Friendly": [
      "eco",
      "friendly",
      "sustainable",
      "green",
      "environmental",
      "organic",
      "natural",
      "biodegradable",
      "recycled",
    ],
  };

  return keywordsMap[productType] || [];
};

// Tipos para la respuesta de búsqueda
interface SearchResponse {
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

interface FilteredResponse {
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

interface AvailableFiltersResponse {
  products: {
    edges: Array<{
      node: {
        tags: string[];
        productType: string;
        vendor: string;
        priceRange: {
          minVariantPrice: {
            amount: string;
          };
          maxVariantPrice: {
            amount: string;
          };
        };
      };
    }>;
  };
}

interface UseShopifySearchReturn {
  products: ShopifyProduct[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalResults: number;
  search: (filters: SearchFilters) => void;
  loadMore: () => void;
  clearSearch: () => void;
  availableFilters: AvailableFilters | null;
  loadingFilters: boolean;
}

export const useShopifySearch = (
  initialFilters: SearchFilters = {}
): UseShopifySearchReturn => {
  const [filters, setFilters] = useState<SearchFilters>({
    first: 20,
    ...initialFilters,
  });
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  });

  // Query para obtener filtros disponibles
  const { data: availableFiltersData, isLoading: loadingFilters } = useQuery({
    queryKey: ["shopify-available-filters"],
    queryFn: async () => {
      const data = await shopifyQuery<AvailableFiltersResponse>(
        GET_AVAILABLE_FILTERS_QUERY
      );
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  // Procesar filtros disponibles
  const availableFilters = useMemo(() => {
    if (!availableFiltersData?.products?.edges) return null;

    const allTags = new Set<string>();
    const allProductTypes = new Set<string>();
    const allVendors = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;

    availableFiltersData.products.edges.forEach(({ node }) => {
      // Tags
      node.tags.forEach((tag) => allTags.add(tag));

      // Product types
      if (node.productType) allProductTypes.add(node.productType);

      // Vendors
      if (node.vendor) allVendors.add(node.vendor);

      // Price range
      const minVariantPrice = parseFloat(
        node.priceRange.minVariantPrice.amount
      );
      const maxVariantPrice = parseFloat(
        node.priceRange.maxVariantPrice.amount
      );

      if (minVariantPrice < minPrice) minPrice = minVariantPrice;
      if (maxVariantPrice > maxPrice) maxPrice = maxVariantPrice;
    });

    // Log para debug de productTypes disponibles (solo una vez)
    if (!(window as any)._hasLoggedProductTypes) {
      (window as any)._hasLoggedProductTypes = true;
    }

    return {
      tags: Array.from(allTags).sort(),
      productTypes: Array.from(allProductTypes).sort(),
      vendors: Array.from(allVendors).sort(),
      priceRange: {
        min: minPrice === Infinity ? 0 : minPrice,
        max: maxPrice,
      },
    };
  }, [availableFiltersData]);

  // Query para búsqueda/filtros
  const {
    data: searchData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shopify-search", filters],
    queryFn: async () => {
      const {
        query,
        filters: productFilters,
        sort,
        first = 20,
        after,
      } = filters;

      // Determinar qué query usar basado en los parámetros
      if (
        query ||
        (productFilters && Object.keys(productFilters).length > 0) ||
        sort
      ) {
        // Hay query, filtros o ordenamiento, usar la query de búsqueda
        let searchQuery = query || "";

        // Agregar filtros básicos a la query de texto
        if (productFilters) {
          const filterParts: string[] = [];

          if (productFilters.available === true) {
            filterParts.push("available:true");
          } else if (productFilters.available === false) {
            filterParts.push("available:false");
          }

          if (
            productFilters.price?.min !== undefined ||
            productFilters.price?.max !== undefined
          ) {
            if (
              productFilters.price.min !== undefined &&
              productFilters.price.max !== undefined
            ) {
              filterParts.push(
                `variants.price:>=${productFilters.price.min} variants.price:<=${productFilters.price.max}`
              );
            } else if (productFilters.price.min !== undefined) {
              filterParts.push(`variants.price:>=${productFilters.price.min}`);
            } else if (productFilters.price.max !== undefined) {
              filterParts.push(`variants.price:<=${productFilters.price.max}`);
            }
          }

          if (productFilters.productType?.length) {
            // Según la documentación de Shopify, SÍ existe el filtro product_type:
            const productType = productFilters.productType[0];

            // Usar el filtro product_type con comillas para manejar espacios
            const typeQuery = `product_type:"${productType}"`;
            filterParts.push(typeQuery);

            // Log para debug (solo una vez)
            if (!(window as any)._hasLoggedCategoryFilter) {
              (window as any)._hasLoggedCategoryFilter = true;
            }
          }

          if (productFilters.vendor?.length) {
            filterParts.push(`vendor:${productFilters.vendor[0]}`);
          }

          if (filterParts.length > 0) {
            searchQuery = searchQuery
              ? `${searchQuery} ${filterParts.join(" ")}`
              : filterParts.join(" ");
          }
        }

        // Solo enviar query si hay contenido, de lo contrario usar undefined
        const finalQuery = searchQuery.trim() || undefined;

        // Validar y limpiar el sortKey antes de enviarlo
        const validatedSortKey =
          sort?.key && isValidSortKey(sort.key)
            ? sort.key
            : getDefaultSortKey();

        // Log para debug de la query final (solo una vez)
        if (!(window as any)._hasLoggedFinalQuery) {
          (window as any)._hasLoggedFinalQuery = true;
        }

        return await shopifyQuery<FilteredResponse>(FILTERED_PRODUCTS_QUERY, {
          first,
          after,
          sortKey: validatedSortKey,
          reverse: sort?.reverse,
          query: finalQuery,
        });
      } else {
        // Cargar todos los productos por defecto (sin ordenamiento)
        return await shopifyQuery<SearchResponse>(PRODUCTS_QUERY, {
          first,
          after,
          query: undefined, // Sin filtros para obtener todos los productos
        });
      }
    },
    enabled: true, // Siempre ejecutar
  });

  // Actualizar productos cuando cambian los datos
  useEffect(() => {
    if (searchData?.products) {
      const newProducts = searchData.products.edges.map((edge) => edge.node);

      // Log para debug de productos devueltos (solo una vez)
      if (newProducts?.length > 0 && !(window as any)._hasLoggedProducts) {
        (window as any)._hasLoggedProducts = true;
      }

      if (filters.after) {
        // Cargar más productos
        setProducts((prev) => [...prev, ...newProducts]);
      } else {
        // Nueva búsqueda
        setProducts(newProducts);
      }

      setPageInfo(searchData.products.pageInfo);
    }
  }, [searchData, filters.after]);

  // Función para realizar búsqueda
  const search = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    // Ejecutar la query manualmente
    refetch();
  };

  // Función para cargar más productos
  const loadMore = () => {
    if (pageInfo.hasNextPage) {
      setFilters((prev) => ({
        ...prev,
        after: pageInfo.endCursor,
      }));
    }
  };

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setFilters(initialFilters);
    setProducts([]);
    setPageInfo({
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: "",
      endCursor: "",
    });
  };

  return {
    products,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    hasNextPage: pageInfo.hasNextPage,
    hasPreviousPage: pageInfo.hasPreviousPage,
    totalResults: products?.length || 0,
    search,
    loadMore,
    clearSearch,
    availableFilters,
    loadingFilters,
  };
};
