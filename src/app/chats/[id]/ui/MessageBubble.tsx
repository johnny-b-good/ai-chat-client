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
        "relative mt-5 max-w-11/12 rounded-sm px-3 py-2 text-sm shadow",
        authorType === "ai" ? "self-start bg-slate-50" : "self-end bg-blue-50",
      )}
    >
      <div
        className={clsx(
          "text-shadow absolute -top-5 text-xs text-slate-600",
          authorType === "ai" ? "left-0" : "right-0",
        )}
      >
        {author}
      </div>
      <div className="prose prose-slate prose-sm">{text}</div>
    </div>
  );
};
