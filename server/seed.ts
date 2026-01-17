import { db } from "./db";
import { categories, products, blogPosts, artistProfile } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Check if already seeded
  const existingCategories = await db.select().from(categories);
  if (existingCategories.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  // Seed Categories
  const categoryData = [
    { name: "Amigurumi", slug: "amigurumi", image: "/images/categories/amigurumi.jpg", productCount: 12 },
    { name: "Blankets", slug: "blankets", image: "/images/categories/blankets.jpg", productCount: 8 },
    { name: "Accessories", slug: "accessories", image: "/images/categories/accessories.jpg", productCount: 15 },
    { name: "Home Decor", slug: "home-decor", image: "/images/categories/home-decor.jpg", productCount: 10 },
    { name: "Wearables", slug: "wearables", image: "/images/categories/wearables.jpg", productCount: 9 },
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log("Categories seeded:", insertedCategories.length);

  const categoryMap = insertedCategories.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {} as Record<string, number>);

  // Seed Products
  const productData = [
    {
      name: "Cozy Bunny Amigurumi",
      slug: "cozy-bunny-amigurumi",
      description: "Adorable handcrafted bunny made with soft cotton yarn. Perfect as a gift or nursery decor. Each bunny is made to order with love and attention to detail.",
      price: "45.00",
      image: "/images/products/bunny-amigurumi.jpg",
      categoryId: categoryMap["amigurumi"],
      isNew: true,
      madeToOrder: true,
      materials: "100% Cotton Yarn, Polyester Fiberfill",
      careInstructions: "Spot clean only. Do not machine wash.",
      dimensions: "8 inches tall"
    },
    {
      name: "Rainbow Bear Friend",
      slug: "rainbow-bear-friend",
      description: "Colorful teddy bear in rainbow pastels. Soft and cuddly, perfect for little ones.",
      price: "38.00",
      image: "/images/products/rainbow-bear.jpg",
      categoryId: categoryMap["amigurumi"],
      madeToOrder: true,
      materials: "Acrylic Yarn, Polyester Fiberfill, Safety Eyes",
      dimensions: "6 inches tall"
    },
    {
      name: "Chunky Knit Throw Blanket",
      slug: "chunky-knit-throw-blanket",
      description: "Luxuriously soft chunky knit blanket in cream. Perfect for cozy evenings on the couch.",
      price: "120.00",
      originalPrice: "150.00",
      image: "/images/products/chunky-blanket.jpg",
      categoryId: categoryMap["blankets"],
      materials: "100% Merino Wool",
      careInstructions: "Dry clean only",
      dimensions: "50x60 inches"
    },
    {
      name: "Baby Milestone Blanket",
      slug: "baby-milestone-blanket",
      description: "Beautiful milestone blanket for capturing baby's first year. Features month markers and adorable designs.",
      price: "85.00",
      image: "/images/products/baby-blanket.jpg",
      categoryId: categoryMap["blankets"],
      isNew: true,
      materials: "Soft Cotton Blend",
      dimensions: "40x40 inches"
    },
    {
      name: "Boho Market Tote Bag",
      slug: "boho-market-tote-bag",
      description: "Sturdy and stylish market tote with bohemian flair. Perfect for farmers market trips or beach days.",
      price: "55.00",
      image: "/images/products/market-tote.jpg",
      categoryId: categoryMap["accessories"],
      materials: "100% Cotton, Leather Handles",
      dimensions: "15x18 inches"
    },
    {
      name: "Cozy Infinity Scarf",
      slug: "cozy-infinity-scarf",
      description: "Warm and fashionable infinity scarf in beautiful autumn colors. The perfect accessory for cooler days.",
      price: "35.00",
      image: "/images/products/infinity-scarf.jpg",
      categoryId: categoryMap["accessories"],
      materials: "Wool Blend",
      dimensions: "60 inch circumference"
    },
    {
      name: "Macrame Plant Hanger",
      slug: "macrame-plant-hanger",
      description: "Beautiful handcrafted macrame plant hanger. Adds a bohemian touch to any room.",
      price: "32.00",
      image: "/images/products/plant-hanger.jpg",
      categoryId: categoryMap["home-decor"],
      isNew: true,
      materials: "100% Cotton Rope",
      dimensions: "40 inches long, fits 6 inch pots"
    },
    {
      name: "Decorative Pillow Cover",
      slug: "decorative-pillow-cover",
      description: "Textured crochet pillow cover in neutral tones. Adds warmth and character to any sofa or bed.",
      price: "42.00",
      image: "/images/products/pillow-cover.jpg",
      categoryId: categoryMap["home-decor"],
      materials: "Cotton-Linen Blend",
      dimensions: "18x18 inches"
    },
    {
      name: "Cozy Cable Knit Beanie",
      slug: "cozy-cable-knit-beanie",
      description: "Classic cable knit beanie in soft wool blend. Available in multiple colors.",
      price: "28.00",
      image: "/images/products/cable-beanie.jpg",
      categoryId: categoryMap["wearables"],
      materials: "Wool Blend",
      dimensions: "One Size Fits Most"
    },
    {
      name: "Fingerless Gloves Set",
      slug: "fingerless-gloves-set",
      description: "Stylish fingerless gloves perfect for typing or crafting. Keeps hands warm while leaving fingers free.",
      price: "24.00",
      image: "/images/products/fingerless-gloves.jpg",
      categoryId: categoryMap["wearables"],
      madeToOrder: true,
      materials: "Merino Wool",
      dimensions: "7 inches long"
    },
    {
      name: "Sleepy Fox Amigurumi",
      slug: "sleepy-fox-amigurumi",
      description: "Adorable sleeping fox with a cozy blanket. Perfect bedtime companion for children.",
      price: "52.00",
      image: "/images/products/sleepy-fox.jpg",
      categoryId: categoryMap["amigurumi"],
      madeToOrder: true,
      materials: "Cotton Yarn, Polyester Fiberfill",
      dimensions: "7 inches long"
    },
    {
      name: "Rustic Wall Basket Set",
      slug: "rustic-wall-basket-set",
      description: "Set of 3 handwoven wall baskets in natural tones. Perfect for creating a gallery wall.",
      price: "68.00",
      image: "/images/products/wall-baskets.jpg",
      categoryId: categoryMap["home-decor"],
      materials: "Natural Jute and Cotton",
      dimensions: "Small: 8in, Medium: 10in, Large: 12in"
    },
  ];

  const insertedProducts = await db.insert(products).values(productData).returning();
  console.log("Products seeded:", insertedProducts.length);

  // Seed Blog Posts
  const blogData = [
    {
      title: "Getting Started with Amigurumi: A Beginner's Guide",
      slug: "getting-started-with-amigurumi",
      excerpt: "Learn the basics of creating adorable crocheted stuffed animals with this comprehensive beginner's guide to amigurumi.",
      content: "Amigurumi is the Japanese art of crocheting small stuffed animals and creatures. In this guide, we'll cover everything you need to know to get started...",
      image: "/images/blog/amigurumi-guide.jpg",
      category: "Tutorials",
      author: "Geraldin",
      readTime: "8 min read"
    },
    {
      title: "5 Must-Have Yarns for Your Next Project",
      slug: "must-have-yarns-next-project",
      excerpt: "Discover our top yarn recommendations for different types of crochet projects, from cozy blankets to delicate accessories.",
      content: "Choosing the right yarn can make or break your crochet project. Here are our top 5 recommendations for different project types...",
      image: "/images/blog/yarn-selection.jpg",
      category: "Materials",
      author: "Geraldin",
      readTime: "5 min read"
    },
    {
      title: "How to Care for Your Handmade Crochet Items",
      slug: "caring-for-handmade-crochet",
      excerpt: "Tips and tricks for keeping your handcrafted crochet pieces looking beautiful for years to come.",
      content: "Your handmade crochet items deserve special care to maintain their beauty and longevity. Here's how to properly care for them...",
      image: "/images/blog/crochet-care.jpg",
      category: "Tips",
      author: "Geraldin",
      readTime: "4 min read"
    },
    {
      title: "Creating a Cozy Home with Crochet Decor",
      slug: "cozy-home-crochet-decor",
      excerpt: "Transform your living space with handmade crochet pieces that add warmth and personality to any room.",
      content: "Adding handmade crochet elements to your home decor creates a warm, inviting atmosphere that can't be replicated with store-bought items...",
      image: "/images/blog/home-decor.jpg",
      category: "Inspiration",
      author: "Geraldin",
      readTime: "6 min read"
    },
    {
      title: "The Art of Color Combinations in Crochet",
      slug: "color-combinations-crochet",
      excerpt: "Master the art of choosing beautiful color palettes for your crochet projects with these expert tips.",
      content: "Color selection is one of the most exciting parts of starting a new crochet project. Learn how to create stunning color combinations...",
      image: "/images/blog/color-theory.jpg",
      category: "Tutorials",
      author: "Geraldin",
      readTime: "7 min read"
    },
  ];

  const insertedPosts = await db.insert(blogPosts).values(blogData).returning();
  console.log("Blog posts seeded:", insertedPosts.length);

  // Seed Artist Profile
  const artistData = {
    name: "Geraldin",
    bio: "Hello! I'm Geraldin, the maker behind NAIA. I design and handcraft wearable pieces that blend color, texture, and confidence.",
    story: "My journey with textiles started early and has evolved into NAIA — a small studio focused on playful, wearable designs. I value slow craft and thoughtful materials.",
    image: "/images/artist/geraldin-profile.jpg",
    instagramUrl: "https://instagram.com/naia",
    pinterestUrl: "https://pinterest.com/naia",
    etsyUrl: "https://etsy.com/shop/naia"
  };

  const insertedArtist = await db.insert(artistProfile).values(artistData).returning();
  console.log("Artist profile seeded");

  console.log("Database seeding complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  });
