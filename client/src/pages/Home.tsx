import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard, Product } from "@/components/ProductCard";
import { BlogCard, BlogPost } from "@/components/BlogCard";
import { ArtistSection } from "@/components/ArtistSection";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import type { Product as DBProduct, BlogPost as DBBlogPost } from "@shared/schema";

const blogImages: string[] = [
  "/images/WhatsApp Image 2026-01-11 at 08.30.04.jpeg",
  "/images/WhatsApp Image 2026-01-11 at 08.30.05.jpeg",
  "/images/WhatsApp Image 2026-01-11 at 08.30.06.jpeg"
];

interface HomeProps {
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

function mapDBBlogPostToBlogPost(dbPost: DBBlogPost, index: number): BlogPost {
  return {
    id: String(dbPost.id),
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    image: blogImages[index % blogImages.length],
    category: dbPost.category,
    author: dbPost.author,
    readTime: dbPost.readTime,
    date: dbPost.publishedAt 
      ? new Date(dbPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Dec 16, 2024',
  };
}

export default function Home({ onAddToCart }: HomeProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: dbProducts = [], isLoading: productsLoading } = useQuery<DBProduct[]>({
    queryKey: ['/api/products'],
  });

  const { data: dbBlogPosts = [], isLoading: blogLoading } = useQuery<DBBlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const products = dbProducts.map(p => mapDBProductToProduct(p));
  const blogPosts = dbBlogPosts.slice(0, 3).map((p, i) => mapDBBlogPostToBlogPost(p, i));

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Fresh Drops
              </h2>
              <p className="text-muted-foreground">
                New arrivals and our top handmade picks
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="gap-2" data-testid="button-view-all">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Artist Section */}
      <ArtistSection />

      {/* Blog Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Studio Notes
              </h2>
              <p className="text-muted-foreground">
                Quick DIYs, behind-the-scenes, and inspo
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-2" data-testid="button-view-blog">
                Read More Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {blogLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-64 rounded-xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
              </div>
            </div>
          ) : blogPosts.length > 0 ? (
            <>
              {/* Featured Blog Post */}
              <div className="mb-8">
                <BlogCard post={blogPosts[0]} featured />
              </div>
              
              {/* Other Blog Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.slice(1).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Join the Crew
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Get early drops, free mini-patterns, and behind-the-scenes updates straight from my studio.
          </p>
          <form 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => { e.preventDefault(); console.log("Newsletter signup"); }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground"
              data-testid="input-newsletter-email"
            />
            <Button 
              type="submit" 
              variant="secondary"
              size="lg"
              data-testid="button-newsletter-signup"
            >
              Join
            </Button>
          </form>
        </div>
      </section>

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
  );
}
