import { useState, useCallback } from "react";
import { useShopifySearch } from "./useShopifySearch";

interface UseShopifySearchUIProps {
  productsPerPage?: number;
  initialQuery?: string;
}

interface UseShopifySearchUIReturn {
  // Estado de la UI
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  activeFilters: unknown;
  sortOption: { key: string; reverse: boolean };
  setSortOption: (option: { key: string; reverse: boolean }) => void;

  // Funciones de la UI
  handlePriceChange: (value: number[]) => void;
  handleAvailabilityChange: (available: boolean) => void;
  handleProductTypeChange: (type: string) => void;
  handleVendorChange: (vendor: string) => void;
  handleTagChange: (tag: string) => void;
  clearAllFilters: () => void;

  // Datos del hook base
  products: unknown[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  totalResults: number;
  loadMore: () => void;
  availableFilters: unknown;
  loadingFilters: boolean;

  // Contadores
  activeFiltersCount: number;
}

export const useShopifySearchUI = ({
  productsPerPage = 20,
  initialQuery = "",
}: UseShopifySearchUIProps = {}): UseShopifySearchUIReturn => {
  // Estado de la UI
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState({
    key: "TITLE",
    reverse: false,
  });
  const [activeFilters, setActiveFilters] = useState<unknown>({});

  // Hook base de búsqueda
  const {
    products,
    loading,
    error,
    hasNextPage,
    totalResults,
    loadMore,
    availableFilters,
    loadingFilters,
    search,
  } = useShopifySearch({
    first: productsPerPage,
    query: searchQuery,
    sortKey: sortOption.key,
    reverse: sortOption.reverse,
  });

  // Funciones de la UI
  const handlePriceChange = useCallback(
    (value: number[]) => {
      const [min, max] = value;
      setActiveFilters((prev: unknown) => ({
        ...prev,
        price: { min, max },
      }));
      search({
        first: productsPerPage,
        query: searchQuery,
        sortKey: sortOption.key,
        reverse: sortOption.reverse,
        price: { min, max },
      });
    },
    [searchQuery, sortOption, productsPerPage, search]
  );

  const handleAvailabilityChange = useCallback(
    (available: boolean) => {
      setActiveFilters((prev: unknown) => ({
        ...prev,
        availableForSale: available,
      }));
      search({
        first: productsPerPage,
        query: searchQuery,
        sortKey: sortOption.key,
        reverse: sortOption.reverse,
        availableForSale: available,
      });
    },
    [searchQuery, sortOption, productsPerPage, search]
  );

  const handleProductTypeChange = useCallback(
    (type: string) => {
      setActiveFilters((prev: any) => ({
        ...prev,
        productType: type,
      }));
      search({
        first: productsPerPage,
        query: searchQuery,
        sortKey: sortOption.key,
        reverse: sortOption.reverse,
        productType: type,
      });
    },
    [searchQuery, sortOption, productsPerPage, search]
  );

  const handleVendorChange = useCallback(
    (vendor: string) => {
      setActiveFilters((prev: any) => ({
        ...prev,
        vendor: vendor,
      }));
      search({
        first: productsPerPage,
        query: searchQuery,
        sortKey: sortOption.key,
        reverse: sortOption.reverse,
        vendor: vendor,
      });
    },
    [searchQuery, sortOption, productsPerPage, search]
  );

  const handleTagChange = useCallback(
    (tag: string) => {
      setActiveFilters((prev: any) => ({
        ...prev,
        tag: tag,
      }));
      search({
        first: productsPerPage,
        query: searchQuery,
        sortKey: sortOption.key,
        reverse: sortOption.reverse,
        tag: tag,
      });
    },
    [searchQuery, sortOption, productsPerPage, search]
  );

  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
    search({
      first: productsPerPage,
      query: searchQuery,
      sortKey: sortOption.key,
      reverse: sortOption.reverse,
    });
  }, [searchQuery, sortOption, productsPerPage, search]);

  // Contar filtros activos
  const activeFiltersCount = Object.keys(activeFilters).length;

  return {
    // Estado de la UI
    searchQuery,
    setSearchQuery,
    isFiltersOpen,
    setIsFiltersOpen,
    activeFilters,
    sortOption,
    setSortOption,

    // Funciones de la UI
    handlePriceChange,
    handleAvailabilityChange,
    handleProductTypeChange,
    handleVendorChange,
    handleTagChange,
    clearAllFilters,

    // Datos del hook base
    products,
    loading,
    error,
    hasNextPage,
    totalResults,
    loadMore,
    availableFilters,
    loadingFilters,

    // Contadores
    activeFiltersCount,
  };
};
