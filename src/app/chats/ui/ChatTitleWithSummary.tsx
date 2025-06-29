"use client";

import { type FC } from "react";

import { Chat } from "@/generated/prisma";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui";

export type ChatTitleWithSummaryProps = {
  chat: Chat;
};

export const ChatTitleWithSummary: FC<ChatTitleWithSummaryProps> = ({
  chat,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="max-w-full truncate" asChild>
        <span>{chat.name}</span>
      </HoverCardTrigger>

      <HoverCardContent className="w-96" side="bottom" align="start">
        <div className="flex flex-col gap-1">
          <div className="font-semibold">{chat.name}</div>
          {chat.summary && <div className="text-sm">{chat.summary}</div>}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
