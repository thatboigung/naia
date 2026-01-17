import { Header } from "../Header";
import amigurumiImg from "@assets/generated_images/amigurumi_bear_product.png";

// todo: remove mock functionality
const mockCartItems = [
  {
    id: "1",
    name: "Cute Bear Amigurumi",
    price: 35.00,
    quantity: 1,
    image: amigurumiImg,
  },
];

export default function HeaderExample() {
  return (
    <Header
      cartItems={mockCartItems}
      onRemoveFromCart={(id) => console.log("Remove from cart:", id)}
      onUpdateQuantity={(id, qty) => console.log("Update quantity:", id, qty)}
    />
  );
}
