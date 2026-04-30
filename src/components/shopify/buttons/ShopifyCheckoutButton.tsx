import React from "react";
import { Button } from "@/components/ui/button";
import { useShopifyCheckout } from "@/components/shopify/hooks/useShopifyCheckout";
import { useShopifyCart } from "@/components/shopify/hooks/useShopifyCart";
import { Loader2, ShoppingCart, ExternalLink } from "lucide-react";

interface ShopifyCheckoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  openInNewTab?: boolean;
  children?: React.ReactNode;
  onCheckoutStart?: () => void;
}

export const ShopifyCheckoutButton: React.FC<ShopifyCheckoutButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  openInNewTab = false,
  children,
  onCheckoutStart,
}) => {
  const { cart, isLoadingCart } = useShopifyCart();
  const {
    checkoutUrl,
    isLoadingCheckout,
    isRedirecting,
    goToCheckout,
    openCheckoutInNewTab,
    hasCheckoutUrl,
    canCheckout,
  } = useShopifyCheckout({ cartId: cart?.id });

  const handleCheckout = () => {
    // Ejecutar callback personalizado si existe
    if (onCheckoutStart) {
      onCheckoutStart();
    }

    if (openInNewTab) {
      openCheckoutInNewTab();
    } else {
      goToCheckout();
    }
  };

  const isLoading = isLoadingCart || isLoadingCheckout || isRedirecting;
  const hasCart = !!cart?.id;
  const hasItems = cart?.lines?.edges && cart.lines.edges.length > 0;

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleCheckout}
      disabled={!hasCart || !hasItems || !canCheckout || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isLoadingCart
            ? "Cargando carrito..."
            : openInNewTab
            ? "Abriendo checkout..."
            : "Redirigiendo..."}
        </>
      ) : !hasCart ? (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Carrito no disponible
        </>
      ) : !hasItems ? (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Carrito vacío
        </>
      ) : (
        <>
          {openInNewTab ? (
            <ExternalLink className="mr-2 h-4 w-4" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          {children || (openInNewTab ? "Abrir Checkout" : "Ir al Checkout")}
        </>
      )}
    </Button>
  );
};
