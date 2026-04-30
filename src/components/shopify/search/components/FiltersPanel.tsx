import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLanguage } from "@/providers/CartProvider";
import { type ProductFilters } from "@/services/shopify/types";

interface FiltersPanelProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  activeFilters: ProductFilters;
  onActiveFiltersChange: (filters: ProductFilters) => void;
  availableFilters: unknown;
  loadingFilters: boolean;
}

export function FiltersPanel({
  isOpen,
  onToggle,
  activeFilters,
  onActiveFiltersChange,
  availableFilters,
  loadingFilters,
}: FiltersPanelProps) {
  const { t } = useLanguage();

  // Manejar filtros de disponibilidad
  const handleAvailabilityChange = (
    available: boolean | undefined,
    isChecked: boolean
  ) => {
    onActiveFiltersChange((prev) => {
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

  // Manejar cambio de precio mínimo
  const handleMinPriceChange = (value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    onActiveFiltersChange((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        min: numValue,
      },
    }));
  };

  // Manejar cambio de precio máximo
  const handleMaxPriceChange = (value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    onActiveFiltersChange((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        max: numValue,
      },
    }));
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleContent
        id="filters-panel"
        role="region"
        aria-labelledby="filters-title"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="filters-title" className="text-lg">
              {t("search.filters")}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggle(false)}
              className="h-6 w-6 p-0"
              aria-label="Cerrar filtros"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {loadingFilters ? (
              <div
                className="text-center py-4"
                role="status"
                aria-live="polite"
              >
                {t("search.loadingFilters")}
              </div>
            ) : availableFilters ? (
              <>
                {/* Filtro de precio */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    {t("search.priceRange")}
                  </Label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <Label
                        htmlFor="min-price"
                        className="text-xs text-muted-foreground"
                      >
                        {t("search.minPrice")}
                      </Label>
                      <Input
                        id="min-price"
                        name="min-price"
                        type="number"
                        placeholder="0"
                        value={activeFilters.price?.min || ""}
                        onChange={(e) => handleMinPriceChange(e.target.value)}
                        className="w-full"
                        aria-label="Precio mínimo"
                      />
                    </div>
                    <div className="text-muted-foreground">-</div>
                    <div className="flex-1">
                      <Label
                        htmlFor="max-price"
                        className="text-xs text-muted-foreground"
                      >
                        {t("search.maxPrice")}
                      </Label>
                      <Input
                        id="max-price"
                        name="max-price"
                        type="number"
                        placeholder={availableFilters.priceRange.max.toString()}
                        value={activeFilters.price?.max || ""}
                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                        className="w-full"
                        aria-label="Precio máximo"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("search.highestPrice")}
                    {availableFilters.priceRange.max}
                  </p>
                </div>

                {/* Filtro de disponibilidad */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    {t("search.availability")}
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available-true"
                        checked={activeFilters.available === true}
                        onCheckedChange={(checked) =>
                          handleAvailabilityChange(true, checked as boolean)
                        }
                        aria-describedby="available-true-description"
                      />
                      <Label htmlFor="available-true" className="text-sm">
                        {t("search.inStock")}
                      </Label>
                    </div>
                    <div id="available-true-description" className="sr-only">
                      Mostrar solo productos en stock
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available-false"
                        checked={activeFilters.available === false}
                        onCheckedChange={(checked) =>
                          handleAvailabilityChange(false, checked as boolean)
                        }
                        aria-describedby="available-false-description"
                      />
                      <Label htmlFor="available-false" className="text-sm">
                        {t("search.outOfStock")}
                      </Label>
                    </div>
                    <div id="available-false-description" className="sr-only">
                      Mostrar solo productos agotados
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="text-center py-4 text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                {t("search.couldNotLoadFilters")}
              </div>
            )}
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
