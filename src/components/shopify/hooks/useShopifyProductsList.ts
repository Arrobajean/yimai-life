import { useQuery } from "@tanstack/react-query";
import {
  shopifyQuery,
  PRODUCTS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  type ShopifyProduct,
} from "@/services/shopify";

interface ProductsResponse {
  products: { edges: Array<{ node: ShopifyProduct }> };
}

interface CollectionProductsResponse {
  collection: {
    products: { edges: Array<{ node: ShopifyProduct }> };
  } | null;
}

interface UseShopifyProductsListReturn {
  products: ShopifyProduct[];
  loading: boolean;
  error: string | null;
}

export const useShopifyProductsList = (
  options: { first?: number; collectionHandle?: string | null } = {}
): UseShopifyProductsListReturn => {
  const { first = 24, collectionHandle } = options;

  const allProductsQuery = useQuery({
    queryKey: ["shopify-products", first],
    queryFn: () =>
      shopifyQuery<ProductsResponse>(PRODUCTS_QUERY, { first, query: undefined }),
    enabled: !collectionHandle,
    staleTime: 5 * 60 * 1000,
  });

  const collectionQuery = useQuery({
    queryKey: ["shopify-collection-products", collectionHandle, first],
    queryFn: () =>
      shopifyQuery<CollectionProductsResponse>(COLLECTION_BY_HANDLE_QUERY, {
        handle: collectionHandle,
        first,
      }),
    enabled: !!collectionHandle,
    staleTime: 5 * 60 * 1000,
  });

  if (collectionHandle) {
    return {
      products:
        collectionQuery.data?.collection?.products?.edges?.map((e) => e.node) ??
        [],
      loading: collectionQuery.isLoading,
      error: collectionQuery.error
        ? (collectionQuery.error as Error).message
        : null,
    };
  }

  return {
    products:
      allProductsQuery.data?.products?.edges?.map((e) => e.node) ?? [],
    loading: allProductsQuery.isLoading,
    error: allProductsQuery.error
      ? (allProductsQuery.error as Error).message
      : null,
  };
};
