import { cn } from "@/shared/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { CartDrawerFilter } from "./cart-drawer-filter";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <CartDrawerFilter>
      <div
        className={cn(
          "inline-flex items-center gap-2 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
          className
        )}
      >
        <SlidersHorizontal size={16} />
        <b>Фильтры</b>
      </div>
    </CartDrawerFilter>
  );
};
