import { ProductCard, Product } from "../ProductCard";
import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";

// todo: remove mock functionality
const mockProduct: Product = {
  id: "1",
  name: "Cute Bear Amigurumi",
  price: 35.00,
  originalPrice: 45.00,
  image: amigurumiImg,
  category: "Amigurumi",
  isNew: true,
  madeToOrder: true,
};

export default function ProductCardExample() {
  return (
    <div className="w-72">
      <ProductCard
        product={mockProduct}
        onAddToCart={(p) => console.log("Added to cart:", p.name)}
        onQuickView={(p) => console.log("Quick view:", p.name)}
      />
    </div>
  );
}
