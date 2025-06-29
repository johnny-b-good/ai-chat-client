"use client";

import { type FC } from "react";

import { Chat } from "@/generated/prisma";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ChatTitleWithSummaryProps = {
  chat: Chat;
  editable?: boolean;
};

export const ChatTitleWithSummary: FC<ChatTitleWithSummaryProps> = ({
  chat,
  editable,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger
        className={cn(
          "max-w-full truncate",
          editable && "decoration-accent decoration-dotted decoration-1",
        )}
        asChild
      >
        <span>{chat.name}</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-96" side="bottom" align="center">
        <div className="flex flex-col gap-1">
          <div className="font-semibold">{chat.name}</div>
          {chat.summary && <div className="text-sm">{chat.summary}</div>}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
