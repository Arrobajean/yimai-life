import { describe, it, expect } from "vitest";
import { validateShopifyConfig } from "../src/services/shopify/validation";
import {
  getPriceRange,
  hasDiscount,
  getDiscountPercentage,
  formatVariantPrice,
} from "../src/services/shopify/variants";

const baseConfig = (over: Record<string, unknown> = {}) => ({
  storeDomain: "tienda.myshopify.com",
  storefrontAccessToken: "token",
  apiVersion: "2024-10",
  environment: "development",
  enableMock: false,
  enableLogging: false,
  timeout: 10000,
  retryAttempts: 3,
  fallbackApiVersion: "2024-07",
  enableDiagnostics: false,
  maxRetries: 3,
  retryDelay: 1000,
  ...over,
});

describe("validateShopifyConfig", () => {
  it("config completa valida; sin dominio/token/version no", () => {
    expect(validateShopifyConfig(baseConfig() as never).isValid).toBe(true);
    expect(validateShopifyConfig(baseConfig({ storeDomain: "" }) as never).isValid).toBe(false);
    expect(
      validateShopifyConfig(baseConfig({ storefrontAccessToken: "" }) as never).errors
    ).toContain("Access token is required");
  });
});

describe("variants", () => {
  it("formatVariantPrice en es-ES/EUR", () => {
    const s = formatVariantPrice({ amount: "29.99", currencyCode: "EUR" });
    expect(s).toContain("29,99");
  });

  it("getPriceRange null -> ceros", () => {
    expect(getPriceRange(null)).toEqual({ min: 0, max: 0, currencyCode: "USD" });
  });

  it("hasDiscount y getDiscountPercentage", () => {
    expect(hasDiscount(null)).toBe(false);
    expect(
      getDiscountPercentage({
        price: { amount: "80", currencyCode: "EUR" },
        compareAtPrice: { amount: "100", currencyCode: "EUR" },
      } as never)
    ).toBe(20);
    expect(
      getDiscountPercentage({
        price: { amount: "100", currencyCode: "EUR" },
        compareAtPrice: null,
      } as never)
    ).toBeNull();
  });
});
