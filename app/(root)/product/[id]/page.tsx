// "use client";
import { Container } from "@/shared/components/shared/container";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";

export default async function ProductModulePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });
  if (!product) {
    return notFound();
  }
  
  return (
    <Container className="flex flex-col">
      <ProductForm product={product}/>
    </Container>
  );
}