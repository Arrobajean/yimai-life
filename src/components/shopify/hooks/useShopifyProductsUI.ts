import { useShopifyProductsList } from "./useShopifyProductsList";
import { useShopifyCart } from "./useShopifyCart";
import { useNotifications } from "@/hooks/useNotifications";
import { useIsMobile } from "@/hooks";

interface UseShopifyProductsUIProps {
  limit?: number;
}

interface UseShopifyProductsUIReturn {
  // Datos de productos
  products: unknown[];
  loading: boolean;
  error: string | null;

  // Funciones de productos
  handleAddToCart: (variantId: string, productTitle: string) => Promise<void>;
  handleViewProduct: (productHandle: string) => void;

  // Estados de carga
  isAddingToCart: boolean;
}

export const useShopifyProductsUI = ({
  limit = 20,
}: UseShopifyProductsUIProps = {}): UseShopifyProductsUIReturn => {
  const { products, loading, error } = useShopifyProductsList({ first: limit });
  const { addToCart, isAddingToCart } = useShopifyCart();
  const { showSuccess, showError } = useNotifications();
  const isMobile = useIsMobile();

  const handleAddToCart = async (variantId: string, productTitle: string) => {
    try {
      await addToCart(variantId, 1);
      // Solo mostrar notificación en desktop, no en móvil
      if (!isMobile) {
        showSuccess(
          "Producto agregado",
          `${productTitle} se ha agregado al carrito`
        );
      }
    } catch (error) {
      showError("Error", "Error al agregar al carrito");
      console.error("Error adding to cart:", error);
    }
  };

  const handleViewProduct = (productHandle: string) => {
    // Esta función puede ser implementada según las necesidades
    // Por ejemplo, navegar a la página del producto
    window.location.href = `/product/${productHandle}`;
  };

  return {
    // Datos de productos
    products,
    loading,
    error,

    // Funciones de productos
    handleAddToCart,
    handleViewProduct,

    // Estados de carga
    isAddingToCart,
  };
};
