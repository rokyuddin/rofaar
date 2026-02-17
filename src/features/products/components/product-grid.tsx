import { ProductCard } from "./product-card";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  badge?: string;
}

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={`grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6 ${className || ""}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          image={product.image}
          badge={product.badge}
        />
      ))}
    </div>
  );
}
