import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiInstagram, SiPinterest, SiEtsy } from "react-icons/si";

const artistImage = "/images/WhatsApp Image 2026-01-12 at 07.36.35 (1).jpeg";

export function ArtistSection() {
  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={artistImage}
                alt="Geraldin - NAIA"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <p className="text-primary text-sm tracking-widest uppercase font-medium">
              Meet the Maker
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
              Hi, I'm Geraldin!
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Welcome to NAIA. I create wearable, playful pieces that mix color and texture —
                inspired by textiles, street style, and fearless experimentation.
              </p>
              <p>
                Every piece I create is made with love, patience, and premium materials. From cozy blankets 
                that wrap you in warmth to adorable amigurumi that bring smiles, each item carries a piece 
                of my heart.
              </p>
              <p>
                I believe in slow, intentional crafting. Each stitch is a meditation, and I pour my 
                creativity into making pieces that will be treasured for years to come.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/about">
                <Button size="lg" data-testid="button-read-story">
                  Read My Full Story
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" data-testid="button-instagram">
                  <SiInstagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" data-testid="button-pinterest">
                  <SiPinterest className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" data-testid="button-etsy">
                  <SiEtsy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
