"use client";

import { type FC, useState } from "react";
import { Loader2Icon, ChevronDownIcon } from "lucide-react";
import Markdown from "react-markdown";

import { cn } from "@/lib/utils";

export type MarkdownRenderProps = {
  content: string;
};

const THOUGHTS_START_TOKEN = "<think>";
const THOUGHTS_END_TOKEN = "</think>";

export const MarkdownRender: FC<MarkdownRenderProps> = ({ content }) => {
  const [showThoughts, setShowThoughts] = useState<boolean>(false);

  const startedThinking = content.includes(THOUGHTS_START_TOKEN);
  const doneThinking = content.includes(THOUGHTS_END_TOKEN);

  const [thoughts, reply] = content
    .replace(THOUGHTS_START_TOKEN, "")
    .split(THOUGHTS_END_TOKEN);

  return (
    <>
      {startedThinking && (
        <>
          <div
            className="text-muted-foreground flex cursor-pointer items-center gap-2"
            onClick={() => {
              setShowThoughts((prev) => !prev);
            }}
          >
            {doneThinking ? (
              "Thoughts"
            ) : (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                Thinking…
              </>
            )}

            <ChevronDownIcon
              className={cn(
                "size-4 transition-transform",
                showThoughts && "rotate-180",
              )}
            />
          </div>

          {showThoughts && (
            <div className="border-border border-l-2 pl-4">
              <Markdown>{thoughts}</Markdown>
            </div>
          )}
        </>
      )}

      {startedThinking && doneThinking ? (
        <Markdown>{reply}</Markdown>
      ) : startedThinking ? null : (
        <Markdown>{content}</Markdown>
      )}
    </>
  );
};
