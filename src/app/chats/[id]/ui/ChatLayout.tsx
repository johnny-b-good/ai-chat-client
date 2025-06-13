import type { FC, ReactNode } from "react";

import { PageWithHeader, Body } from "@/app/ui";

export type ChatLayoutProps = {
  header: ReactNode;
  body: ReactNode;
};

export const ChatLayout: FC<ChatLayoutProps> = ({ header, body }) => {
  return (
    <PageWithHeader>
      {header}
      <Body className="grid grid-cols-1 grid-rows-[1fr_auto]">{body}</Body>
    </PageWithHeader>
  );
};
