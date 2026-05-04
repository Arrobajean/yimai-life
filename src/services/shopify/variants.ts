/**
 * Utilidades para manejar variantes de productos de Shopify
 * Basado en la documentación oficial: https://shopify.dev/docs/api/storefront/latest/objects/productvariant
 */

import { ShopifyProduct } from "@/services/shopify/types";

// Tipos de datos para variantes
export interface ProductVariant {
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
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image?: {
    id: string;
    url: string;
    altText: string;
    width: number;
    height: number;
  };
}

export interface ProductOption {
  name: string; // "Color", "Size", "Material", etc.
  values: string[]; // ["Red", "Blue", "Green"] o ["S", "M", "L"]
}

export interface VariantSelectorState {
  selectedOptions: Record<string, string>;
  currentVariant: ProductVariant | null;
  availableOptions: ProductOption[];
}

/**
 * Extrae todas las variantes de un producto de Shopify
 */
export function extractProductVariants(
  product: ShopifyProduct | null
): ProductVariant[] {
  if (!product) return [];
  return product.variants.edges.map((edge) => edge.node);
}

/**
 * Detecta si un producto tiene múltiples variantes
 */
export function hasMultipleVariants(product: ShopifyProduct | null): boolean {
  if (!product || !product.variants?.edges) return false;
  return product.variants.edges.length > 1;
}

/**
 * Obtiene las opciones de variantes disponibles (Color, Size, etc.)
 * Esta es la función más importante para mostrar selectores
 */
export function getProductOptions(
  product: ShopifyProduct | null
): ProductOption[] {
  if (!product || !hasMultipleVariants(product)) return [];

  const variants = extractProductVariants(product);
  const optionMap = new Map<string, Set<string>>();

  // Recopilar todas las opciones y valores únicos
  variants.forEach((variant) => {
    variant.selectedOptions.forEach((option) => {
      if (!optionMap.has(option.name)) {
        optionMap.set(option.name, new Set());
      }
      optionMap.get(option.name)!.add(option.value);
    });
  });

  // Convertir a array de opciones ordenadas
  return Array.from(optionMap.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values).sort(),
  }));
}

/**
 * Encuentra una variante específica basada en las opciones seleccionadas
 */
export function findVariantByOptions(
  product: ShopifyProduct | null,
  selectedOptions: Record<string, string>
): ProductVariant | null {
  if (!product) return null;

  const variants = extractProductVariants(product);

  return (
    variants.find((variant) => {
      return variant.selectedOptions.every((option) => {
        const selectedValue = selectedOptions[option.name];
        return selectedValue && option.value === selectedValue;
      });
    }) || null
  );
}

/**
 * Obtiene la primera variante disponible de un producto
 */
export function getFirstAvailableVariant(
  product: ShopifyProduct | null
): ProductVariant | null {
  if (!product) return null;

  const variants = extractProductVariants(product);
  return (
    variants.find((variant) => variant.availableForSale) || variants[0] || null
  );
}

/**
 * Verifica si una combinación específica de opciones está disponible
 */
export function isVariantCombinationAvailable(
  product: ShopifyProduct | null,
  selectedOptions: Record<string, string>
): boolean {
  if (!product) return false;

  const variant = findVariantByOptions(product, selectedOptions);
  return variant ? variant.availableForSale : false;
}

/**
 * Determina si un producto es nuevo (creado en los últimos 30 días)
 */
export function isProductNew(product: ShopifyProduct | null): boolean {
  if (!product || !product.createdAt) return false;
  
  const creationDate = new Date(product.createdAt);
  const now = new Date();
  const daysDifference = Math.floor((now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Considerar como "nuevo" si tiene menos de 30 días
  return daysDifference <= 30;
}

/**
 * Obtiene los valores disponibles para una opción específica
 * Considerando las otras opciones ya seleccionadas
 */
export function getAvailableValuesForOption(
  product: ShopifyProduct | null,
  optionName: string,
  currentSelections: Record<string, string> = {}
): string[] {
  if (!product) return [];

  const variants = extractProductVariants(product);
  const availableValues = new Set<string>();

  variants.forEach((variant) => {
    // Verificar si esta variante es compatible con las selecciones actuales
    const isCompatible = variant.selectedOptions.every((option) => {
      if (option.name === optionName) return true; // Esta es la opción que estamos verificando
      const currentValue = currentSelections[option.name];
      return !currentValue || option.value === currentValue;
    });

    if (isCompatible && variant.availableForSale) {
      const targetOption = variant.selectedOptions.find(
        (opt) => opt.name === optionName
      );
      if (targetOption) {
        availableValues.add(targetOption.value);
      }
    }
  });

  return Array.from(availableValues).sort();
}

/**
 * Formatea el precio de una variante
 */
export function formatVariantPrice(
  price: { amount: string; currencyCode: string },
  locale: string = "es-ES"
): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: price.currencyCode,
  }).format(amount);
}

/**
 * Obtiene el rango de precios de todas las variantes
 */
export function getPriceRange(product: ShopifyProduct | null): {
  min: number;
  max: number;
  currencyCode: string;
} {
  if (!product) {
    return { min: 0, max: 0, currencyCode: "USD" };
  }

  const variants = extractProductVariants(product);
  let min = Infinity;
  let max = -Infinity;
  let currencyCode = "USD";

  variants.forEach((variant) => {
    const price = parseFloat(variant.price.amount);
    if (price < min) min = price;
    if (price > max) max = price;
    currencyCode = variant.price.currencyCode;
  });

  return {
    min: min === Infinity ? 0 : min,
    max: max === -Infinity ? 0 : max,
    currencyCode,
  };
}

/**
 * Verifica si un producto tiene descuento en alguna variante
 */
export function hasDiscount(product: ShopifyProduct | null): boolean {
  if (!product) return false;

  const variants = extractProductVariants(product);
  return variants.some((variant) => {
    if (!variant.compareAtPrice) return false;
    return (
      parseFloat(variant.compareAtPrice.amount) >
      parseFloat(variant.price.amount)
    );
  });
}

/**
 * Obtiene el porcentaje de descuento de una variante
 */
export function getDiscountPercentage(variant: ProductVariant): number | null {
  if (!variant.compareAtPrice) return null;

  const comparePrice = parseFloat(variant.compareAtPrice.amount);
  const currentPrice = parseFloat(variant.price.amount);

  if (comparePrice <= currentPrice) return null;

  return Math.round(((comparePrice - currentPrice) / comparePrice) * 100);
}

/**
 * Obtiene el nombre de visualización para una opción
 */
export function getOptionDisplayName(optionName: string): string {
  const displayNames: Record<string, string> = {
    Color: "Color",
    Colour: "Color",
    Size: "Talla",
    Material: "Material",
    Style: "Estilo",
    Type: "Tipo",
    Pattern: "Patrón",
    Finish: "Acabado",
    Length: "Longitud",
    Width: "Ancho",
    Height: "Alto",
    Weight: "Peso",
    Capacity: "Capacidad",
    Volume: "Volumen",
  };

  return displayNames[optionName] || optionName;
}

/**
 * Obtiene el color CSS para valores de color comunes
 */
export function getColorValue(value: string): string {
  const colorMap: Record<string, string> = {
    // Colores básicos
    Red: "#ef4444",
    Blue: "#3b82f6",
    Green: "#22c55e",
    Yellow: "#eab308",
    Black: "#000000",
    White: "#ffffff",
    Gray: "#6b7280",
    Grey: "#6b7280",
    Brown: "#a16207",
    Pink: "hsl(var(--ohanna-pink))",
    Purple: "#8b5cf6",
    Orange: "#f97316",

    // Colores específicos
    Navy: "#1e3a8a",
    Beige: "#f5f5dc",
    Cream: "#fefce8",
    Silver: "#c0c0c0",
    Gold: "#ffd700",
    Bronze: "#cd7f32",
    Copper: "#b87333",
    "Rose Gold": "#b76e79",
    Champagne: "#f7e7ce",
    Ivory: "#fffff0",
    "Off White": "#fafafa",
    Charcoal: "#36454f",
    Burgundy: "#800020",
    Maroon: "#800000",
    Olive: "#808000",
    Teal: "#008080",
    Turquoise: "#40e0d0",
    Coral: "#ff7f50",
    Lavender: "#e6e6fa",
    Mint: "#98ff98",
    Sage: "#9ca984",
    Taupe: "#483c32",
    Khaki: "#c3b091",
    Camel: "#c19a6b",
    Tan: "#d2b48c",
    Nude: "#e3bc9a",
    Blush: "#ffb3ba",
    "Dusty Rose": "#dc8b9b",
    Mauve: "#e0b0ff",
    Plum: "#8b4513",
    "Forest Green": "#228b22",
    Emerald: "#50c878",
    Sapphire: "#0f52ba",
    Amethyst: "#9966cc",
    Ruby: "#e0115f",
    Pearl: "#f0e68c",
    Crystal: "#a7c7e7",
    Clear: "#ffffff",
    Transparent: "#ffffff",
  };

  return colorMap[value] || "#cccccc";
}

/**
 * Verifica si una opción es de tipo color
 */
export function isColorOption(optionName: string): boolean {
  const colorKeywords = ["color", "colour", "hue", "shade"];
  return colorKeywords.some((keyword) =>
    optionName.toLowerCase().includes(keyword)
  );
}

/**
 * Obtiene la imagen de una variante específica
 */
export function getVariantImage(variant: ProductVariant): string | null {
  return variant.image?.url || null;
}

/**
 * Obtiene todas las imágenes únicas de las variantes
 */
export function getVariantImages(product: ShopifyProduct | null): string[] {
  if (!product) return [];

  const variants = extractProductVariants(product);
  const imageUrls = new Set<string>();

  variants.forEach((variant) => {
    if (variant.image?.url) {
      imageUrls.add(variant.image.url);
    }
  });

  return Array.from(imageUrls);
}

/**
 * Obtiene la imagen principal del producto
 */
export function getMainProductImage(
  product: ShopifyProduct | null
): string | null {
  if (!product || !product.images?.edges || product.images.edges.length === 0)
    return null;
  return product.images.edges[0].node.url;
}

/**
 * Obtiene todas las imágenes del producto
 */
export function getAllProductImages(product: ShopifyProduct | null): string[] {
  if (!product || !product.images?.edges) return [];

  return product.images.edges.map((edge) => edge.node.url);
}
