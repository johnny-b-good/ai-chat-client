import { type FC, type ReactNode, type Ref } from "react";

import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib/utils";

export type BodyProps = {
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

export const Body: FC<BodyProps> = ({ children, className, ref }) => {
  return (
    <ScrollArea
      className={cn("h-full min-h-0 w-full overflow-y-auto", className)}
      ref={ref}
    >
      <div className="mx-auto w-full p-4 sm:w-150">{children}</div>
    </ScrollArea>
  );
};
