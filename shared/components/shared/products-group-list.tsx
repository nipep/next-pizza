"use client";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { Title } from "./title";
import React, { useEffect } from "react";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelation } from "@/@types/prisma";

interface Props {
  className?: string;
  title: string;
  products: ProductWithRelation[];
  listClassName?: string;
  categoryId: number;
}
export const ProductsGroupList: React.FC<Props> = ({
  className,
  title,
  products,
  listClassName,
  categoryId,
}) => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });
  const SetCategoryActiveId = useCategoryStore((state) => state.setActivityId);
  useEffect(() => {
    if (intersection?.isIntersecting) {
      SetCategoryActiveId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div
        className={cn(
          "grid sm:grid-cols-2   md:grid-cols-3 grid-cols-1 xl:gap-[50px] gap-[30px]",
          listClassName
        )}
      >
        {products.map((product, id) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.items[0].price}
            ingredients={product.ingredients}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
