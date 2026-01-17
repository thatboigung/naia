import { useState } from "react";
import CategoryManager from "@/components/admin/CategoryManager";
import ListingManager from "@/components/admin/ListingManager";
import BlogManager from "@/components/admin/BlogManager";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const [tab, setTab] = useState("categories");

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">Admin — NAIA</h1>

        <div className="flex gap-2 mb-6">
          <Button variant={tab === "categories" ? "default" : "ghost"} onClick={() => setTab("categories")}>Categories</Button>
          <Button variant={tab === "listings" ? "default" : "ghost"} onClick={() => setTab("listings")}>Listings</Button>
          <Button variant={tab === "blogs" ? "default" : "ghost"} onClick={() => setTab("blogs")}>Blogs</Button>
        </div>

        <div>
          {tab === "categories" && <CategoryManager />}
          {tab === "listings" && <ListingManager />}
          {tab === "blogs" && <BlogManager />}
        </div>
      </div>
    </div>
  );
}
