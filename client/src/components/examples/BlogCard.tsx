import { BlogCard, BlogPost } from "../BlogCard";
import tutorialImg from "@assets/generated_images/crochet_tutorial_blog.png";

// todo: remove mock functionality
const mockPost: BlogPost = {
  id: "1",
  title: "Getting Started with Amigurumi: A Beginner's Guide",
  excerpt: "Learn the basics of creating adorable stuffed animals with this comprehensive guide for beginners.",
  image: tutorialImg,
  category: "Tutorial",
  author: "Sarah Miller",
  author: "Geraldin",
  readTime: "8 min read",
  date: "Dec 15, 2024",
};

export default function BlogCardExample() {
  return (
    <div className="w-80">
      <BlogCard post={mockPost} />
    </div>
  );
}
