"use client";

import { type FC, useState } from "react";
import { Loader2Icon, ChevronDownIcon } from "lucide-react";
import Markdown from "react-markdown";

export type MarkdownRenderProps = {
  content: string;
};

const THOUGHTS_START_TOKEN = "<think>";
const THOUGHTS_END_TOKEN = "</think>";

export const MarkdownRender: FC<MarkdownRenderProps> = ({ content }) => {
  const startedThinking = content.includes(THOUGHTS_START_TOKEN);
  const doneThinking = content.includes(THOUGHTS_END_TOKEN);

  const [showThoughts, setShowThoughts] = useState<boolean>(false);

  if (!startedThinking) {
    return <Markdown>{content}</Markdown>;
  } else if (startedThinking && !doneThinking) {
    return (
      <>
        <div
          className="text-muted-foreground flex cursor-pointer items-center gap-2"
          onClick={() => {
            setShowThoughts((prev) => !prev);
          }}
        >
          <Loader2Icon className="size-4 animate-spin" />
          Thinking…
          <ChevronDownIcon className="size-4" />
        </div>

        {showThoughts && (
          <div className="border-border border-l-2 pl-4">
            <Markdown>{content.replace(THOUGHTS_START_TOKEN, "")}</Markdown>
          </div>
        )}
      </>
    );
  } else {
    const [thoughts, reply] = content
      .replace(THOUGHTS_START_TOKEN, "")
      .split(THOUGHTS_END_TOKEN);

    return (
      <>
        <div
          className="text-muted-foreground flex cursor-pointer items-center gap-2"
          onClick={() => {
            setShowThoughts((prev) => !prev);
          }}
        >
          Thoughts
          <ChevronDownIcon className="size-4" />
        </div>

        {showThoughts && (
          <div className="border-border border-l-2 pl-4">
            <Markdown>{thoughts}</Markdown>
          </div>
        )}

        <Markdown>{reply}</Markdown>
      </>
    );
  }
};
