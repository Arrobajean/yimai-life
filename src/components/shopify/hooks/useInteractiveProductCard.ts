import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShopifyProduct } from "../types/ShopifyProduct";

export const useInteractiveProductCard = (product: ShopifyProduct) => {
  const [isClicked, setIsClicked] = useState(false);
  const { addToCart, removeFromCart } = useCart();
  const isMobile = useIsMobile();

  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const isAvailable = product.availableForSale && firstVariant?.availableForSale;

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: price.currencyCode,
    }).format(amount);
  };

  const handleAddToCart = async () => {
    if (!isAvailable || !firstVariant) return;
    setIsClicked(true);
    try {
      await addToCart(
        {
          id: firstVariant.id,
          title: product.title,
          price: parseFloat(firstVariant.price.amount),
          image: firstImage?.url || "",
          description: product.description || "",
          category: product.productType || "",
          inStock: firstVariant.availableForSale || false,
        },
        1
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      setIsClicked(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!firstVariant) return;
    setIsClicked(false);
    try {
      await removeFromCart(firstVariant.id);
    } catch (error) {
      console.error("Error removing from cart:", error);
      setIsClicked(true);
    }
  };

  return {
    isClicked,
    firstImage,
    firstVariant,
    isAvailable,
    formatPrice,
    handleAddToCart,
    handleRemoveFromCart,
  };
};
