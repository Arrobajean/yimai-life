import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "../buttons/AddToCartButton";
import { VariantPreview } from "../VariantPreview";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

interface ShopifyProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    description: string;
    availableForSale: boolean;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          id: string;
          url: string;
          altText: string;
          width: number;
          height: number;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          availableForSale: boolean;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          };
        };
      }>;
    };
    tags: string[];
    productType: string;
    vendor: string;
  };
  className?: string;
}

export const ShopifyProductCard: React.FC<ShopifyProductCardProps> = ({
  product,
  className = "",
}) => {
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const isAvailable =
    product.availableForSale && firstVariant?.availableForSale;

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: price.currencyCode,
    }).format(amount);
  };

  const hasDiscount =
    firstVariant?.compareAtPrice &&
    parseFloat(firstVariant.compareAtPrice.amount) >
      parseFloat(firstVariant.price.amount);

  // Generar IDs únicos para accesibilidad
  const cardId = `product-card-${product.id}`;
  const priceId = `price-${product.id}`;
  const discountId = `discount-${product.id}`;
  const tagsId = `tags-${product.id}`;

  return (
    <Card
      id={cardId}
      className={`group overflow-hidden hover:shadow-xl theme-transition ${className} 
        dark:bg-[hsl(210,8%,12%)] dark:border-[hsl(210,8%,22%)] dark:hover:bg-[hsl(210,8%,18%)]
        dark:hover:shadow-[0_8px_32px_hsl(345,65%,90%/0.1)]`}
      role="article"
      aria-labelledby={`title-${product.id}`}
      aria-describedby={`${priceId} ${
        product.description ? `desc-${product.id}` : ""
      } ${tagsId}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || `${product.title} - Imagen del producto`}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="w-full h-full bg-gray-200 dark:bg-[hsl(210,8%,18%)] flex items-center justify-center"
            role="img"
            aria-label="Imagen no disponible"
          >
            <span className="text-gray-400 dark:text-[hsl(210,15%,65%)]">
              Sin imagen
            </span>
          </div>
        )}

        {/* Overlay with actions */}
        <div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 dark:group-hover:bg-[hsl(210,8%,12%)] dark:group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center"
          role="group"
          aria-label="Acciones del producto"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Link
              to={`/shop/product/${product.handle}`}
              className="p-2 bg-white dark:bg-[hsl(345,65%,90%)] rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-[hsl(345,65%,85%)] theme-transition dark:shadow-[0_4px_12px_hsl(345,65%,90%/0.4)]"
              aria-label={`Ver detalles de ${product.title}`}
              aria-describedby={`desc-${product.id}`}
            >
              <Eye
                className="h-4 w-4 text-gray-700 dark:text-[hsl(210,8%,12%)]"
                aria-hidden="true"
              />
            </Link>
            {isAvailable && firstVariant && (
              <AddToCartButton
                product={{
                  id: firstVariant.id,
                  name: product.title,
                  price: parseFloat(firstVariant.price.amount),
                  description: product.description || "",
                  image: product.images?.edges?.[0]?.node?.url || "",
                  category: product.productType || "",
                  available: firstVariant.availableForSale || false,
                }}
                variant="default"
                size="icon"
                className="p-2 bg-white dark:bg-[hsl(160,60%,85%)] rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-[hsl(160,60%,80%)] theme-transition dark:shadow-[0_4px_12px_hsl(160,60%,85%/0.4)]"
                aria-label={`Agregar ${product.title} al carrito`}
                aria-describedby={`${priceId} ${
                  !isAvailable ? "stock-status" : ""
                }`}
              >
                <ShoppingCart
                  className="h-4 w-4 dark:text-[hsl(210,8%,12%)]"
                  aria-hidden="true"
                />
              </AddToCartButton>
            )}
          </div>
        </div>

        {/* Badges */}
        <div
          className="absolute top-2 left-2 flex flex-col gap-1"
          role="status"
          aria-live="polite"
        >
          {!isAvailable && (
            <Badge
              variant="destructive"
              className="text-xs dark:bg-[hsl(0,62.8%,65%)] dark:text-[hsl(75,60%,92%)]"
              aria-label="Producto agotado"
            >
              Agotado
            </Badge>
          )}
          {isProductNew(product) && (
            <Badge
              variant="secondary"
              className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              aria-label="Producto nuevo"
            >
              New
            </Badge>
          )}
          {hasDiscount && (
            <Badge
              variant="secondary"
              className="text-xs bg-red-100 text-red-800 dark:bg-[hsl(345,65%,90%)] dark:text-[hsl(210,8%,12%)] dark:shadow-[0_2px_8px_hsl(345,65%,90%/0.3)]"
              aria-label="Producto en oferta"
            >
              Oferta
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-5 md:p-6">
        {/* Product Info */}
        <div className="space-y-3">
          <Link
            to={`/shop/product/${product.handle}`}
            className="block group-hover:text-blue-600 dark:group-hover:text-[hsl(345,65%,90%)] theme-transition-color"
            aria-describedby={`${priceId} ${
              product.description ? `desc-${product.id}` : ""
            }`}
          >
            <h3
              id={`title-${product.id}`}
              className="font-semibold text-base md:text-lg line-clamp-2 group-hover:underline dark:text-[hsl(75,60%,92%)]"
            >
              {product.title}
            </h3>
          </Link>

          {/* Descripción del producto para accesibilidad */}
          {product.description && (
            <p id={`desc-${product.id}`} className="sr-only" aria-live="polite">
              {product.description}
            </p>
          )}

          {/* Vista previa de variantes - Comentado temporalmente hasta alinear tipos */}
          {/* <VariantPreview product={product} /> */}
        </div>

        {/* Price */}
        <div
          className="flex items-center gap-3"
          role="group"
          aria-label="Precio del producto"
        >
          {hasDiscount ? (
            <>
              <span
                id={priceId}
                className="text-xl md:text-2xl font-bold text-green-600 dark:text-[hsl(345,65%,90%)]"
                aria-label="Precio con descuento"
              >
                {formatPrice(firstVariant!.price)}
              </span>
              <span
                id={discountId}
                className="text-base text-gray-500 dark:text-[hsl(210,15%,65%)] line-through"
                aria-label="Precio original"
              >
                {formatPrice(firstVariant!.compareAtPrice!)}
              </span>
            </>
          ) : (
            <span
              id={priceId}
              className="text-xl md:text-2xl font-bold dark:text-[hsl(345,65%,90%)]"
              aria-label="Precio del producto"
            >
              {formatPrice(
                firstVariant?.price || product.priceRange.minVariantPrice
              )}
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div
            id={tagsId}
            className="flex flex-wrap gap-1"
            role="group"
            aria-label="Etiquetas del producto"
          >
            {product.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs dark:border-[hsl(210,8%,22%)] dark:text-[hsl(210,15%,65%)] dark:hover:bg-[hsl(210,8%,18%)]"
                aria-label={`Etiqueta: ${tag}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        {isAvailable && firstVariant && (
          <div className="mt-4">
            <AddToCartButton
              product={{
                id: firstVariant.id,
                name: product.title,
                price: parseFloat(firstVariant.price.amount),
                description: product.description || "",
                image: product.images?.edges?.[0]?.node?.url || "",
                category: product.productType || "",
                available: firstVariant.availableForSale || false,
              }}
              className="w-full h-12 text-base"
              size="lg"
              aria-label={`Agregar ${product.title} al carrito`}
              aria-describedby={`${priceId} stock-status`}
            >
              Agregar al Carrito
            </AddToCartButton>
          </div>
        )}

        {/* Estado del stock para lectores de pantalla */}
        <div id="stock-status" className="sr-only" aria-live="polite">
          {isAvailable
            ? `${product.title} está disponible`
            : `${product.title} está agotado`}
        </div>
      </CardContent>
    </Card>
  );
};
