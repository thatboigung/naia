import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Menu, Search, User, ChevronDown, Heart, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface HeaderProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const categories = [
  { name: "Fairy Puke", href: "/shop?category=fairy-puke" },
  { name: "Bralettes", href: "/shop?category=bralettes" },
  { name: "Femme", href: "/shop?category=femme" },
  { name: "Bag + Top Sets", href: "/shop?category=bag-top-sets" },
  { name: "Shrugs / Mesh Sleeves", href: "/shop?category=shrugs-mesh-sleeves" },
];

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Admin", href: "/admin" },
];

export function Header({ cartItems, onRemoveFromCart, onUpdateQuantity }: HeaderProps) {
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" data-testid="link-home">
                <span className="font-serif text-xl font-bold tracking-tight">
                NAIA
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1" data-testid="button-categories">
                    Shop
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/shop" data-testid="link-all-products">
                      All Products
                    </Link>
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link href={category.href} data-testid={`link-category-${category.name.toLowerCase()}`}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navLinks.slice(1).map((link) => (
                <Link key={link.name} href={link.href}>
                  <Button
                    variant="ghost"
                    className={location === link.href ? "bg-accent" : ""}
                    data-testid={`link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 md:w-64"
                  autoFocus
                  data-testid="input-search"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  data-testid="button-close-search"
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                data-testid="button-search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <ThemeToggle />

            <Button variant="ghost" size="icon" data-testid="button-wishlist">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" data-testid="button-account">
              <User className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle>Your Cart ({cartCount})</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-auto py-4">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <ShoppingCart className="h-12 w-12 mb-4" />
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                -
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                data-testid={`button-increase-${item.id}`}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveFromCart(item.id)}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {cartItems.length > 0 && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" data-testid="button-checkout">
                      Checkout
                    </Button>
                    <Link href="/shop">
                      <Button variant="outline" className="w-full" data-testid="button-continue-shopping">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left">
          <SheetHeader>
                  <SheetTitle className="font-serif">NAIA</SheetTitle>
                </SheetHeader>
          <nav className="flex flex-col gap-2 mt-6">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                All Products
              </Button>
            </Link>
            {categories.map((category) => (
              <Link key={category.name} href={category.href} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start pl-8">
                  {category.name}
                </Button>
              </Link>
            ))}
            <div className="border-t my-2" />
            {navLinks.slice(1).map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
