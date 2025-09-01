import { cn } from "@/shared/lib/utils";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/shared/hooks/use-cart";
import { Skeleton } from "../ui/skeleton";

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  loading,
  totalAmount,
}) => {
  const vatPrice = (totalAmount * 20) / 100;
  const totalPrice = totalAmount + 250 + vatPrice;

  return (
    <WhiteBlock className={cn("sm:p-6 p-2 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        { loading ? (<Skeleton className="h-11 w-40" />) : ( <span className="text-[34px] h-11 font-extrabold">{totalPrice} ₽</span>) }

      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость товаров:
          </div>
        }
        value={loading ? (<Skeleton className="h-6 w-14 rounded-[4px]" />) : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={loading ? (<Skeleton className="h-6 w-14 rounded-[4px]" />) : `${vatPrice} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? (<Skeleton className="h-6 w-14 rounded-[4px]" />) : "250 ₽"}
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
