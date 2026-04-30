import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useShopifySearch } from "./useShopifySearch";

interface UseMobileSearchProps {
  isOpen: boolean;
}

export const useMobileSearch = ({ isOpen }: UseMobileSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState<unknown[]>([]);

  const navigate = useNavigate();
  const { products: searchResults, loading, search, clearSearch } = useShopifySearch();

  useEffect(() => {
    if (isOpen && suggestedProducts.length === 0) {
      search({ first: 6, sort: { key: "BEST_SELLING" } });
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setSuggestedProducts(searchResults);
    }
  }, [searchResults]);

  const handleSearchWithTracking = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        search({ first: 20, query: query.trim() });
      } else {
        clearSearch();
        search({ first: 6, sort: { key: "BEST_SELLING" } });
      }
    },
    [search, clearSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    clearSearch();
    search({ first: 6, sort: { key: "BEST_SELLING" } });
  }, [clearSearch, search]);

  const handleProductClick = useCallback(
    (handle: string) => {
      navigate(`/product/${handle}`);
    },
    [navigate]
  );

  const handleCategoryClick = useCallback(
    (handle: string) => {
      navigate(`/shop?category=${handle}`);
    },
    [navigate]
  );

  const displayProducts = searchQuery ? searchResults : suggestedProducts;

  return {
    searchQuery,
    suggestedProducts,
    displayProducts,
    handleSearchWithTracking,
    handleClearSearch,
    handleProductClick,
    handleCategoryClick,
    loading,
  };
};
