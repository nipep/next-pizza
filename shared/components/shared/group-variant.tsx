"use client";
import { cn } from "@/shared/lib/utils";

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  className?: string;
  value?: Variant["value"];
}

export const GroupVariant: React.FC<Props> = ({
  className,
  onClick,
  items,
  value,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex justify-between bg-[#e4e4ea]  rounded-3xl p-1 select-none"
      )}
    >
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === value,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
