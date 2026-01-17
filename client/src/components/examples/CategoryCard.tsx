import { CategoryCard } from "../CategoryCard";
import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";

export default function CategoryCardExample() {
  return (
    <div className="w-48">
      <CategoryCard
        name="Amigurumi"
        image={amigurumiImg}
        href="/shop?category=amigurumi"
        productCount={12}
      />
    </div>
  );
}
