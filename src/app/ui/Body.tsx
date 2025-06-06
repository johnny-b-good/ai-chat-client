import { type FC, type ReactNode } from "react";
import clsx from "clsx";

export type BodyProps = {
  children: ReactNode;
  className?: string;
};

export const Body: FC<BodyProps> = ({ children, className }) => {
  return (
    <div className={clsx("mx-auto min-h-0 w-full p-4 sm:w-150", className)}>
      {children}
    </div>
  );
};
