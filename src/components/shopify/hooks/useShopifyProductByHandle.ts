import { useState, useEffect } from "react";
import {
  shopifyQuery,
  PRODUCT_BY_HANDLE_QUERY,
  type ShopifyProduct,
} from "@/services/shopify";

// Tipo para la respuesta de la query de producto individual
interface ProductResponse {
  product: ShopifyProduct;
}

interface UseShopifyProductByHandleReturn {
  product: ShopifyProduct | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useShopifyProductByHandle = (
  handle: string
): UseShopifyProductByHandleReturn => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!handle) {
      setProduct(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await shopifyQuery<ProductResponse>(
        PRODUCT_BY_HANDLE_QUERY,
        {
          handle,
        }
      );

      if (data.product) {
        setProduct(data.product);
      } else {
        setProduct(null);
      }
    } catch (err) {
      console.error("Error fetching Shopify product:", err);
      setError(
        err instanceof Error ? err.message : "Error al cargar el producto"
      );
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [handle]);

  const refetch = () => {
    fetchProduct();
  };

  return {
    product,
    loading,
    error,
    refetch,
  };
};
