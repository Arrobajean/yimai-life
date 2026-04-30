import React from "react";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShopifyCheckoutButton } from "../buttons/ShopifyCheckoutButton";
import { useShopifyCartUI } from "../hooks";

interface CartUIProps {
  className?: string;
  showHeader?: boolean;
  showCheckoutButton?: boolean;
  onClose?: () => void;
}

export function CartUI({
  className = "",
  showHeader = true,
  showCheckoutButton = true,
  onClose,
}: CartUIProps) {
  const {
    // Datos del carrito
    cart,
    isLoading,
    error,
    totalQuantity,
    totalAmount,
    subtotalAmount,
    cartLines,

    // Funciones del carrito
    updateQuantity,
    removeFromCart,
    goToCheckout,

    // Estados de carga
    isUpdatingQuantity,
    isRemovingFromCart,
  } = useShopifyCartUI();

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: price.currencyCode,
    }).format(amount);
  };

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(lineId);
    } else {
      await updateQuantity(lineId, newQuantity);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    await removeFromCart(lineId);
  };

  if (isLoading) {
    return (
      <Card
        className={`w-full max-w-md dark:bg-[hsl(210,8%,12%)] dark:border-[hsl(210,8%,22%)] theme-transition ${className}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-[hsl(75,60%,92%)]">
            <ShoppingCart className="h-5 w-5" />
            Carrito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-3 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        className={`w-full max-w-md dark:bg-[hsl(210,8%,12%)] dark:border-[hsl(210,8%,22%)] theme-transition ${className}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-[hsl(75,60%,92%)]">
            <ShoppingCart className="h-5 w-5" />
            Carrito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">Error al cargar el carrito</p>
            <p className="text-muted-foreground">Intenta recargar la página</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!cart || !cartLines || cartLines.length === 0) {
    return (
      <Card
        className={`w-full max-w-md dark:bg-[hsl(210,8%,12%)] dark:border-[hsl(210,8%,22%)] theme-transition ${className}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-[hsl(75,60%,92%)]">
            <ShoppingCart className="h-5 w-5" />
            Carrito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Tu carrito está vacío</p>
            <Button onClick={onClose} variant="outline">
              Continuar comprando
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`w-full max-w-md dark:bg-[hsl(210,8%,12%)] dark:border-[hsl(210,8%,22%)] theme-transition ${className}`}
    >
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-[hsl(75,60%,92%)]">
            <ShoppingCart className="h-5 w-5" />
            Carrito ({totalQuantity})
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="space-y-4">
        {/* Lista de productos */}
        <div className="space-y-3">
          {cartLines.map((line) => (
            <div key={line.id} className="flex gap-3">
              {/* Imagen del producto */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                {line.merchandise.product.images.edges[0] && (
                  <img
                    src={line.merchandise.product.images.edges[0].node.url}
                    alt={line.merchandise.product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Información del producto */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {line.merchandise.product.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {line.merchandise.title}
                </p>
                <p className="text-sm font-medium">
                  {formatPrice(line.merchandise.price)}
                </p>
              </div>

              {/* Controles de cantidad */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateQuantity(line.id, line.quantity - 1)
                    }
                    disabled={isUpdatingQuantity}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm w-8 text-center">
                    {line.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateQuantity(line.id, line.quantity + 1)
                    }
                    disabled={isUpdatingQuantity}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Botón eliminar con confirmación */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isRemovingFromCart}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
                        Eliminar producto
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Estás seguro de que quieres eliminar "
                        {line.merchandise.product.title}" del carrito?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemoveItem(line.id)}
                        className="bg-[#BC3B59] hover:bg-[#9B2847] text-white"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Resumen del carrito */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotalAmount)}</span>
          </div>

          {cart.cost.totalTaxAmount && (
            <div className="flex justify-between text-sm">
              <span>Impuestos:</span>
              <span>{formatPrice(cart.cost.totalTaxAmount)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
        </div>

        {/* Botón de checkout */}
        {showCheckoutButton && (
          <div className="space-y-2 mt-4">
            <ShopifyCheckoutButton
              className="w-full"
              size="lg"
              variant="default"
            >
              Proceder al checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </ShopifyCheckoutButton>

            <ShopifyCheckoutButton
              className="w-full"
              size="sm"
              variant="outline"
              openInNewTab={true}
            >
              Abrir en nueva pestaña
              <ExternalLink className="ml-2 h-4 w-4" />
            </ShopifyCheckoutButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
