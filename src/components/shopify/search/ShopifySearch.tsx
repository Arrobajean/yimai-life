import React from "react";
import { useShopifySearchLogic } from "../hooks/useShopifySearchLogic";
import { PRODUCT_SORT_OPTIONS } from "@/services/shopify/sort-keys";
import { type ProductFilters } from "@/services/shopify/types";
import {
  SearchBar,
  FiltersPanel,
  SearchResults,
} from "./components/shopify-search-components";

interface ShopifySearchProps {
  className?: string;
  showFilters?: boolean;
  showSort?: boolean;
  productsPerPage?: number;
  initialQuery?: string;
  initialFilters?: ProductFilters;
}

export function ShopifySearch({
  className = "",
  showFilters = true,
  showSort = true,
  productsPerPage = 20,
  initialQuery = "",
  initialFilters = {},
}: ShopifySearchProps) {
  const {
    // State
    searchQuery,
    isFiltersOpen,
    activeFilters,
    sortOption,
    activeFiltersCount,

    // Actions
    setSearchQuery,
    setIsFiltersOpen,
    setActiveFilters,
    setSortOption,

    // Filter handlers
    clearAllFilters,

    // Search data
    products,
    loading,
    error,
    hasNextPage,
    availableFilters,
    loadingFilters,

    // Actions
    loadMore,
  } = useShopifySearchLogic({
    productsPerPage,
    initialQuery,
    initialFilters,
  });

  // Opciones de ordenamiento usando las constantes de Shopify
  const sortOptions = [...PRODUCT_SORT_OPTIONS];

  return (
    <div
      className={`space-y-6 ${className}`}
      id="search-section"
      role="search"
      aria-label="Búsqueda de productos"
    >
      {/* Barra de búsqueda */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        showFilters={showFilters}
        showSort={showSort}
        isFiltersOpen={isFiltersOpen}
        onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
        activeFiltersCount={activeFiltersCount}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
        sortOptions={sortOptions}
        onClearAllFilters={clearAllFilters}
      />

      {/* Panel de filtros */}
      {showFilters && (
        <FiltersPanel
          isOpen={isFiltersOpen}
          onToggle={setIsFiltersOpen}
          activeFilters={activeFilters}
          onActiveFiltersChange={setActiveFilters}
          availableFilters={availableFilters}
          loadingFilters={loadingFilters}
        />
      )}

      {/* Resultados de búsqueda */}
      <SearchResults
        products={products}
        loading={loading}
        error={error}
        hasNextPage={hasNextPage}
        onLoadMore={loadMore}
        onClearFilters={clearAllFilters}
      />
    </div>
  );
}
