"use client";

import { FC, ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailWrapperProps {
  title: string;
  onClose: () => void;
  hideHeader?: boolean;
  children: ReactNode;
  className?: string;
}

const DetailWrapper: FC<DetailWrapperProps> = ({
  title,
  onClose,
  hideHeader = false,
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-card h-full overflow-y-auto p-6 ${!hideHeader ? "border-l" : ""} ${className}`}
    >
      {!hideHeader && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default DetailWrapper;
