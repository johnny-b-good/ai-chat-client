"use client";

import { type FC } from "react";
import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import { type UIMessageWithMeta } from "../../lib/types";

export type MessageButtonsProps = {
  className?: string;
  message: UIMessageWithMeta;
};

export const MessageButtons: FC<MessageButtonsProps> = ({
  className,
  message,
}) => {
  return (
    <div
      className={cn(
        "text-muted-foreground z-1 flex w-max min-w-full items-center gap-4",
        message.role === "user"
          ? "right-0 justify-end"
          : "left-0 justify-start",
        className,
      )}
    >
      <Button
        size="icon"
        className="size-6"
        variant="ghost"
        onClick={() => {
          alert("copy!");
        }}
      >
        <CopyIcon className="size-4" />
      </Button>
    </div>
  );
};
