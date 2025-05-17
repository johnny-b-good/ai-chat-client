import type { FC, ReactNode, Ref } from "react";

import { ScrollArea } from "@/components/ui";

export type MessageListProps = {
  children: ReactNode;
  ref: Ref<HTMLDivElement>;
};

export const MessageList: FC<MessageListProps> = ({ children, ref }) => {
  return (
    <ScrollArea className="h-full min-h-0 w-full">
      <div ref={ref} className="flex flex-col items-start gap-4 p-4">
        {children}
      </div>
    </ScrollArea>
  );
};
