import type { FC, ReactNode } from "react";

export type ChatLayoutProps = {
  header: ReactNode;
  body: ReactNode;
};

export const ChatLayout: FC<ChatLayoutProps> = ({ header, body }) => {
  return (
    <div className="grid h-dvh grid-cols-1 grid-rows-[min-content_1fr]">
      {header}
      <div className="mx-auto grid min-h-0 w-full grid-cols-1 grid-rows-[1fr_auto] sm:w-150">
        {body}
      </div>
    </div>
  );
};
