import React from "react";
import { Button } from "@/components/ui/button";
import { InteractiveShopifyProductCard } from "../../cards/InteractiveShopifyProductCard";

interface SuggestedProductsSectionProps {
  products: unknown[];
  suggestionType: "smart" | "trending" | "new";
  onSuggestionTypeChange: (type: "smart" | "trending" | "new") => void;
  onProductClick: (handle: string) => void;
  smartLabel: string;
  trendingLabel: string;
  newLabel: string;
  smartSuggestionsLabel: string;
  trendingLabel2: string;
  newArrivalsLabel: string;
  viewSmartSuggestionsLabel: string;
  viewPopularProductsLabel: string;
  viewNewProductsLabel: string;
  suggestedProductsLabel: string;
}

export const SuggestedProductsSection: React.FC<
  SuggestedProductsSectionProps
> = ({
  products,
  suggestionType,
  onSuggestionTypeChange,
  onProductClick,
  smartLabel,
  trendingLabel,
  newLabel,
  smartSuggestionsLabel,
  trendingLabel2,
  newArrivalsLabel,
  viewSmartSuggestionsLabel,
  viewPopularProductsLabel,
  viewNewProductsLabel,
  suggestedProductsLabel,
}) => {
  if (products.length === 0) return null;

  const getSectionTitle = () => {
    switch (suggestionType) {
      case "smart":
        return smartSuggestionsLabel;
      case "trending":
        return trendingLabel2;
      case "new":
        return newArrivalsLabel;
      default:
        return smartSuggestionsLabel;
    }
  };

  return (
    <section role="region" aria-labelledby="suggested-products-title">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="suggested-products-title"
          className="text-lg font-bold uppercase"
        >
          {getSectionTitle()}
        </h2>
        <div className="flex gap-1">
          <Button
            variant={suggestionType === "smart" ? "default" : "ghost"}
            size="sm"
            onClick={() => onSuggestionTypeChange("smart")}
            className="text-xs"
            aria-label={viewSmartSuggestionsLabel}
            aria-pressed={suggestionType === "smart"}
          >
            {smartLabel}
          </Button>
          <Button
            variant={suggestionType === "trending" ? "default" : "ghost"}
            size="sm"
            onClick={() => onSuggestionTypeChange("trending")}
            className="text-xs"
            aria-label={viewPopularProductsLabel}
            aria-pressed={suggestionType === "trending"}
          >
            {trendingLabel}
          </Button>
          <Button
            variant={suggestionType === "new" ? "default" : "ghost"}
            size="sm"
            onClick={() => onSuggestionTypeChange("new")}
            className="text-xs"
            aria-label={viewNewProductsLabel}
            aria-pressed={suggestionType === "new"}
          >
            {newLabel}
          </Button>
        </div>
      </div>

      <div
        className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4"
        role="list"
        aria-label={suggestedProductsLabel}
      >
        {products.slice(0, 4).map((product) => (
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
