import { type FC, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FooterProps = {
  className?: string;
  children: ReactNode;
};

export const Footer: FC<FooterProps> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto w-full sm:w-150", className)}>{children}</div>
  );
};
