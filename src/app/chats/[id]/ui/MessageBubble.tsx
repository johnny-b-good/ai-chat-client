import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type MessageBubbleProps = {
  children: ReactNode;
  createdAt?: Date;
  author: string;
  authorType: "user" | "ai";
};

export const MessageBubble: FC<MessageBubbleProps> = ({
  children,
  author,
  // createdAt,
  authorType,
}) => {
  return (
    <div
      className={cn(
        "relative mt-5 max-w-11/12 rounded-sm px-4 py-3 text-sm shadow",
        authorType === "ai" ? "bg-card self-start" : "bg-primary-card self-end",
      )}
    >
      <div
        className={cn(
          "text-shadow text-muted-foreground absolute -top-5 text-xs",
          authorType === "ai" ? "left-0" : "right-0",
        )}
      >
        {author}
      </div>
      <div className="prose prose-sm dark:prose-invert">{children}</div>
    </div>
  );
};
