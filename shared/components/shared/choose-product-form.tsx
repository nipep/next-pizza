import { cn } from "@/shared/lib/utils";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { ProductWithRelation } from "@/@types/prisma";
import { ProductItem } from "@prisma/client";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  price: number;
  loading?: boolean;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  loading,
  onClickAdd,
}) => {
  return (
    <div
      className={cn(className, "flex flex-1 flex-col md:flex-row items-center")}
    >
      <div
        className={cn(
          "flex items-center justify-center flex-1 relative w-full",
          className
        )}
      >
        <img
          src={imageUrl}
          alt={name}
          className={cn(
            "relative left-2 top-2 transition-all z-10 duration-300 sm:w-[450px] w-[320px] h-[350px] object-contain"
          )}
        />
      </div>
      <div className="sm-[490px] bg-[#f1f1f1] p-7">
        <Title text={name} size="md" className="font-extrabold mb-3" />
        <Button
          onClick={() => onClickAdd?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
          loading={loading}
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
