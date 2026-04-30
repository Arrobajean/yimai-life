import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useShopifySearch } from "@/components/shopify/hooks/useShopifySearch";
import {
  type SearchFilters,
  type ProductFilters,
  type SortOptions,
} from "@/services/shopify/types";
import { PRODUCT_SORT_OPTIONS } from "@/services/shopify/sort-keys";
import { InteractiveShopifyProductCard } from "../cards/InteractiveShopifyProductCard";
import { useLanguage } from "@/providers/CartProvider";

interface SearchUIProps {
  className?: string;
  showFilters?: boolean;
  showSort?: boolean;
  productsPerPage?: number;
  initialQuery?: string;
}

export function SearchUI({
  className = "",
  showFilters = true,
  showSort = true,
  productsPerPage = 20,
  initialQuery = "",
}: SearchUIProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ProductFilters>({});
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

  const sortOptions = PRODUCT_SORT_OPTIONS;

  // Calculate active filters count
  const activeFiltersCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key as keyof ProductFilters]
  ).length;

  // Function to clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Barra de búsqueda */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="product-search-ui"
            name="product-search-ui"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {showFilters && (
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {t("search.filtersLabel")}
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
            {isFiltersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}

        {showSort && (
          <Select
            value={sortOption.key}
            onValueChange={(value) =>
              setSortOption({ key: value as any, reverse: false })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("search.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearAllFilters} size="sm">
            <X className="h-4 w-4 mr-1" />
            {t("search.clearFilters")}
          </Button>
        )}
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleContent>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("search.filtersLabel")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {loadingFilters ? (
                  <div className="text-center py-4">{t("search.loadingFilters")}</div>
                ) : availableFilters ? (
                  <>
                    {/* Filtro de precio */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        {t("search.priceRange")}
                      </Label>
                      <Slider
                        min={availableFilters.priceRange.min}
                        max={availableFilters.priceRange.max}
                        step={1}
                        value={[
                          activeFilters.price?.min ||
                            availableFilters.priceRange.min,
                          activeFilters.price?.max ||
                            availableFilters.priceRange.max,
                        ]}
                        onValueChange={handlePriceChange}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          $
                          {activeFilters.price?.min ||
                            availableFilters.priceRange.min}
                        </span>
                        <span>
                          $
                          {activeFilters.price?.max ||
                            availableFilters.priceRange.max}
                        </span>
                      </div>
                    </div>

                    {/* Filtro de disponibilidad */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        {t("search.availability")}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="available"
                          checked={activeFilters.available === true}
                          onCheckedChange={(checked) =>
                            handleAvailabilityChange(checked as boolean)
                          }
                        />
                        <Label htmlFor="available" className="text-sm">
                          Solo productos disponibles
                        </Label>
                      </div>
                    </div>

                    {/* Filtro de tipo de producto */}
                    {availableFilters.productTypes.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Tipo de producto
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {availableFilters.productTypes
                            .slice(0, 10)
                            .map((type) => (
                              <div
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`type-${type}`}
                                  checked={
                                    activeFilters.productType?.includes(type) ||
                                    false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleProductTypeChange(type)
                                  }
                                />
                                <Label
                                  htmlFor={`type-${type}`}
                                  className="text-sm"
                                >
                                  {type}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Filtro de vendor */}
                    {availableFilters.vendors.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Marca</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {availableFilters.vendors
                            .slice(0, 10)
                            .map((vendor) => (
                              <div
                                key={vendor}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`vendor-${vendor}`}
                                  checked={
                                    activeFilters.vendor?.includes(vendor) ||
                                    false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleVendorChange(vendor)
                                  }
                                />
                                <Label
                                  htmlFor={`vendor-${vendor}`}
                                  className="text-sm"
                                >
                                  {vendor}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Filtro de tags */}
                    {availableFilters.tags.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Etiquetas</Label>
                        <div className="flex flex-wrap gap-2">
                          {availableFilters.tags.slice(0, 20).map((tag) => (
                            <div
                              key={tag}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`tag-${tag}`}
                                checked={
                                  activeFilters.tags?.includes(tag) || false
                                }
                                onCheckedChange={(checked) =>
                                  handleTagChange(tag)
                                }
                              />
                              <Label htmlFor={`tag-${tag}`} className="text-sm">
                                {tag}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No se pudieron cargar los filtros
                  </div>
                )}
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Resultados */}
      <div className="space-y-4">
        {/* Información de resultados */}
        {!loading && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {totalResults} producto{totalResults !== 1 ? "s" : ""} encontrado
              {totalResults !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Buscando productos...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-2">Error al buscar productos</p>
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Lista de productos */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-6">
            {products.map((product) => (
              <ShopifyProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {!loading && !error && (!products || products.length === 0) && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No se encontraron productos</p>
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="mt-2"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Botón de cargar más */}
        {hasNextPage && (
          <div className="text-center">
            <Button onClick={loadMore} variant="outline" disabled={loading}>
              {loading ? "Cargando..." : "Cargar más productos"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
