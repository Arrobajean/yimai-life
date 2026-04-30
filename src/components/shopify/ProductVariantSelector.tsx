import React, { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductVariants } from "@/hooks/product";
import { ShopifyProduct } from "@/services/shopify/types";
import { useLanguage } from "@/providers/CartProvider";
import {
  formatVariantPrice,
  getDiscountPercentage,
  getColorValue,
  isColorOption,
  getOptionDisplayName,
} from "@/services/shopify/variants";

interface ProductVariantSelectorProps {
  product: ShopifyProduct | null;
  onVariantChange?: (variant: unknown) => void;
  onImageChange?: (imageUrl: string) => void;
  showPrice?: boolean;
  compact?: boolean;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  product,
  onVariantChange,
  onImageChange,
  showPrice = true,
  compact = false,
}) => {
  const { t } = useLanguage();
  const variantLogic = useProductVariants(product);

  // Actualizar imagen cuando cambia la variante (comentado - ahora se maneja en los hooks)
  // React.useEffect(() => {
  //   if (variantLogic.currentVariant?.image?.url && onImageChange) {
  //     // Si la variante tiene una imagen específica, usarla
  //     // Changing image to variant image
  //     );
  //     onImageChange(variantLogic.currentVariant.image.url);
  //   } else if (
  //     variantLogic.currentVariant &&
  //     !variantLogic.currentVariant.image?.url &&
  //     onImageChange
  //   ) {
  //     // Si la variante no tiene imagen específica, usar la primera imagen del producto
  //     const firstImage = product?.images?.edges?.[0]?.node?.url;
  //     if (firstImage) {
  //       // Using default image
  //       );
  //       onImageChange(firstImage);
  //     }
  //   }
  // }, [variantLogic.currentVariant, onImageChange, product]);

  // Memoize the option selection handler to prevent recreation on every render
  const handleOptionSelect = useCallback(
    (optionName: string, value: string) => {
      variantLogic.selectOption(optionName, value);
    },
    [variantLogic]
  );

  // Memoize the key down handler to prevent recreation on every render
  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent,
      optionName: string,
      value: string,
      isAvailable: boolean
    ) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isAvailable) {
          variantLogic.selectOption(optionName, value);
        }
      }
    },
    [variantLogic]
  );

  // Memoize the discount calculation to prevent recalculation on every render
  const discountPercentage = useMemo(() => {
    if (!variantLogic.currentVariant?.compareAtPrice) return null;
    return getDiscountPercentage({
      ...variantLogic.currentVariant,
      compareAtPrice: variantLogic.currentVariant.compareAtPrice,
      price: variantLogic.currentVariant.price,
    });
  }, [variantLogic.currentVariant]);

  // Notificar cambio de variante
  React.useEffect(() => {
    if (variantLogic.currentVariant && onVariantChange) {
      onVariantChange(variantLogic.currentVariant);
    }
  }, [variantLogic.currentVariant, onVariantChange]);

  if (!variantLogic.hasVariants) {
    return null;
  }

  return (
    <div
      className="space-y-4"
      role="group"
      aria-label="Selector de opciones del producto"
    >
      <div className="space-y-3">
        {variantLogic.availableOptions.map((option) => {
          const optionId = `option-${option.name}-${product?.id}`;
          const optionGroupId = `option-group-${option.name}-${product?.id}`;

          return (
            <div key={option.name} className="space-y-2">
              <label
                id={optionId}
                className="block text-sm font-medium text-foreground"
                htmlFor={optionGroupId}
              >
                {getOptionDisplayName(option.name)}
              </label>

              <div
                id={optionGroupId}
                role="radiogroup"
                aria-labelledby={optionId}
                aria-describedby={`${optionId}-description`}
                className={`flex flex-wrap gap-2 ${
                  compact ? "gap-1" : "gap-2"
                }`}
              >
                {option.values.map((value) => {
                  const isSelected =
                    variantLogic.selectedOptions[option.name] === value;
                  const isAvailable = variantLogic.isOptionAvailable(
                    option.name,
                    value
                  );
                  const isColor = isColorOption(option.name);
                  const valueId = `value-${option.name}-${value}-${product?.id}`;
                  const colorValue = isColor ? getColorValue(value) : null;

                  return (
                    <Button
                      key={value}
                      id={valueId}
                      variant={isSelected ? "default" : "outline"}
                      size={compact ? "sm" : "default"}
                      onClick={() => handleOptionSelect(option.name, value)}
                      disabled={!isAvailable}
                      className={`
                        ${isColor && colorValue ? "min-w-[60px] h-10" : ""}
                        ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                        ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
                        transition-all duration-200
                      `}
                      style={
                        isColor && colorValue
                          ? {
                              backgroundColor: colorValue,
                              borderColor: colorValue,
                              color: isSelected ? "white" : "inherit",
                            }
                          : undefined
                      }
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`${getOptionDisplayName(
                        option.name
                      )}: ${value}`}
                      aria-describedby={`${valueId}-status`}
                      aria-disabled={!isAvailable}
                      tabIndex={isSelected ? 0 : -1}
                      onKeyDown={(e) =>
                        handleKeyDown(e, option.name, value, isAvailable)
                      }
                    >
                      {isColor && colorValue ? (
                        <span className="sr-only">{value}</span>
                      ) : (
                        value
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Descripción de la opción para accesibilidad */}
              <div
                id={`${optionId}-description`}
                className="sr-only"
                aria-live="polite"
              >
                {`${t("products.availableOptions")} ${getOptionDisplayName(
                  option.name
                )}. ${t("products.selectOption")}`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Información de la variante seleccionada */}
      {variantLogic.currentVariant && showPrice && (
        <div
          className="p-4 bg-muted/50 rounded-lg"
          role="status"
          aria-live="polite"
          aria-label="Información de la variante seleccionada"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Variante seleccionada: {variantLogic.currentVariant.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {formatVariantPrice(variantLogic.currentVariant.price)}
                </span>
                {variantLogic.currentVariant.compareAtPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatVariantPrice(
                        variantLogic.currentVariant.compareAtPrice
                      )}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {discountPercentage}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Estado de disponibilidad */}
            <div className="text-right">
              <Badge
                variant={
                  variantLogic.currentVariant.availableForSale
                    ? "default"
                    : "destructive"
                }
                className="text-xs"
                aria-label={
                  variantLogic.currentVariant.availableForSale
                    ? "Producto disponible"
                    : "Producto agotado"
                }
              >
                {variantLogic.currentVariant.availableForSale
                  ? "Disponible"
                  : "Agotado"}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de estado para lectores de pantalla */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-label="Estado de selección de variantes"
      >
        {variantLogic.currentVariant
          ? `Variante seleccionada: ${variantLogic.currentVariant.title}`
          : "Selecciona las opciones del producto"}
      </div>
    </div>
  );
};
