import React from "react";
import { ShoppingCart, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInteractiveProductCard } from "../hooks/useInteractiveProductCard";
import { ShopifyProduct } from "../types/ShopifyProduct";
import { useLanguage } from "@/providers/CartProvider";
import "@/styles/components/interactive-card/InteractiveCard.css";

interface InteractiveShopifyProductCardProps {
  product: ShopifyProduct;
  className?: string;
}

export const InteractiveShopifyProductCard: React.FC<
  InteractiveShopifyProductCardProps
> = ({ product, className = "" }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    isClicked,
    firstImage,
    firstVariant,
    isAvailable,
    formatPrice,
    handleAddToCart,
    handleRemoveFromCart,
  } = useInteractiveProductCard(product);

  const handleImageClick = () => {
    navigate(`/product/${product.handle}`);
  };

  return (
    <div className={`interactive-card-wrapper ${className}`}>
      <div className="interactive-card-container">
        <div
          className="interactive-card-top"
          style={{
            backgroundImage: firstImage ? `url(${firstImage.url})` : "none",
            cursor: "pointer",
          }}
          onClick={handleImageClick}
        >
          {!firstImage && (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f4f4f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
              }}
            >
              Sin imagen
            </div>
          )}
        </div>
        <div
          className={`interactive-card-bottom ${isClicked ? "clicked" : ""}`}
        >
          <div className="interactive-card-left">
            <div className="interactive-card-details">
              <span className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                {product.title}
              </span>
              <p>
                {formatPrice(
                  firstVariant?.price || product.priceRange.minVariantPrice
                )}
              </p>
            </div>
            <div
              className="interactive-card-buy"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              <ShoppingCart />
            </div>
          </div>
          <div className="interactive-card-right">
            <div className="interactive-card-done">
              <Check />
            </div>
            <div className="interactive-card-details">
              <p className="font-semibold">{t("cart.addedToCart")}</p>
            </div>
            <div
              className="interactive-card-remove"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromCart();
              }}
            >
              <X />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
