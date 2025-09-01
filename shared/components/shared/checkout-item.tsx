"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";
import { cn } from "@/shared/lib/utils";
import { Ingredient } from "@prisma/client";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  ingredients?: Ingredient[];
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      {isMobile ? (
        <div className="flex flex-col gap-2 items-center  w-full justify-items-stretch">
          <div className="flex items-center gap-2 flex-1 justify-self-start">
            <CartItemDetails.Image src={imageUrl} />
            <CartItemDetails.Info name={name} details={details} />
          </div>
          <div className="flex items-center gap-2">
            <CartItemDetails.Price value={price} />
            <CartItemDetails.CountButton
              onClick={onClickCountButton}
              value={quantity}
            />
            <button type="button" onClick={onClickRemove}>
              <X
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-5 flex-1">
            <CartItemDetails.Image src={imageUrl} />
            <CartItemDetails.Info name={name} details={details} />
          </div>
          <CartItemDetails.Price value= {price} />
          <div className="flex items-center gap-5 ml-20">
            <CartItemDetails.CountButton
              onClick={onClickCountButton}
              value={quantity}
            />
            <button type="button" onClick={onClickRemove}>
              <X
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
