"use client";

import { type FC, useState } from "react";
import { Loader2Icon, ChevronDownIcon } from "lucide-react";
import Markdown, { Options as MarkdownProps } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

export type MarkdownRenderProps = {
  content: string;
};

const THOUGHTS_START_TOKEN = "<think>";
const THOUGHTS_END_TOKEN = "</think>";
const COMMON_MD_PROPS: MarkdownProps = {
  remarkPlugins: [remarkGfm],
};

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
              <Markdown {...COMMON_MD_PROPS}>{thoughts}</Markdown>
            </div>
          )}
        </>
      )}

      {startedThinking && doneThinking ? (
        <Markdown {...COMMON_MD_PROPS}>{reply}</Markdown>
      ) : startedThinking ? null : (
        <Markdown {...COMMON_MD_PROPS}>{content}</Markdown>
      )}
    </>
  );
};
