import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const errorStateVariants = cva(
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
  },
);

const errorIconVariants = cva("text-destructive", {
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
});

export interface ErrorStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorStateVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  iconSize?: VariantProps<typeof errorIconVariants>["size"];
  action?: React.ReactNode;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    { className, size, title, description, icon, iconSize, action, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(errorStateVariants({ size }), className)}
        role="alert"
        {...props}
      >
        <div className="flex items-center justify-center">
          {icon || (
            <AlertCircle
              className={cn(errorIconVariants({ size: iconSize || size }))}
            />
          )}
        </div>
        {title && (
          <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        )}
        {description && (
          <p className="text-muted-foreground max-w-sm">{description}</p>
        )}
        {action && (
          <div className="flex items-center justify-center">{action}</div>
        )}
      </div>
    );
  },
);
ErrorState.displayName = "ErrorState";

export { ErrorState, errorStateVariants, errorIconVariants };
