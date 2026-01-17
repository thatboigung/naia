import { useState } from "react";
import { QuickViewModal } from "../QuickViewModal";
import { Product } from "../ProductCard";
import { Button } from "@/components/ui/button";
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

export default function QuickViewModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Quick View</Button>
      <QuickViewModal
        product={mockProduct}
        open={open}
        onOpenChange={setOpen}
        onAddToCart={(p, qty) => console.log("Added to cart:", p.name, "x", qty)}
      />
    </>
  );
}
