import type { FC, ReactNode } from "react";

export type ChatLayoutProps = {
  children: ReactNode;
};

export const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto grid h-dvh w-150 grid-cols-1 grid-rows-[1fr_min-content] flex-col border-r border-b border-l border-slate-300 bg-slate-200">
      {children}
    </div>
  );
};
