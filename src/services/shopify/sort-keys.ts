/**
 * Valores válidos para ProductSortKeys en Shopify Storefront API
 * Documentación: https://shopify.dev/docs/api/storefront/reference/products/products
 */

export const SHOPIFY_SORT_KEYS = {
  TITLE: "TITLE",
  PRICE: "PRICE",
  CREATED_AT: "CREATED_AT",
  BEST_SELLING: "BEST_SELLING",
  MANUAL: "MANUAL",
  ID: "ID",
  RELEVANCE: "RELEVANCE",
} as const;

export type ShopifySortKey =
  (typeof SHOPIFY_SORT_KEYS)[keyof typeof SHOPIFY_SORT_KEYS];

/**
 * Opciones de ordenamiento predefinidas para productos
 */
export const PRODUCT_SORT_OPTIONS = [
  {
    key: SHOPIFY_SORT_KEYS.BEST_SELLING,
    translationKey: "search.sort.bestSelling",
    reverse: false,
  },
  {
    key: SHOPIFY_SORT_KEYS.TITLE,
    translationKey: "search.sort.titleAZ",
    reverse: false,
  },
  {
    key: SHOPIFY_SORT_KEYS.TITLE,
    translationKey: "search.sort.titleZA",
    reverse: true,
  },
  {
    key: SHOPIFY_SORT_KEYS.PRICE,
    translationKey: "search.sort.priceLowHigh",
    reverse: false,
  },
  {
    key: SHOPIFY_SORT_KEYS.PRICE,
    translationKey: "search.sort.priceHighLow",
    reverse: true,
  },
  {
    key: SHOPIFY_SORT_KEYS.CREATED_AT,
    translationKey: "search.sort.dateNewOld",
    reverse: false,
  },
  {
    key: SHOPIFY_SORT_KEYS.CREATED_AT,
    translationKey: "search.sort.dateOldNew",
    reverse: true,
  },
] as const;

/**
 * Función helper para validar que un sortKey sea válido
 */
export function isValidSortKey(key: string): key is ShopifySortKey {
  return Object.values(SHOPIFY_SORT_KEYS).includes(key as ShopifySortKey);
}

/**
 * Función helper para obtener el sortKey por defecto
 */
export function getDefaultSortKey(): ShopifySortKey {
  return SHOPIFY_SORT_KEYS.BEST_SELLING;
}
