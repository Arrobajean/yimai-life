import React from "react";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/providers/CartProvider";
import { type SortOptions } from "@/services/shopify/types";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  showFilters: boolean;
  showSort: boolean;
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
  activeFiltersCount: number;
  sortOption: SortOptions;
  onSortOptionChange: (option: SortOptions) => void;
  sortOptions: Array<{
    key: string;
    reverse: boolean;
    translationKey: string;
  }>;
  onClearAllFilters: () => void;
}

export function SearchBar({
  searchQuery,
  onSearchQueryChange,
  showFilters,
  showSort,
  isFiltersOpen,
  onToggleFilters,
  activeFiltersCount,
  sortOption,
  onSortOptionChange,
  sortOptions,
  onClearAllFilters,
}: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-4 items-center hidden md:flex">
      {/* Barra de búsqueda */}
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          aria-hidden="true"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              id="product-search"
              name="product-search"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="pl-10"
              aria-label={t("search.searchProductsLabel")}
              role="searchbox"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("search.tooltip.searchInput")}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Botón de filtros */}
      {showFilters && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={onToggleFilters}
              className="flex items-center gap-2"
              aria-expanded={isFiltersOpen}
              aria-controls="filters-panel"
              aria-label="Mostrar filtros de búsqueda"
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              {t("search.filters")}
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1"
                  aria-label={`${activeFiltersCount} filtros activos`}
                >
                  {activeFiltersCount}
                </Badge>
              )}
              {isFiltersOpen ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("search.tooltip.filters")}</p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Selector de ordenamiento */}
      {showSort && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Select
              value={`${sortOption.key}-${
                sortOption.reverse ? "reverse" : "normal"
              }`}
              onValueChange={(value) => {
                const [key, reverse] = value.split("-");
                onSortOptionChange({
                  key: key as SortOptions["key"],
                  reverse: reverse === "reverse",
                });
              }}
            >
              <SelectTrigger
                className="w-48"
                aria-label="Ordenar productos por"
              >
                <SelectValue placeholder={t("search.sortBy")} />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={`${option.key}-${
                      option.reverse ? "reverse" : "normal"
                    }`}
                    value={`${option.key}-${
                      option.reverse ? "reverse" : "normal"
                    }`}
                    aria-label={t(option.translationKey)}
                  >
                    {t(option.translationKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("search.tooltip.sort")}</p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Botón de limpiar filtros */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          onClick={onClearAllFilters}
          size="sm"
          aria-label="Limpiar todos los filtros"
        >
          <X className="h-4 w-4 mr-1" aria-hidden="true" />
          {t("search.clearFilters")}
        </Button>
      )}
    </div>
  );
}
