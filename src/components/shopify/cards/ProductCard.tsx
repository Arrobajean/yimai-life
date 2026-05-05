import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { cardReveal } from "@/lib/motion";

interface ProductCardProps {
  handle: string;
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  price: { amount: string; currencyCode: string };
  collection?: string;
  onAddToCart?: (handle: string) => void;
}

const formatPrice = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: currencyCode }).format(
    parseFloat(amount)
  );

export function ProductCard({
  handle,
  title,
  imageUrl,
  imageAlt,
  price,
  onAddToCart,
}: ProductCardProps) {
  return (
    <m.div variants={cardReveal} className="group flex flex-col">
      {/* Imagen */}
      <Link to={`/product/${handle}`} className="block">
        <div className="aspect-square overflow-hidden bg-secondary mb-3">
          {imageUrl ? (
            <m.img
              src={imageUrl}
              alt={imageAlt || title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-end p-3">
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                Sin imagen
              </span>
            </div>
          )}
        </div>

        {/* Título y precio */}
        <p className="text-sm font-medium truncate group-hover:opacity-70 transition-opacity duration-200">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatPrice(price.amount, price.currencyCode)}
          <span className="ml-1 text-[10px]">/ ud.</span>
        </p>
      </Link>

      {/* Botón añadir al carrito */}
      <button
        onClick={() => onAddToCart?.(handle)}
        className="mt-3 w-full text-[10px] tracking-[0.12em] uppercase border border-border py-2
                   hover:bg-foreground hover:text-background hover:border-foreground
                   transition-colors duration-200"
      >
        Añadir al carrito
      </button>
    </m.div>
  );
}
