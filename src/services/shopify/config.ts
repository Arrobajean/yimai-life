/**
 * Shopify Configuration Manager
 * Validates and manages Shopify environment variables
 */

export interface ShopifyConfig {
  storeDomain: string;
  storefrontAccessToken: string;
  apiKey: string;
  apiSecret: string;
  apiVersion: string;
  environment: "development" | "production";
  enableMock: boolean;
  enableLogging: boolean;
  timeout: number;
  retryAttempts: number;
  proxyUrl?: string;
  fallbackApiVersion: string;
  enableDiagnostics: boolean;
  maxRetries: number;
  retryDelay: number;
}

export class ShopifyConfigManager {
  private config: ShopifyConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): ShopifyConfig {
    return {
      storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "",
      storefrontAccessToken:
        import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
      apiKey: import.meta.env.VITE_SHOPIFY_API_KEY || "",
      apiSecret: import.meta.env.VITE_SHOPIFY_API_SECRET || "",
      apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION || "2024-10",
      environment:
        (import.meta.env.VITE_SHOPIFY_ENVIRONMENT as
          | "development"
          | "production") || "development",
      enableMock: import.meta.env.VITE_SHOPIFY_ENABLE_MOCK === "true",
      enableLogging: import.meta.env.VITE_SHOPIFY_ENABLE_LOGGING === "true",
      timeout: parseInt(import.meta.env.VITE_SHOPIFY_TIMEOUT || "10000"),
      retryAttempts: parseInt(
        import.meta.env.VITE_SHOPIFY_RETRY_ATTEMPTS || "3"
      ),
      proxyUrl: import.meta.env.VITE_SHOPIFY_PROXY_URL || undefined,
      fallbackApiVersion:
        import.meta.env.VITE_SHOPIFY_FALLBACK_API_VERSION || "2024-07",
      enableDiagnostics:
        import.meta.env.VITE_SHOPIFY_ENABLE_DIAGNOSTICS === "true",
      maxRetries: parseInt(import.meta.env.VITE_SHOPIFY_MAX_RETRIES || "3"),
      retryDelay: parseInt(import.meta.env.VITE_SHOPIFY_RETRY_DELAY || "1000"),
    };
  }

  /**
   * Validates that all required configuration variables are present
   */
  validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.storeDomain) {
      errors.push("VITE_SHOPIFY_STORE_DOMAIN is required");
    }

    if (!this.config.storefrontAccessToken) {
      errors.push("VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN is required");
    }

    if (!this.config.apiKey) {
      errors.push("VITE_SHOPIFY_API_KEY is required");
    }

    if (!this.config.apiSecret) {
      errors.push("VITE_SHOPIFY_API_SECRET is required");
    }

    if (!this.config.apiVersion) {
      errors.push("VITE_SHOPIFY_API_VERSION is required");
    }

    // Validate store domain format
    if (
      this.config.storeDomain &&
      !this.config.storeDomain.includes(".myshopify.com")
    ) {
      errors.push(
        "VITE_SHOPIFY_STORE_DOMAIN must be a valid Shopify domain (*.myshopify.com)"
      );
    }

    // Validate API version format
    if (
      this.config.apiVersion &&
      !/^\d{4}-\d{2}$/.test(this.config.apiVersion)
    ) {
      errors.push(
        "VITE_SHOPIFY_API_VERSION must be in format YYYY-MM (e.g., 2024-10)"
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Gets the complete API URL for Shopify Storefront API
   */
  getApiUrl(): string {
    return `https://${this.config.storeDomain}/api/${this.config.apiVersion}/graphql.json`;
  }

  /**
   * Gets the headers required for Shopify API requests
   */
  getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": this.config.storefrontAccessToken,
    };
  }

  /**
   * Checks if the configuration is properly set up
   */
  isConfigured(): boolean {
    return this.validateConfig().isValid;
  }

  /**
   * Gets the current configuration
   */
  getConfig(): ShopifyConfig {
    return { ...this.config };
  }

  /**
   * Logs configuration status (without sensitive data)
   */
  logConfigStatus(): void {
    const validation = this.validateConfig();
    // Configuration status logging removed for cleaner console
  }
}

// Export singleton instance
export const shopifyConfig = new ShopifyConfigManager();
