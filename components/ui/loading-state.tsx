import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const loadingStateVariants = cva(
  "flex flex-col items-center justify-center text-center space-y-4",
  {
    variants: {
      size: {
        sm: "py-8 px-4 space-y-3",
        default: "py-12 px-6 space-y-4",
        lg: "py-16 px-8 space-y-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const loadingSpinnerVariants = cva(
  "animate-spin text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        default: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface LoadingStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingStateVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
  spinnerSize?: VariantProps<typeof loadingSpinnerVariants>["size"]
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, size, title, description, icon, spinnerSize, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(loadingStateVariants({ size }), className)}
        {...props}
      >
        <div className="flex items-center justify-center">
          {icon || (
            <Loader2 className={cn(loadingSpinnerVariants({ size: spinnerSize || size }))} />
          )}
        </div>
        {title && (
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
      </div>
    )
  }
)
LoadingState.displayName = "LoadingState"

export { LoadingState, loadingStateVariants, loadingSpinnerVariants }
