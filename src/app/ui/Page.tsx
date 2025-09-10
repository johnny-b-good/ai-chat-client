import { type FC, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type PageWithHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const Page: FC<PageWithHeaderProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid h-dvh grid-cols-1 grid-rows-[min-content_1fr_min-content]",
        className,
      )}
    >
      {children}
    </div>
  );
};
