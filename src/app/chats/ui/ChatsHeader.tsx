import { type FC, type ReactNode } from "react";

export type ChatsHeaderProps = {
  children: ReactNode;
};

export const ChatsHeader: FC<ChatsHeaderProps> = ({ children }) => {
  return (
    <div className="h-12 bg-white shadow">
      <div className="relative mx-auto flex h-12 w-full items-center justify-center gap-4 px-4 text-lg sm:w-150">
        {children}
      </div>
    </div>
  );
};
