// Configuración de Shopify Storefront API
const SHOPIFY_STORE_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "your-store.myshopify.com";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env
  .VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.error("VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN no está configurado");
}

// URL base para las consultas de Shopify (usando proxy en desarrollo y producción)
const SHOPIFY_API_URL = "/api/shopify/graphql";

// Variable para controlar logs únicos
const hasLoggedConnection = false;

// Función helper para ejecutar queries GraphQL
export const shopifyQuery = async <T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Solo agregar el token si no estamos usando el proxy (en producción)
    if (!import.meta.env.DEV) {
      headers["X-Shopify-Storefront-Access-Token"] =
        SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

    try {
      const response = await fetch(SHOPIFY_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query,
          variables,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(
          `GraphQL errors: ${data.errors
            .map((e: unknown) => (e as { message: string }).message)
            .join(", ")}`
        );
      }

      return data.data as T;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    // Don't log AbortError as it's expected when requests are cancelled
    // This happens when React Query cancels requests due to component unmounting
    // or query invalidation
    if (error instanceof Error && error.name === "AbortError") {
      // Silently re-throw AbortError without logging
      throw error;
    }

    console.error("❌ Error en query de Shopify:", error);
    throw error;
  }
};
