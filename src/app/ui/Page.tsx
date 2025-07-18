import { type FC, type ReactNode } from "react";

export type PageWithHeaderProps = {
  children: ReactNode;
};

export const Page: FC<PageWithHeaderProps> = ({ children }) => {
  return (
    <div className="grid h-dvh grid-cols-1 grid-rows-[min-content_1fr_min-content]">
      {children}
    </div>
  );
};
