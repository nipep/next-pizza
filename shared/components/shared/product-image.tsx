import { cn } from "@/shared/lib/utils";
import { Product } from "@prisma/client";

interface Props {
  className?: string;
  imageUrl: string;
  size: 25 | 30 | 35;
}

export const ProductImage: React.FC<Props> = ({
  className,
  imageUrl,
  size,
}) => {
  return (
    <div
      className={cn("flex items-center justify-center flex-1 relative w-full", {
        "my-[40px]": size === 25,
        "my-[20px]": size === 30,
        "my-[0px]": size === 35,
      })}
    >
      <img
        src={imageUrl}
        alt="Logo"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "lg:w-[300px] lg:h-[300px] w-[200px] h-[200px]": size === 25,
            "lg:w-[400px] lg:h-[400px] w-[250px] h-[250px]": size === 30,
            "lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]": size === 35,
          }
        )}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 lg:w-[450px] lg:h-[450px] w-[275px] h-[275px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 lg:w-[370px] lg:h-[370px] w-[225px] h-[225px]" />
    </div>
  );
};
