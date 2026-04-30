// Hooks de UI para componentes de Shopify
export { useShopifyCartUI } from "./useShopifyCartUI";
export { useShopifyProductsUI } from "./useShopifyProductsUI";
export { useShopifySearchUI } from "./useShopifySearchUI";
export { useInteractiveProductCard } from "./useInteractiveProductCard";

// Hooks principales de Shopify (movidos desde src/hooks/)
export { useShopifyCart } from "./useShopifyCart";
export { useShopifyCheckout } from "./useShopifyCheckout";
export { useShopifyCollections } from "./useShopifyCollections";
export { useShopifyProductByHandle } from "./useShopifyProductByHandle";
export { useShopifyProductsList } from "./useShopifyProductsList";
export { useShopifySearch } from "./useShopifySearch";

// Hooks de lógica de búsqueda
export { useShopifySearchLogic } from "./useShopifySearchLogic";

// Hooks para búsqueda móvil
export { useMobileSearch } from "./useMobileSearch";
export { useMobileSearchModal } from "./useMobileSearchModal";

// Re-exportar desde search-exports
export * from "../search/search-exports";
