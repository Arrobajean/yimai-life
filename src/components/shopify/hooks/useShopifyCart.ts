import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  shopifyQuery,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_LINE_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from "@/services/shopify";
import { useIsMobile } from "@/hooks/use-mobile";

interface UseShopifyCartProps {
  cartId?: string;
}

export const useShopifyCart = ({ cartId }: UseShopifyCartProps = {}) => {
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const getCartIdFromStorage = () => localStorage.getItem("shopify-cart-id");
  const actualCartId = cartId || getCartIdFromStorage();

  const {
    data: cartData,
    isLoading: isLoadingCart,
    error: cartError,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["shopify-cart", actualCartId],
    queryFn: async () => {
      if (!actualCartId) return null;
      return shopifyQuery<{ cart: unknown }>(GET_CART_QUERY, { cartId: actualCartId });
    },
    enabled: !!actualCartId,
    staleTime: 5 * 60 * 1000,
  });

  const createCartMutation = useMutation({
    mutationFn: async (lines?: Array<{ merchandiseId: string; quantity: number }>) => {
      return shopifyQuery<{ cartCreate: { cart: { id: string } } }>(
        CREATE_CART_MUTATION,
        { input: { lines: lines || [] } }
      );
    },
    onSuccess: (data) => {
      const newCartId = data.cartCreate?.cart?.id;
      if (newCartId) {
        localStorage.setItem("shopify-cart-id", newCartId);
        queryClient.invalidateQueries({ queryKey: ["shopify-cart"] });
        if (!isMobile) toast.success("Carrito creado");
      }
    },
    onError: (error) => {
      console.error("Error creating cart:", error);
      toast.error("Error al crear el carrito");
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({
      cartId,
      merchandiseId,
      quantity = 1,
    }: {
      cartId: string;
      merchandiseId: string;
      quantity?: number;
    }) => {
      return shopifyQuery(ADD_TO_CART_MUTATION, {
        cartId,
        lines: [{ merchandiseId, quantity }],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopify-cart"] });
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      toast.error("Error al agregar al carrito");
    },
  });

  const updateCartLineMutation = useMutation({
    mutationFn: async ({
      cartId,
      lineId,
      quantity,
    }: {
      cartId: string;
      lineId: string;
      quantity: number;
    }) => {
      return shopifyQuery(UPDATE_CART_LINE_MUTATION, {
        cartId,
        lines: [{ id: lineId, quantity }],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopify-cart"], exact: false });
    },
    onError: (error) => {
      console.error("Error updating cart line:", error);
      toast.error("Error al actualizar el carrito");
    },
    retry: 1,
    retryDelay: 1000,
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async ({ cartId, lineId }: { cartId: string; lineId: string }) => {
      return shopifyQuery(REMOVE_FROM_CART_MUTATION, { cartId, lineIds: [lineId] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopify-cart"], exact: false });
    },
    onError: () => {
      toast.error("Error al remover del carrito");
    },
    retry: 1,
    retryDelay: 1000,
  });

  const createCart = async (lines?: Array<{ merchandiseId: string; quantity: number }>) => {
    return createCartMutation.mutateAsync(lines);
  };

  const addToCart = async (merchandiseId: string, quantity: number = 1) => {
    if (!actualCartId) {
      return createCart([{ merchandiseId, quantity }]);
    }
    return addToCartMutation.mutateAsync({ cartId: actualCartId, merchandiseId, quantity });
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!actualCartId) return;
    if (quantity <= 0) return removeFromCart(lineId);
    return updateCartLineMutation.mutateAsync({ cartId: actualCartId, lineId, quantity });
  };

  const removeFromCart = async (lineId: string) => {
    if (!actualCartId) return;
    return removeFromCartMutation.mutateAsync({ cartId: actualCartId, lineId });
  };

  const clearCart = async () => {
    if (!actualCartId || !cartData?.cart?.lines?.edges) return;
    const lineIds = cartData.cart.lines.edges.map((edge) => edge.node.id);
    for (const lineId of lineIds) {
      await removeFromCart(lineId);
    }
  };

  const setCartId = (id: string) => {
    localStorage.setItem("shopify-cart-id", id);
    queryClient.invalidateQueries({ queryKey: ["shopify-cart"] });
  };

  const removeCartId = () => {
    localStorage.removeItem("shopify-cart-id");
    queryClient.invalidateQueries({ queryKey: ["shopify-cart"] });
  };

  return {
    cart: cartData?.cart,
    cartId: actualCartId,
    isLoadingCart,
    isCreatingCart: createCartMutation.isPending,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartLineMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    cartError,
    createCartError: createCartMutation.error,
    addToCartError: addToCartMutation.error,
    updateCartError: updateCartLineMutation.error,
    removeFromCartError: removeFromCartMutation.error,
    createCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetchCart,
    setCartId,
    removeCartId,
    hasItems: (cartData?.cart?.lines?.edges?.length || 0) > 0,
    itemCount:
      cartData?.cart?.lines?.edges?.reduce(
        (total, edge) => total + edge.node.quantity,
        0
      ) || 0,
    totalAmount: cartData?.cart?.cost?.totalAmount,
    subtotalAmount: cartData?.cart?.cost?.subtotalAmount,
    totalTaxAmount: cartData?.cart?.cost?.totalTaxAmount,
    checkoutUrl: cartData?.cart?.checkoutUrl,
  };
};
