import type { FC, ReactNode } from "react";

export type MessageListProps = {
  children: ReactNode;
};

export const MessageList: FC<MessageListProps> = ({ children }) => {
  return (
    <div className="scrollbar flex flex-col items-start gap-4 overflow-y-auto border-b border-slate-300 p-4 focus-visible:outline-none">
      {children}
    </div>
  );
};
