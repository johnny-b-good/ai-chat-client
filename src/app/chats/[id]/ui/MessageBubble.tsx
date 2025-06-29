import type { FC, ReactNode } from "react";
import clsx from "clsx";

export type MessageBubbleProps = {
  text: ReactNode;
  createdAt?: Date;
  author: string;
  authorType: "user" | "ai";
};

export const MessageBubble: FC<MessageBubbleProps> = ({
  text,
  author,
  // createdAt,
  authorType,
}) => {
  return (
    <div
      className={clsx(
        "relative mt-5 max-w-11/12 rounded-sm px-4 py-3 text-sm shadow",
        authorType === "ai" ? "bg-card self-start" : "bg-accent self-end",
      )}
    >
      <div
        className={clsx(
          "text-shadow absolute -top-5 text-xs",
          authorType === "ai" ? "left-0" : "right-0",
        )}
      >
        {author}
      </div>
      <div className="prose prose-sm dark:prose-invert">{text}</div>
    </div>
  );
};
