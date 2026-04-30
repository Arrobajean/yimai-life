import { useState, useEffect } from "react";
import { useShopifySearch } from "./useShopifySearch";
import {
  type SearchFilters,
  type ProductFilters,
  type SortOptions,
} from "@/services/shopify/types";

interface UseShopifySearchLogicProps {
  productsPerPage: number;
  initialQuery: string;
  initialFilters: ProductFilters;
}

interface UseShopifySearchLogicReturn {
  // State
  searchQuery: string;
  isFiltersOpen: boolean;
  activeFilters: ProductFilters;
  sortOption: SortOptions;
  activeFiltersCount: number;

  // Actions
  setSearchQuery: (query: string) => void;
  setIsFiltersOpen: (open: boolean) => void;
  setActiveFilters: (filters: ProductFilters) => void;
  setSortOption: (option: SortOptions) => void;

  // Filter handlers
  handleAvailabilityChange: (
    available: boolean | undefined,
    isChecked: boolean
  ) => void;
  clearAllFilters: () => void;

  // Search data
  products: unknown[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  totalResults: number;
  availableFilters: unknown;
  loadingFilters: boolean;

  // Actions
  loadMore: () => void;
}

export function useShopifySearchLogic({
  productsPerPage,
  initialQuery,
  initialFilters,
}: UseShopifySearchLogicProps): UseShopifySearchLogicReturn {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] =
    useState<ProductFilters>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOptions>({
    key: "BEST_SELLING",
  });

  const {
    products,
    loading,
    error,
    hasNextPage,
    totalResults,
    search,
    loadMore,
    clearSearch,
    availableFilters,
    loadingFilters,
  } = useShopifySearch();

  // Realizar búsqueda cuando cambian los filtros
  useEffect(() => {
    const filters: SearchFilters = {
      first: productsPerPage,
    };

    // Aplicar query de texto si existe
    if (searchQuery.trim()) {
      filters.query = searchQuery.trim();
    }

    // Aplicar filtros si existen
    if (Object.keys(activeFilters).length > 0) {
      filters.filters = activeFilters;
    }

    // Siempre aplicar el ordenamiento, incluso si es TITLE sin reverse
    filters.sort = sortOption;

    search(filters);
  }, [searchQuery, activeFilters, sortOption, productsPerPage, search]);

  // Aplicar filtros iniciales cuando se monta el componente
  useEffect(() => {
    if (Object.keys(initialFilters).length > 0) {
      setActiveFilters(initialFilters);
    }
  }, [initialFilters]);

  // Manejar filtros de disponibilidad
  const handleAvailabilityChange = (
    available: boolean | undefined,
    isChecked: boolean
  ) => {
    setActiveFilters((prev) => {
      // Si se desmarca una opción, limpiar el filtro
      if (!isChecked) {
        const { available: _, ...rest } = prev;
        return rest;
      }

      // Si se marca una opción, aplicar ese filtro
      return {
        ...prev,
        available,
      };
    });
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveFilters({});
    setSortOption({ key: "BEST_SELLING" });
    clearSearch();
  };

  // Contar filtros activos
  const activeFiltersCount =
    Object.keys(activeFilters).length + (searchQuery ? 1 : 0);

  return {
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
    handleAvailabilityChange,
    clearAllFilters,

    // Search data
    products,
    loading,
    error,
    hasNextPage,
    totalResults,
    availableFilters,
    loadingFilters,

    // Actions
    loadMore,
  };
}
