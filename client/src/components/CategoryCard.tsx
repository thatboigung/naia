import { Link } from "wouter";

interface CategoryCardProps {
  name: string;
  image: string;
  href: string;
  productCount?: number;
}

export function CategoryCard({ name, image, href, productCount }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div 
        className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover-elevate"
        data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-center">
          <h3 className="font-serif text-lg font-semibold text-white">
            {name}
          </h3>
          {productCount !== undefined && (
            <p className="text-sm text-white/80 mt-1">
              {productCount} items
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
