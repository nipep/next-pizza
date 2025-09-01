import React from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";

interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between sm:p-5 p-2 px-7 border-b border-gray-100">
          <Title text={title} className="font-bold sm:text-[20px] text-[20px]" />
          {endAdornment}
        </div>
      )}

      <div className={cn("sm:px-5 sm:py-4 p-2", contentClassName)}>{children}</div>
    </div>
  );
};
