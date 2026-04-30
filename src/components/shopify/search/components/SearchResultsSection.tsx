import React from "react";
import { InteractiveShopifyProductCard } from "../../cards/InteractiveShopifyProductCard";

interface SearchResultsSectionProps {
  products: unknown[];
  loading: boolean;
  loadingLabel: string;
  searchResultsLabel: string;
  loadingSearchResultsLabel: string;
  onProductClick: (handle: string) => void;
}

export const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  products,
  loading,
  loadingLabel,
  searchResultsLabel,
  loadingSearchResultsLabel,
  onProductClick,
}) => {
  if (loading) {
    return (
      <section role="region" aria-labelledby="search-results-title">
        <h2 id="search-results-title" className="text-lg font-bold mb-4">
          {loadingLabel}
        </h2>

        <div
          className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4"
          role="list"
          aria-label={loadingSearchResultsLabel}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse" role="listitem">
              <div
                className="aspect-square bg-gray-200 rounded-lg mb-2"
                aria-hidden="true"
              ></div>
              <div
                className="h-4 bg-gray-200 rounded mb-1"
                aria-hidden="true"
              ></div>
              <div
                className="h-3 bg-gray-200 rounded w-2/3"
                aria-hidden="true"
              ></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section role="region" aria-labelledby="search-results-title">
      <h2 id="search-results-title" className="text-lg font-bold mb-4">
        {`${products.length} ${searchResultsLabel}`}
      </h2>

      <div
        className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4"
        role="list"
        aria-label={searchResultsLabel}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-center cursor-pointer"
            onClick={() => onProductClick(product.handle)}
            role="listitem"
          >
            <InteractiveShopifyProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
