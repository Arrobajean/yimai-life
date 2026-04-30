import { useMutation, useQuery } from "@tanstack/react-query";
import { shopifyQuery, GET_CHECKOUT_URL_QUERY } from "@/services/shopify";
import { toast } from "sonner";
import {
  logCartPermalinkInfo,
  isValidCartPermalink,
} from "@/utils/shopify-cart-permalinks";

interface UseShopifyCheckoutProps {
  cartId?: string;
}

interface CheckoutData {
  cart: {
    id: string;
    checkoutUrl: string;
    lines: {
      edges: Array<{
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            priceV2: {
              amount: string;
              currencyCode: string;
            };
            product: {
              title: string;
              handle: string;
              images: {
                edges: Array<{
                  node: {
                    url: string;
                    altText: string;
                  };
                }>;
              };
            };
          };
        };
      }>;
    };
    cost: {
      subtotalAmount: {
        amount: string;
        currencyCode: string;
      };
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  };
}

export const useShopifyCheckout = ({
  cartId,
}: UseShopifyCheckoutProps = {}) => {
  // Query para obtener la URL de checkout
  const {
    data: checkoutData,
    isLoading: isLoadingCheckout,
    error: checkoutError,
    refetch: refetchCheckout,
  } = useQuery<CheckoutData>({
    queryKey: ["shopify-checkout", cartId],
    queryFn: async () => {
      if (!cartId) {
        throw new Error("Cart ID is required");
      }
      const result = await shopifyQuery(GET_CHECKOUT_URL_QUERY, { cartId });
      return result as CheckoutData;
    },
    enabled: !!cartId && cartId !== undefined,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutación para redirigir al checkout
  const redirectToCheckoutMutation = useMutation({
    mutationFn: async (checkoutUrl: string) => {
      // Verificar si la URL es válida
      if (!checkoutUrl.startsWith("http")) {
        throw new Error(
          "Invalid checkout URL - Cart Permalinks should be absolute URLs"
        );
      }

      // Redirigir al checkout de Shopify
      window.location.href = checkoutUrl;
      return { success: true };
    },
    onSuccess: () => {
      toast.success("🛒 Redirigiendo al checkout de Shopify", {
        description: "Serás redirigido a la página de pago segura",
      });
    },
    onError: (error) => {
      console.error("Error redirecting to checkout:", error);
      toast.error("❌ Error al redirigir al checkout", {
        description: "Intenta nuevamente",
      });
    },
  });

  // Función para validar y corregir URL de checkout
  const validateCheckoutUrl = (url: string): string => {
    // Log cart permalink information for debugging
    logCartPermalinkInfo(url);

    // Los Cart Permalinks de Shopify ya vienen con el dominio correcto
    // Solo necesitamos verificar que sea una URL válida
    if (!url.startsWith("http")) {
      console.warn(
        "🛒 useShopifyCheckout - Received relative URL, this shouldn't happen with Cart Permalinks"
      );

      // Fallback: si por alguna razón recibimos URL relativa
      if (url.startsWith("/cart/c/")) {
        // Usar el dominio configurado en Shopify
        const shopifyDomain =
          import.meta.env.VITE_SHOPIFY_STORE_DOMAIN ||
          "jrve0v-kh.myshopify.com";
        const correctedUrl = `https://${shopifyDomain}${url}`;
        return correctedUrl;
      }
    }

    // Verify it's a valid cart permalink
    if (!isValidCartPermalink(url)) {
      // URL doesn't match cart permalink format
    }

    return url;
  };

  // Función para ir al checkout
  const goToCheckout = async () => {
    if (!checkoutData?.cart?.checkoutUrl) {
      toast.error("❌ No hay productos en el carrito", {
        description: "Agrega productos antes de proceder al checkout",
      });
      return;
    }

    const validatedUrl = validateCheckoutUrl(checkoutData.cart.checkoutUrl);
    await redirectToCheckoutMutation.mutateAsync(validatedUrl);
  };

  // Función para abrir checkout en nueva pestaña
  const openCheckoutInNewTab = () => {
    if (!checkoutData?.cart?.checkoutUrl) {
      toast.error("❌ No hay productos en el carrito", {
        description: "Agrega productos antes de proceder al checkout",
      });
      return;
    }

    const validatedUrl = validateCheckoutUrl(checkoutData.cart.checkoutUrl);
    window.open(validatedUrl, "_blank");
    toast.success("🛒 Checkout abierto en nueva pestaña", {
      description: "Completa tu compra en la nueva ventana",
    });
  };

  return {
    // Data
    checkoutUrl: checkoutData?.cart?.checkoutUrl,
    cart: checkoutData?.cart,

    // Loading states
    isLoadingCheckout,
    isRedirecting: redirectToCheckoutMutation.isPending,

    // Errors
    checkoutError,
    redirectError: redirectToCheckoutMutation.error,

    // Actions
    goToCheckout,
    openCheckoutInNewTab,
    refetchCheckout,

    // Utils
    hasCheckoutUrl: !!checkoutData?.cart?.checkoutUrl,
    canCheckout:
      !!checkoutData?.cart?.checkoutUrl &&
      !redirectToCheckoutMutation.isPending,
  };
};
