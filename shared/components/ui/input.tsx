import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { IMaskMixin } from "react-imask";

const IMaskedInput = IMaskMixin(({ inputRef, ...props }: any) => (
  <input
    ref={inputRef}
    {...props}
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      props.className
    )}
  />
));

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, mask, ...props }, ref) => {
    return mask ? (
      <IMaskedInput
        {...props}
        mask={mask}
        inputRef={ref}
        className={className}
      />
    ) : (
      <input
        {...props}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
