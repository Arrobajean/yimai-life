/**
 * CartProvider – implementación local/mock
 * Funciona sin conexión a Shopify. Los productos se almacenan en memoria.
 * Cuando se conecte Shopify, este provider puede intercambiarse con uno real.
 */
import React, { createContext, useContext, useState } from "react";
import { Product, Cart, CartItem } from "@/types/product";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

const calcTotals = (
  items: CartItem[]
): Pick<Cart, "totalItems" | "totalPrice" | "totalTaxAmount"> => ({
  totalItems: items.reduce((s, i) => s + i.quantity, 0),
  totalPrice: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
  totalTaxAmount: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const cart: Cart = { items, ...calcTotals(items) };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemCount: () => cart.totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
