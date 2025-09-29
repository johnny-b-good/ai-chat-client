import type { FC } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { cn } from "@/lib/utils";
import { UIMessageWithMeta } from "../../lib/types";
import { Character, Model } from "@/generated/prisma";
import { MessageButtons } from "./MessageButtons";
import { MarkdownRender } from "./MarkdownRender";

dayjs.extend(localizedFormat);

export type MessageBubbleProps = {
  message: UIMessageWithMeta;
  character?: Character | null;
  model: Model;
};

export const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  character,
  model,
}) => {
  const aiDisplayName = character?.name ?? model.name;
  const author = message.role === "assistant" ? aiDisplayName : "You";
  const authorType = message.role === "assistant" ? "ai" : "user";
  const createdAt = message.metadata?.createdAt;

  return (
    <div
      className={cn(
        "group relative mt-5 mb-7 max-w-11/12 rounded-sm px-4 py-3 text-sm shadow",
        authorType === "ai" ? "bg-card self-start" : "bg-primary-card self-end",
      )}
    >
      <div
        className={cn(
          "text-muted-foreground absolute -top-5 w-max min-w-full text-xs opacity-0 transition-opacity group-hover:opacity-100",
          authorType === "ai" ? "left-0 text-left" : "right-0 text-right",
        )}
      >
        {author}, {dayjs(createdAt).format("LLL")}
      </div>

      <div className="prose prose-sm dark:prose-invert">
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return <MarkdownRender key={i} content={part.text} />;
            default:
              console.warn("Unsupported message part type", part);
              return null;
          }
        })}
      </div>

      <MessageButtons
        className="absolute -bottom-7 opacity-0 transition-opacity group-hover:opacity-100"
        message={message}
      />
    </div>
  );
};
