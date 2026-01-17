import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard, Product } from "@/components/ProductCard";
import { Heart, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";
import type { Product as DBProduct, Category } from "@shared/schema";

import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";
import blanketImg from "@assets/generated_images/crochet_blanket_product.png";
import toteImg from "@assets/generated_images/crochet_tote_bag.png";
import beanieImg from "@assets/generated_images/crochet_beanie_hat.png";
import coastersImg from "@assets/generated_images/crochet_coasters_set.png";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const categoryImages: Record<string, string> = {
  "fairy-puke": amigurumiImg,
  "bralettes": beanieImg,
  "femme": coastersImg,
  "bag-top-sets": toteImg,
  "shrugs-mesh-sleeves": blanketImg,
};

function mapDBProductToProduct(dbProduct: DBProduct, categories: Category[]): Product {
  const category = categories.find(c => c.id === dbProduct.categoryId);
  const categorySlug = category?.slug || "accessories";
  
  return {
    id: String(dbProduct.id),
    name: dbProduct.name,
    price: parseFloat(dbProduct.price),
    originalPrice: dbProduct.originalPrice ? parseFloat(dbProduct.originalPrice) : undefined,
    image: categoryImages[categorySlug] || amigurumiImg,
    category: category?.name || "Accessories",
    isNew: dbProduct.isNew || false,
    isSoldOut: dbProduct.isSoldOut || false,
    madeToOrder: dbProduct.madeToOrder || false,
    description: dbProduct.description || undefined,
    materials: dbProduct.materials || undefined,
    careInstructions: dbProduct.careInstructions || undefined,
    dimensions: dbProduct.dimensions || undefined,
  };
}

interface ExtendedProduct extends Product {
  description?: string;
  materials?: string;
  careInstructions?: string;
  dimensions?: string;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: dbProducts = [], isLoading } = useQuery<DBProduct[]>({
    queryKey: ['/api/products'],
  });

  const allProducts: ExtendedProduct[] = dbProducts.map(p => mapDBProductToProduct(p, categories));
  const product = allProducts.find((p) => p.id === id) || allProducts[0];
  const relatedProducts = allProducts.filter((p) => p.category === product?.category && p.id !== product?.id);
  
  const images = product ? [product.image, product.image, product.image, product.image] : [];

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4">
          <Skeleton className="h-10 w-40 mb-6" />
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <Link href="/shop">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-card">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge>New Arrival</Badge>}
              {product.madeToOrder && <Badge variant="secondary">Made to Order (2-3 weeks)</Badge>}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description || `This adorable handmade piece is lovingly crafted with premium yarn and attention 
              to every detail. Perfect for gifting or adding a cozy, handcrafted touch to your 
              home. Each piece is unique and may have slight variations, which adds to its 
              handmade charm.`}
            </p>

            <div className="space-y-4 border-t border-b py-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-qty"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-qty"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} data-testid="button-add-to-cart">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  data-testid="button-wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>Quality guarantee on all items</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span>Easy returns within 30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                data-testid="tab-details"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                data-testid="tab-materials"
              >
                Materials & Care
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                data-testid="tab-shipping"
              >
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Each piece is handcrafted with love in my home studio. This item features 
                  intricate stitchwork and premium materials that ensure durability and a 
                  beautiful finish.
                </p>
                <ul>
                  <li>Handmade with attention to every detail</li>
                  {product.dimensions && <li>{product.dimensions}</li>}
                  <li>Soft, huggable design</li>
                  <li>Safety eyes securely attached (if applicable)</li>
                  <li>Stuffed with premium polyester fiberfill (if applicable)</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="materials" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Materials</h3>
                <p>{product.materials || "100% premium acrylic yarn, polyester fiberfill stuffing"}</p>
                <h3>Care Instructions</h3>
                <p>{product.careInstructions || "Spot clean with mild soap and water. Air dry completely before use. Do not machine wash or tumble dry. Keep away from direct heat sources."}</p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Processing Time</h3>
                <p>
                  Ready-made items ship within 1-3 business days. Made-to-order items 
                  require 2-3 weeks for creation before shipping.
                </p>
                <h3>Shipping Options</h3>
                <ul>
                  <li>Standard Shipping: 5-7 business days</li>
                  <li>Express Shipping: 2-3 business days</li>
                  <li>Free shipping on orders over $75</li>
                </ul>
                <h3>International Shipping</h3>
                <p>
                  We ship worldwide! International orders typically take 2-4 weeks 
                  depending on destination.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
