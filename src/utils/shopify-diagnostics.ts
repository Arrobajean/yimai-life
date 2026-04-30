interface DiagnosticResult {
  component: string;
  status: "OK" | "WARNING" | "ERROR";
  message: string;
  details?: unknown;
  suggestions?: string[];
}

interface ShopifyConfig {
  storeDomain: string;
  storefrontAccessToken: string;
  apiVersion: string;
  environment: string;
}

class ShopifyDiagnostics {
  private config: ShopifyConfig;

  constructor() {
    this.config = {
      storeDomain:
        import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "ohannausa.myshopify.com",
      storefrontAccessToken:
        import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
      apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION || "2024-10",
      environment: import.meta.env.VITE_SHOPIFY_ENVIRONMENT || "production",
    };
  }

  async runFullDiagnostic(): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];

    // Test 1: Configuration validation
    results.push(await this.validateConfiguration());

    // Test 2: Domain connectivity
    results.push(await this.testDomainConnectivity());

    // Test 3: API endpoint test
    results.push(await this.testApiEndpoint());

    // Test 4: GraphQL query test
    results.push(await this.testGraphQLQuery());

    return results;
  }

  private async validateConfiguration(): Promise<DiagnosticResult> {
    const issues: string[] = [];
    const suggestions: string[] = [];

    if (!this.config.storeDomain) {
      issues.push("Store domain not configured");
      suggestions.push("Set VITE_SHOPIFY_STORE_DOMAIN environment variable");
    }

    if (!this.config.storefrontAccessToken) {
      issues.push("Storefront access token not configured");
      suggestions.push(
        "Set VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable"
      );
    }

    if (!this.config.apiVersion) {
      issues.push("API version not configured");
      suggestions.push("Set VITE_SHOPIFY_API_VERSION environment variable");
    }

    if (issues.length === 0) {
      return {
        component: "Configuration",
        status: "OK",
        message: "All configuration variables are set",
        details: {
          storeDomain: this.config.storeDomain,
          hasToken: !!this.config.storefrontAccessToken,
          apiVersion: this.config.apiVersion,
          environment: this.config.environment,
        },
      };
    }

    return {
      component: "Configuration",
      status: "ERROR",
      message: `Configuration issues: ${issues.join(", ")}`,
      details: { issues },
      suggestions,
    };
  }

  private async testDomainConnectivity(): Promise<DiagnosticResult> {
    try {
      const response = await fetch(`https://${this.config.storeDomain}`, {
        method: "HEAD",
        mode: "no-cors",
      });

      return {
        component: "Domain Connectivity",
        status: "OK",
        message: `Successfully connected to ${this.config.storeDomain}`,
        details: {
          domain: this.config.storeDomain,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return {
        component: "Domain Connectivity",
        status: "ERROR",
        message: `Cannot connect to ${this.config.storeDomain}`,
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
        suggestions: [
          "Check internet connection",
          "Verify domain is accessible",
          "Check for CORS issues",
        ],
      };
    }
  }

  private async testApiEndpoint(): Promise<DiagnosticResult> {
    try {
      const apiUrl = `https://${this.config.storeDomain}/api/${this.config.apiVersion}/graphql.json`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            this.config.storefrontAccessToken,
        },
        body: JSON.stringify({
          query: `{ shop { name } }`,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.errors) {
          return {
            component: "API Endpoint",
            status: "WARNING",
            message: "API endpoint accessible but returned GraphQL errors",
            details: { errors: data.errors },
            suggestions: [
              "Check GraphQL query syntax",
              "Verify API permissions",
            ],
          };
        }

        return {
          component: "API Endpoint",
          status: "OK",
          message: "API endpoint is working correctly",
          details: {
            url: apiUrl,
            shopName: data.data?.shop?.name || "Unknown",
            timestamp: new Date().toISOString(),
          },
        };
      }

      return {
        component: "API Endpoint",
        status: "ERROR",
        message: `API endpoint returned ${response.status}: ${response.statusText}`,
        details: {
          status: response.status,
          statusText: response.statusText,
          url: apiUrl,
        },
        suggestions: [
          "Check API version compatibility",
          "Verify access token permissions",
          "Check if Shopify API is available",
        ],
      };
    } catch (error) {
      return {
        component: "API Endpoint",
        status: "ERROR",
        message: "Failed to test API endpoint",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
        suggestions: [
          "Check network connectivity",
          "Verify API URL format",
          "Check CORS configuration",
        ],
      };
    }
  }

  private async testGraphQLQuery(): Promise<DiagnosticResult> {
    try {
      const testQuery = `
        query testQuery {
          shop {
            name
            description
            primaryDomain {
              url
            }
          }
          products(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `;

      const response = await fetch(`/api/shopify/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: testQuery,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.errors) {
          return {
            component: "GraphQL Query",
            status: "WARNING",
            message: "GraphQL query executed but returned errors",
            details: { errors: data.errors },
            suggestions: [
              "Check query permissions",
              "Verify required fields exist",
            ],
          };
        }

        return {
          component: "GraphQL Query",
          status: "OK",
          message: "GraphQL queries working correctly",
          details: {
            shopName: data.data?.shop?.name,
            productCount: data.data?.products?.edges?.length || 0,
            timestamp: new Date().toISOString(),
          },
        };
      }

      return {
        component: "GraphQL Query",
        status: "ERROR",
        message: `GraphQL proxy returned ${response.status}`,
        details: {
          status: response.status,
          statusText: response.statusText,
        },
        suggestions: [
          "Check proxy configuration",
          "Verify API endpoint is working",
        ],
      };
    } catch (error) {
      return {
        component: "GraphQL Query",
        status: "ERROR",
        message: "Failed to execute GraphQL query",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
        suggestions: [
          "Check proxy server is running",
          "Verify GraphQL endpoint configuration",
        ],
      };
    }
  }

  async testConnection(): Promise<boolean> {
    const results = await this.runFullDiagnostic();
    return results.every((result) => result.status === "OK");
  }

  getConnectionStatus(): "CONNECTED" | "PARTIAL" | "DISCONNECTED" {
    // This would be implemented to check current connection status
    return "DISCONNECTED"; // Placeholder
  }
}

export { ShopifyDiagnostics, type DiagnosticResult };
