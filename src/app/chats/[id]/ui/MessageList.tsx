import type { FC, ReactNode } from "react";

export type MessageListProps = {
  children: ReactNode;
};

export const MessageList: FC<MessageListProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col items-start gap-4">{children}</div>
  );
};
