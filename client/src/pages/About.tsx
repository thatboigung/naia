import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const artistImage = "/images/WhatsApp Image 2026-01-12 at 07.36.35 (1).jpeg";
const suppliesImg = "/images/WhatsApp Image 2026-01-11 at 08.30.05.jpeg";
const tutorialImg = "/images/WhatsApp Image 2026-01-11 at 08.30.04.jpeg";
import { SiInstagram, SiPinterest, SiEtsy } from "react-icons/si";
import { Heart, Award, Clock, Leaf } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every stitch is crafted with care and attention to detail, creating pieces that carry warmth and soul.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "I use only the finest yarns and materials, ensuring durability and a luxurious feel in every creation.",
  },
  {
    icon: Clock,
    title: "Slow Craft",
    description: "I believe in intentional, mindful creation. Each piece takes time to ensure perfection.",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-conscious practices guide my work, from material selection to packaging choices.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-primary text-sm tracking-widest uppercase font-medium">
                The Story Behind the Stitches
              </p>
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
                    Hey — I'm Geraldin
                  </h1>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      Welcome to NAIA! I'm so happy you're here. My creative journey began when I
                      first fell in love with textiles and the possibilities of yarn.
                    </p>
                <p>
                  What started as afternoons spent learning from grandma has blossomed into 
                  a lifelong passion. Today, I create each piece in my sunny home studio, 
                  often with a cup of tea nearby and my cat supervising from her favorite perch.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="ghost" size="icon" data-testid="about-instagram">
                  <SiInstagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" data-testid="about-pinterest">
                  <SiPinterest className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" data-testid="about-etsy">
                  <SiEtsy className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={artistImage}
                    alt="Geraldin - NAIA"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
            My Crochet Story
          </h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              I learned to crochet messing around with my grandma's yarn when I was a kid. I fell
              in love with color and texture, and started making pieces that felt fun to wear.
            </p>
            <p>
              NAIA grew from late-night projects, bold color experiments, and a desire to make
              stuff that feels playful and wearable — perfect for mixing with your everyday fits.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={suppliesImg}
                alt="Crochet supplies and materials"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                My Creative Process
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Every creation begins with inspiration - sometimes from nature, 
                  sometimes from a customer's vision, and often from the yarn itself. 
                  I spend hours selecting the perfect materials, touching and feeling 
                  each skein until I find the right one.
                </p>
                <p>
                  Then comes the meditative process of stitching. I work without music 
                  sometimes, letting the rhythm of the hook guide me. Other times, 
                  I listen to audiobooks or podcasts while my hands create.
                </p>
                <p>
                  Each piece is washed, blocked, and inspected before being wrapped 
                  in tissue paper and sent to its new home. I include a care card 
                  and a little note, because every package should feel like opening 
                  a gift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            What I Believe In
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Learn with Me
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Beyond creating finished pieces, I love sharing my knowledge with 
                  fellow crochet enthusiasts. On my blog, you'll find tutorials, 
                  tips, and behind-the-scenes peeks into my creative process.
                </p>
                <p>
                  I also offer occasional virtual workshops where we can crochet 
                  together in real-time. There's nothing quite like the community 
                  of makers coming together to learn and create.
                </p>
              </div>
              <Button size="lg" data-testid="button-visit-blog">
                Visit the Blog
              </Button>
            </div>
            <div>
              <img
                src={tutorialImg}
                alt="Hands crocheting"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
