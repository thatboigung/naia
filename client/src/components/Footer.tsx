import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiInstagram, SiPinterest, SiEtsy, SiVisa, SiMastercard, SiPaypal } from "react-icons/si";
import { Heart } from "lucide-react";

const shopLinks = [
  { name: "All Products", href: "/shop" },
  { name: "Fairy Puke", href: "/shop?category=fairy-puke" },
  { name: "Bralettes", href: "/shop?category=bralettes" },
  { name: "Femme", href: "/shop?category=femme" },
  { name: "Bag + Top Sets", href: "/shop?category=bag-top-sets" },
];

const supportLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Returns & Exchanges", href: "/returns" },
  { name: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/">
              <span className="font-serif text-2xl font-bold">NAIA</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Handcrafted crochet creations made with love. Each piece is unique and carries 
              a piece of my heart.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" data-testid="footer-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="footer-pinterest">
                <SiPinterest className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="footer-etsy">
                <SiEtsy className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <nav className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <nav className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get crochet tips, new product updates, and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); console.log("Newsletter signup"); }}>
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button type="submit" data-testid="button-subscribe">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-primary fill-current" /> by Geraldin
            </p>
            <div className="flex items-center gap-4">
              <SiVisa className="h-8 w-8 text-muted-foreground" />
              <SiMastercard className="h-8 w-8 text-muted-foreground" />
              <SiPaypal className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2024 NAIA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
