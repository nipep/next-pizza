"use client";
import { Dialog, DialogContent } from "../../ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductWithRelation } from "@/@types/prisma";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelation;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-full sm:w-[1060px] sm:max-w-[1060px]  bg-white scroll",
          className
        )}
      >
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
