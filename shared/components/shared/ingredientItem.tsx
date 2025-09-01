import { ProductWithRelation } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
  className?: string;
  price: number;
  name: string;
  imageUrl: string;
  active?: boolean;
  onClick?: () => void;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  name,
  imageUrl,
  price,
  onClick,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center flex-col p-1 rounded-md md:w-32 w-25 text-center relative cursor-pointer shadow-md bg-white",
        { "border border-primary": active },
        className
      )}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img width={110} height={110} src={imageUrl} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
