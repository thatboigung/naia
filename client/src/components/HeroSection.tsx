import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/cozy_crochet_hero_image.png";

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      <img
        src={heroImage}
        alt="Cozy handmade crochet products"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="relative h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <div className="max-w-xl space-y-6">
                      <p className="text-white/80 text-sm tracking-widest uppercase">
                        Fresh drops • hand-stitched
                      </p>
                      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Bright, playful crochet — made by me
                      </h1>
                      <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                        Colorful, hand-knit pieces to brighten your day — wearable art with a wink.
                      </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                  <Button size="lg" className="text-base px-8" data-testid="button-shop-now">
                    Shop the Drop
                  </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 bg-white/10 text-white border-white/30 backdrop-blur-sm"
                  data-testid="button-meet-artist"
                >
                  Meet the Artist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
