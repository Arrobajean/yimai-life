/**
 * Shopify Configuration Validation Script
 * Run this to verify all environment variables are correctly configured
 */

import { ShopifyConfig } from "./config";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateShopifyConfig = (
  shopifyConfig: ShopifyConfig
): ValidationResult => {
  const errors: string[] = [];

  // Validar que el dominio esté presente
  if (!shopifyConfig.storeDomain || shopifyConfig.storeDomain.trim() === "") {
    errors.push("Store domain is required");
  }

  // Validar que el access token esté presente
  if (!shopifyConfig.accessToken || shopifyConfig.accessToken.trim() === "") {
    errors.push("Access token is required");
  }

  // Validar que la versión de la API esté presente
  if (!shopifyConfig.apiVersion || shopifyConfig.apiVersion.trim() === "") {
    errors.push("API version is required");
  }

  // Validar que el timeout sea un número positivo
  if (shopifyConfig.timeout <= 0) {
    errors.push("Timeout must be a positive number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
