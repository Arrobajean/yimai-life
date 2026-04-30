import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/CartProvider";
import { InteractiveShopifyProductCard } from "../../cards/InteractiveShopifyProductCard";

interface SearchResultsProps {
  products: unknown[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onClearFilters: () => void;
}

export function SearchResults({
  products,
  loading,
  error,
  hasNextPage,
  onLoadMore,
  onClearFilters,
}: SearchResultsProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Estado de carga */}
      {loading && (
        <div className="text-center py-8" role="status" aria-live="polite">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">
            {t("search.searchingProducts")}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-8" role="alert" aria-live="assertive">
          <p className="text-red-500 mb-2">
            {t("search.errorSearchingProducts")}
          </p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      )}

      {/* Lista de productos */}
      {!loading && !error && products.length > 0 && (
        <div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-1 xs:gap-2 sm:gap-3 md:gap-6 lg:gap-6"
          role="list"
          aria-label="Productos encontrados"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-center p-0.5 xs:p-1 sm:p-2 md:p-3 lg:p-4"
              role="listitem"
            >
              <InteractiveShopifyProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && !error && (!products || products.length === 0) && (
        <div className="text-center py-8" role="status" aria-live="polite">
          <p className="text-muted-foreground">{t("search.noProductsFound")}</p>
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="mt-2"
            aria-label="Limpiar filtros y buscar de nuevo"
          >
            {t("search.clearFilters")}
          </Button>
        </div>
      )}

      {/* Botón de cargar más */}
      {hasNextPage && (
        <div className="text-center">
          <Button
            onClick={onLoadMore}
            variant="outline"
            disabled={loading}
            aria-label="Cargar más productos"
          >
            {loading ? t("search.loadingMore") : t("search.loadMore")}
          </Button>
        </div>
      )}
    </div>
  );
}
