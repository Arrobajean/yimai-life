import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  shopifyQuery,
  COLLECTION_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
  type ShopifyProduct,
} from "@/services/shopify";

interface UseShopifyCollectionsReturn {
  products: ShopifyProduct[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalResults: number;
  searchByCollection: (
    collectionHandle: string,
    options?: { first?: number; sort?: unknown }
  ) => void;
  loadMore: () => void;
  clearSearch: () => void;
  currentCollection: string | null;
}

interface CollectionResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
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
  };
}

interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        productsCount: number;
      };
    }>;
  };
}

export const useShopifyCollections = (): UseShopifyCollectionsReturn => {
  const [currentCollection, setCurrentCollection] = useState<string | null>(
    null
  );
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  });
  const [searchOptions, setSearchOptions] = useState({
    first: 20,
    after: undefined as string | undefined,
    sort: { key: "BEST_SELLING" as const },
  });

  // Query para buscar productos por colección
  const {
    data: searchData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shopify-collection", currentCollection, searchOptions],
    queryFn: async () => {
      if (!currentCollection) return null;

      return await shopifyQuery<CollectionResponse>(
        COLLECTION_BY_HANDLE_QUERY,
        {
          handle: currentCollection,
          first: searchOptions.first,
          after: searchOptions.after,
        }
      );
    },
    enabled: !!currentCollection,
  });

  // Query para obtener todas las colecciones disponibles
  const { data: allCollectionsData } = useQuery({
    queryKey: ["shopify-all-collections"],
    queryFn: async () => {
      const data = await shopifyQuery<CollectionsResponse>(COLLECTIONS_QUERY, {
        first: 50,
      });
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  // Actualizar productos cuando cambian los datos
  useEffect(() => {
    if (searchData?.collection?.products) {
      const newProducts = searchData.collection.products.edges.map(
        (edge) => edge.node
      );

      if (searchOptions.after) {
        // Cargar más productos
        setProducts((prev) => [...prev, ...newProducts]);
      } else {
        // Nueva búsqueda
        setProducts(newProducts);
      }

      setPageInfo(searchData.collection.products.pageInfo);
    }
  }, [searchData, currentCollection, searchOptions.after]);

  // Función para buscar por colección (memoizada)
  const searchByCollection = useCallback(
    (collectionHandle: string, options?: { first?: number; sort?: unknown }) => {
      setCurrentCollection(collectionHandle);
      if (options) {
        setSearchOptions((prev) => ({ ...prev, ...options }));
      }
    },
    []
  );

  // Función para cargar más productos (memoizada)
  const loadMore = useCallback(() => {
    if (pageInfo.hasNextPage) {
      setSearchOptions((prev) => ({
        ...prev,
        after: pageInfo.endCursor,
      }));
    }
  }, [pageInfo.hasNextPage, pageInfo.endCursor]);

  // Función para limpiar búsqueda (memoizada)
  const clearSearch = useCallback(() => {
    setCurrentCollection(null);
    setProducts([]);
    setPageInfo({
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: "",
      endCursor: "",
    });
  }, []);

  return {
    products,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    hasNextPage: pageInfo.hasNextPage,
    hasPreviousPage: pageInfo.hasPreviousPage,
    totalResults: products?.length || 0,
    searchByCollection,
    loadMore,
    clearSearch,
    currentCollection,
  };
};
