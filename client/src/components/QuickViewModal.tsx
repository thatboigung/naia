import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "./ProductCard";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function QuickViewModal({ product, open, onOpenChange, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onOpenChange(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h2 className="font-serif text-2xl font-bold">{product.name}</h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge>New Arrival</Badge>}
              {product.madeToOrder && <Badge variant="secondary">Made to Order</Badge>}
            </div>

            <p className="text-muted-foreground">
              This adorable handmade piece is crafted with premium yarn and love. 
              Perfect for gifting or adding a cozy touch to your space.
            </p>

            {!product.isSoldOut ? (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      data-testid="button-modal-decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="button-modal-increase"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={handleAddToCart} data-testid="button-modal-add-cart">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    data-testid="button-modal-wishlist"
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
                  </Button>
                </div>
              </>
            ) : (
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Currently Sold Out
              </Badge>
            )}

            <Link href={`/product/${product.id}`} onClick={() => onOpenChange(false)}>
              <Button variant="ghost" className="w-full mt-2" data-testid="button-view-details">
                View Full Details
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
