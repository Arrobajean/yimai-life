import { useShopifyCart } from "./useShopifyCart";

interface UseShopifyCartUIProps {
  cartId?: string;
}

interface UseShopifyCartUIReturn {
  // Datos del carrito
  cart: unknown;
  isLoading: boolean;
  error: unknown;
  totalQuantity: number;
  totalAmount: unknown;
  subtotalAmount: unknown;
  cartLines: unknown[];

  // Funciones del carrito
  updateQuantity: (lineId: string, quantity: number) => Promise<any>;
  removeFromCart: (lineId: string) => Promise<any>;
  goToCheckout: () => void;

  // Estados de carga
  isUpdatingQuantity: boolean;
  isRemovingFromCart: boolean;
}

export const useShopifyCartUI = ({
  cartId,
}: UseShopifyCartUIProps = {}): UseShopifyCartUIReturn => {
  const {
    cart,
    isLoading,
    error,
    updateCartLineQuantity,
    removeFromCart,
    checkoutUrl,
    isUpdatingCart,
    isRemovingFromCart,
  } = useShopifyCart(cartId);

  // Calcular propiedades derivadas
  const cartLines = cart?.lines?.edges?.map((edge: unknown) => edge.node) || [];
  const totalQuantity =
          cartLines?.reduce((sum: number, line: unknown) => sum + line.quantity, 0) || 0;
  const totalAmount = cart?.cost?.totalAmount;
  const subtotalAmount = cart?.cost?.subtotalAmount;

  const goToCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
    }
  };

  return {
    // Datos del carrito
    cart,
    isLoading,
    error,
    totalQuantity,
    totalAmount,
    subtotalAmount,
    cartLines,

    // Funciones del carrito
    updateQuantity: updateCartLineQuantity,
    removeFromCart,
    goToCheckout,

    // Estados de carga
    isUpdatingQuantity: isUpdatingCart,
    isRemovingFromCart,
  };
};
