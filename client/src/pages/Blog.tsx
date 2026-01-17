import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BlogCard, BlogPost } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import type { BlogPost as DBBlogPost } from "@shared/schema";

import tutorialImg from "@assets/generated_images/crochet_tutorial_blog.png";
import suppliesImg from "@assets/generated_images/crochet_supplies_flatlay.png";
import blanketImg from "@assets/generated_images/crochet_blanket_product.png";

const blogImages: string[] = [tutorialImg, suppliesImg, blanketImg];

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

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dbBlogPosts = [], isLoading } = useQuery<DBBlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const blogPosts = dbBlogPosts.map((p, i) => mapDBBlogPostToBlogPost(p, i));
  
  const uniqueCategories = useMemo(() => {
    const cats = new Set(blogPosts.map(p => p.category.toLowerCase()));
    return ["all", ...Array.from(cats)];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "all" || 
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  const featuredPost = selectedCategory === "all" && !searchQuery ? filteredPosts[0] : null;
  const regularPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">
            Tips, tutorials, and crochet inspiration
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-blog-search"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
            {uniqueCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 capitalize"
                data-testid={`tab-blog-${cat}`}
              >
                {cat === "all" ? "All Posts" : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-64 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-8">
                <BlogCard post={featuredPost} featured />
              </div>
            )}

            {/* Blog Grid */}
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No articles found matching your criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
