# Yimai Life — tienda + blog (demo Vite + Shopify Storefront)

![licencia](https://img.shields.io/badge/license-MIT-green)

Demo pública en Vite del e-commerce de medicina tradicional china Yimai Life:
catálogo contra Shopify Storefront API y blog con editor TipTap.

> **Producción real:** `https://yimailife.es` corre sobre otra base de código
> (Next.js, repo privado `yimai_life`). Este repo es la demo pública, no el
> sitio en producción.

## Qué demuestra este proyecto

- Integración Shopify Storefront API (solo dominio + token público; sin
  secretos en el cliente) con queries, variantes y carrito.
- Editor TipTap v3 con plantillas y panel de administración en demo local.
- Abstracción `BlogRepository` para migrar el blog a backend real sin tocar
  las páginas.

## Stack

React 18, Vite 5, TypeScript, Tailwind, shadcn/ui, TipTap 3,
Shopify Storefront API, Vitest.

## Demo

URL del deploy de esta demo (Vercel). La tienda en producción es
`https://yimailife.es` (otra base de código, privada).

## Cómo ejecutarlo

```bash
npm install
cp .env.example .env.local   # rellena dominio + Storefront token
npm run dev
```

Variables (`.env.example`): `VITE_SHOPIFY_STORE_DOMAIN`,
`VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `VITE_SHOPIFY_API_VERSION`.
Con `VITE_SHOPIFY_ENABLE_MOCK=true` funciona sin tienda.

## Tests

```bash
npm test        # Vitest: blogService + shopify/validation + variants
npm run build   # build de producción
```

## Decisiones y trade-offs

- Storefront en el cliente solo con token público; nada de Admin API ni
  `apiKey/apiSecret` (un `VITE_*` acaba en el bundle).
- Blog en `localStorage` tras una interfaz `BlogRepository`
  (`src/services/blogRepository.ts`): migrar a Firestore/Supabase + auth es
  crear otra implementación, sin tocar las páginas.

## Limitaciones conocidas (honestas)

- El blog **persiste en `localStorage`** (`yimailife_blog_posts_v1`): cada
  navegador ve sus propios posts; no hay backend ni login.
- Las rutas `/admin/blog*` son una **demo local sin autenticación**: solo se
  montan con `VITE_ENABLE_ADMIN_DEMO=true` (desarrollo); en producción
  devuelven 404 y el enlace Admin se oculta.

## Cómo se construyó

Scaffold Vite + shadcn; integración Shopify, blog TipTap y panel admin como
trabajo propio. Sin plantillas de cliente.

## Licencia

MIT.
