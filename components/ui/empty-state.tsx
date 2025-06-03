import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center space-y-4 py-12 px-6",
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

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size, className }))}
        {...props}
      >
        {icon && (
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground max-w-sm">
              {description}
            </p>
          )}
        </div>
        {action && <div className="pt-2">{action}</div>}
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants }
