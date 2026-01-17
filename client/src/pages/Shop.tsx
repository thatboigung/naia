import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard, Product } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product as DBProduct } from "@shared/schema";

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

function mapDBProductToProduct(dbProduct: DBProduct): Product {
  return {
    id: String(dbProduct.id),
    name: dbProduct.name,
    price: parseFloat(dbProduct.price),
    originalPrice: dbProduct.originalPrice ? parseFloat(dbProduct.originalPrice) : undefined,
    image: dbProduct.image,
    category: "Handmade",
    isNew: dbProduct.isNew || false,
    isSoldOut: dbProduct.isSoldOut || false,
    madeToOrder: dbProduct.madeToOrder || false,
  };
}

export default function Shop({ onAddToCart }: ShopProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: dbProducts = [], isLoading: productsLoading } = useQuery<DBProduct[]>({
    queryKey: ['/api/products'],
  });

  const products = dbProducts.map(p => mapDBProductToProduct(p));

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      );
    }
    
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }
    
    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">
            Discover unique handcrafted pieces
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-shop-search"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]" data-testid="select-sort">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredProducts.length} products
        </p>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No products found matching your search
            </p>
            <Button onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}

        <QuickViewModal
          product={quickViewProduct}
          open={!!quickViewProduct}
          onOpenChange={(open) => !open && setQuickViewProduct(null)}
          onAddToCart={(product, quantity) => {
            for (let i = 0; i < quantity; i++) {
              onAddToCart(product);
            }
          }}
        />
      </div>
    </div>
  );
}
