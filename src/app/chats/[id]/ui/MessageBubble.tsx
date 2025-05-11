import type { FC, ReactNode } from "react";
import clsx from "clsx";

export type MessageBubbleProps = {
  text: ReactNode;
  author: string;
  authorType: "user" | "ai";
};

export const MessageBubble: FC<MessageBubbleProps> = ({
  text,
  author,
  authorType,
}) => {
  return (
    <div className={clsx("rounded-sm bg-slate-50 px-4 py-2 text-sm shadow")}>
      <div
        className={clsx(
          "mb-1 font-semibold",
          authorType === "user" ? "text-sky-700" : "text-red-700",
        )}
      >
        {author}
      </div>
      {text}
    </div>
  );
};
