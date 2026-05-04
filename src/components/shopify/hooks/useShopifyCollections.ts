import { useQuery } from "@tanstack/react-query";
import {
  shopifyQuery,
  COLLECTIONS_QUERY,
} from "@/services/shopify";

interface CollectionItem {
  id: string;
  title: string;
  handle: string;
}

interface CollectionsResponse {
  collections: {
    edges: Array<{ node: CollectionItem }>;
  };
}

interface UseShopifyCollectionsReturn {
  collections: CollectionItem[];
  loading: boolean;
  error: string | null;
}

export const useShopifyCollections = (
  options: { first?: number } = {}
): UseShopifyCollectionsReturn => {
  const { first = 20 } = options;

  const { data, isLoading, error } = useQuery({
    queryKey: ["shopify-collections", first],
    queryFn: () =>
      shopifyQuery<CollectionsResponse>(COLLECTIONS_QUERY, { first }),
    staleTime: 10 * 60 * 1000,
  });

  return {
    collections: data?.collections?.edges?.map((e) => e.node) ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
};
