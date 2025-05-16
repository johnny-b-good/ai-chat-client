import type { FC, ReactNode, Ref } from "react";

export type MessageListProps = {
  children: ReactNode;
  ref: Ref<HTMLDivElement>;
};

export const MessageList: FC<MessageListProps> = ({ children, ref }) => {
  return (
    <div
      ref={ref}
      className="scrollbar flex flex-col items-start gap-4 overflow-y-auto pr-1 focus-visible:outline-none"
    >
      {children}
    </div>
  );
};
