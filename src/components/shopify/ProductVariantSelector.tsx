import React, { useCallback, useMemo, useState, useEffect } from "react";
import { ShopifyProduct } from "@/services/shopify/types";
import {
  formatVariantPrice,
  getDiscountPercentage,
  getColorValue,
  isColorOption,
  getOptionDisplayName,
  extractProductVariants,
  getProductOptions,
  findVariantByOptions,
  getFirstAvailableVariant,
  getAvailableValuesForOption,
  type ProductVariant,
  type ProductOption,
} from "@/services/shopify/variants";

// ─── Local hook replacing the missing @/hooks/product ─────────────────────────
function useProductVariants(product: ShopifyProduct | null) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const variants = useMemo(() => extractProductVariants(product), [product]);
  const availableOptions = useMemo(() => getProductOptions(product), [product]);
  const hasVariants = availableOptions.length > 0;

  // Pre‑select the first available variant
  useEffect(() => {
    if (!product) return;
    const first = getFirstAvailableVariant(product);
    if (first) {
      const opts: Record<string, string> = {};
      first.selectedOptions.forEach((o) => { opts[o.name] = o.value; });
      setSelectedOptions(opts);
    }
  }, [product]);

  const currentVariant = useMemo(
    () => findVariantByOptions(product, selectedOptions),
    [product, selectedOptions],
  );

  const selectOption = useCallback((name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  }, []);

  const isOptionAvailable = useCallback(
    (name: string, value: string) => {
      const available = getAvailableValuesForOption(product, name, selectedOptions);
      return available.includes(value);
    },
    [product, selectedOptions],
  );

  return { selectedOptions, currentVariant, availableOptions, hasVariants, selectOption, isOptionAvailable };
}

// ─── Component ────────────────────────────────────────────────────────────────

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
  const variantLogic = useProductVariants(product);

  const handleOptionSelect = useCallback(
    (optionName: string, value: string) => {
      variantLogic.selectOption(optionName, value);
    },
    [variantLogic],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, optionName: string, value: string, isAvailable: boolean) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isAvailable) variantLogic.selectOption(optionName, value);
      }
    },
    [variantLogic],
  );

  const discountPercentage = useMemo(() => {
    if (!variantLogic.currentVariant?.compareAtPrice) return null;
    return getDiscountPercentage({
      ...variantLogic.currentVariant,
      compareAtPrice: variantLogic.currentVariant.compareAtPrice,
      price: variantLogic.currentVariant.price,
    });
  }, [variantLogic.currentVariant]);

  // Notify parent of variant changes
  useEffect(() => {
    if (variantLogic.currentVariant && onVariantChange) {
      onVariantChange(variantLogic.currentVariant);
    }
  }, [variantLogic.currentVariant, onVariantChange]);

  if (!variantLogic.hasVariants) return null;

  return (
    <div className="space-y-4" role="group" aria-label="Selector de opciones del producto">
      <div className="space-y-3">
        {variantLogic.availableOptions.map((option) => {
          const optionId = `option-${option.name}-${product?.id}`;
          const optionGroupId = `option-group-${option.name}-${product?.id}`;

          return (
            <div key={option.name} className="space-y-2">
              <label
                id={optionId}
                className="block text-xs tracking-[0.12em] uppercase text-muted-foreground"
                htmlFor={optionGroupId}
              >
                {getOptionDisplayName(option.name)}
              </label>

              <div
                id={optionGroupId}
                role="radiogroup"
                aria-labelledby={optionId}
                className={`flex flex-wrap ${compact ? "gap-1" : "gap-2"}`}
              >
                {option.values.map((value) => {
                  const isSelected = variantLogic.selectedOptions[option.name] === value;
                  const isAvailable = variantLogic.isOptionAvailable(option.name, value);
                  const isColor = isColorOption(option.name);
                  const colorValue = isColor ? getColorValue(value) : null;

                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionSelect(option.name, value)}
                      disabled={!isAvailable}
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`${getOptionDisplayName(option.name)}: ${value}`}
                      aria-disabled={!isAvailable}
                      tabIndex={isSelected ? 0 : -1}
                      onKeyDown={(e) => handleKeyDown(e, option.name, value, isAvailable)}
                      className={`text-xs px-3 py-2 border transition-colors duration-200 whitespace-nowrap ${
                        isSelected
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      } ${!isAvailable ? "opacity-40 cursor-not-allowed" : ""}`}
                      style={
                        isColor && colorValue
                          ? { backgroundColor: colorValue, borderColor: colorValue, color: isSelected ? "white" : "inherit" }
                          : undefined
                      }
                    >
                      {isColor && colorValue ? <span className="sr-only">{value}</span> : value}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected variant info */}
      {variantLogic.currentVariant && showPrice && (
        <div className="py-3 border-t border-border" role="status" aria-live="polite">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {variantLogic.currentVariant.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {formatVariantPrice(variantLogic.currentVariant.price)}
                </span>
                {variantLogic.currentVariant.compareAtPrice && (
                  <>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatVariantPrice(variantLogic.currentVariant.compareAtPrice)}
                    </span>
                    <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <span
              className={`text-[10px] tracking-[0.1em] uppercase ${
                variantLogic.currentVariant.availableForSale
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {variantLogic.currentVariant.availableForSale ? "Disponible" : "Agotado"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
