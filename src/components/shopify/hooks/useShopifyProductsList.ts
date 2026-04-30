import { useState, useEffect } from "react";
import {
  shopifyQuery,
  PRODUCTS_QUERY,
  type ShopifyProduct,
} from "@/services/shopify";

// Tipo para la respuesta de la query de productos
interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

interface UseShopifyProductsListReturn {
  products: ShopifyProduct[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useShopifyProductsList = (
  options: { first?: number } = {}
): UseShopifyProductsListReturn => {
  const { first = 20 } = options;
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await shopifyQuery<ProductsResponse>(PRODUCTS_QUERY, {
        first,
        query: undefined, // Sin filtros para obtener todos los productos
      });

      if (data.products?.edges) {
        const shopifyProducts = data.products.edges.map((edge) => edge.node);
        setProducts(shopifyProducts);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching Shopify products:", err);
      setError(
        err instanceof Error ? err.message : "Error al cargar productos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [first]);

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refetch,
  };
};
