import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-base text-[#000000] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#A3A3A3] focus:border-[#D1F26E] focus:border-2 focus:placeholder:opacity-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm data-[success=true]:border-[#D1F26E] data-[success=true]:placeholder:text-[#000000] data-[error=true]:border-[#FF0000] data-[error=true]:placeholder:text-[#000000] focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
