import { useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, ShoppingCart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSoldOut?: boolean;
  madeToOrder?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-visible relative" data-testid={`card-product-${product.id}`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="text-xs">New</Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discount}%
            </Badge>
          )}
          {product.madeToOrder && (
            <Badge variant="secondary" className="text-xs">
              Made to Order
            </Badge>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm ${isWishlisted ? "text-primary" : ""}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <div className="flex gap-2">
            {!product.isSoldOut && (
              <Button
                className="flex-1"
                onClick={() => onAddToCart(product)}
                data-testid={`button-add-cart-${product.id}`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            )}
            {onQuickView && (
              <Button
                variant="outline"
                size="icon"
                className="bg-background/90 backdrop-blur-sm"
                onClick={() => onQuickView(product)}
                data-testid={`button-quick-view-${product.id}`}
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {product.isSoldOut && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      <Link href={`/product/${product.id}`}>
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
