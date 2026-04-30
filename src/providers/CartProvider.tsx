import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Cart, CartItem } from "@/types/product";
import { useShopifyCart } from "@/components/shopify/hooks/useShopifyCart";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    totalTaxAmount: 0,
  });

  const shopifyCart = useShopifyCart();

  const calculateTotals = (
    items: CartItem[]
  ): Pick<Cart, "totalItems" | "totalPrice" | "totalTaxAmount"> => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const totalTaxAmount = shopifyCart.totalTaxAmount
      ? parseFloat(shopifyCart.totalTaxAmount.amount)
      : 0;

    return { totalItems, totalPrice, totalTaxAmount };
  };

  useEffect(() => {
    if (shopifyCart.cart?.lines?.edges) {
      const shopifyItems: CartItem[] = shopifyCart.cart.lines.edges.map(
        (edge) => {
          const line = edge.node;
          const product = line.merchandise.product;

          const variantImage =
            line.merchandise.image?.url ||
            product.images?.edges?.[0]?.node?.url ||
            "";

          const cleanProductTitle = (title: string) => {
            if (!title || title === "Default Title" || title.trim() === "") {
              return product.productType || "Producto";
            }
            return title;
          };

          return {
            product: {
              id: line.merchandise.id,
              title: cleanProductTitle(product.title),
              price: parseFloat(line.merchandise.priceV2?.amount || "0"),
              description: product.description || "",
              image: variantImage,
              category: product.productType || "",
              inStock: line.merchandise.availableForSale || false,
              variant: {
                id: line.merchandise.id,
                title: line.merchandise.title,
                price: parseFloat(line.merchandise.priceV2?.amount || "0"),
                image: line.merchandise.image?.url || null,
              },
            },
            quantity: line.quantity,
          };
        }
      );

      const totals = calculateTotals(shopifyItems);
      setCart({ items: shopifyItems, ...totals });
    }
  }, [shopifyCart.cart]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      await shopifyCart.addToCart(product.id, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (variantId: string) => {
    const itemToRemove = cart.items.find(
      (item) => item.product.id === variantId
    );
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.product.id !== variantId
      );
      return { ...prevCart, items: updatedItems, ...calculateTotals(updatedItems) };
    });

    if (shopifyCart.cart?.lines?.edges) {
      const line = shopifyCart.cart.lines.edges.find(
        (edge) => edge.node.merchandise.id === variantId
      );
      if (line) {
        try {
          await shopifyCart.removeFromCart(line.node.id);
        } catch (error) {
          console.error("Error removing from cart:", error);
          if (itemToRemove) {
            setCart((prevCart) => {
              const updatedItems = [...prevCart.items, itemToRemove];
              return { ...prevCart, items: updatedItems, ...calculateTotals(updatedItems) };
            });
          }
        }
      }
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(variantId);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.product.id === variantId ? { ...item, quantity } : item
      );
      return { ...prevCart, items: updatedItems, ...calculateTotals(updatedItems) };
    });

    if (shopifyCart.cart?.lines?.edges) {
      const line = shopifyCart.cart.lines.edges.find(
        (edge) => edge.node.merchandise.id === variantId
      );
      if (line) {
        try {
          await shopifyCart.updateQuantity(line.node.id, quantity);
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      }
    }
  };

  const clearCart = async () => {
    try {
      await shopifyCart.clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getCartItemCount = () => cart.totalItems;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
