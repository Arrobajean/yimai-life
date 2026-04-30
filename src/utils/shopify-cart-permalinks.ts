/**
 * Shopify Cart Permalinks Utilities
 *
 * Cart Permalinks are permanent URLs that Shopify generates for each cart.
 * They include the correct domain and are absolute URLs, making them perfect
 * for checkout redirection.
 */

export interface CartPermalinkInfo {
  isPermalink: boolean;
  domain: string;
  cartId: string;
  key: string;
  fullUrl: string;
}

/**
 * Parse a Shopify checkout URL to extract cart permalink information
 */
export function parseCartPermalink(url: string): CartPermalinkInfo | null {
  try {
    // Check if it's a cart permalink URL
    const cartPermalinkRegex =
      /^https?:\/\/([^/]+)\/cart\/c\/([^?]+)\?key=([^&]+)$/;
    const match = url.match(cartPermalinkRegex);

    if (!match) {
      return null;
    }

    const [, domain, cartId, key] = match;

    return {
      isPermalink: true,
      domain,
      cartId,
      key,
      fullUrl: url,
    };
  } catch (error) {
    console.error("Error parsing cart permalink:", error);
    return null;
  }
}

/**
 * Validate if a URL is a valid Shopify cart permalink
 */
export function isValidCartPermalink(url: string): boolean {
  const permalinkInfo = parseCartPermalink(url);
  return permalinkInfo !== null;
}

/**
 * Get the expected domain for cart permalinks based on environment
 */
export function getExpectedCartDomain(): string {
  const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;

  if (storeDomain) {
    // If we have a custom domain configured, use it
    return storeDomain.replace(".myshopify.com", "");
  }

  // Fallback to the default Shopify domain
  return "jrve0v-kh.myshopify.com";
}

/**
 * Check if a cart permalink URL is using the correct domain
 */
export function isUsingCorrectDomain(url: string): boolean {
  const permalinkInfo = parseCartPermalink(url);
  if (!permalinkInfo) {
    return false;
  }

  const expectedDomain = getExpectedCartDomain();
  return permalinkInfo.domain === expectedDomain;
}

/**
 * Log cart permalink information for debugging
 */
export function logCartPermalinkInfo(url: string): void {
  // Log cart permalink information for debugging
  const permalinkInfo = parseCartPermalink(url);
}
