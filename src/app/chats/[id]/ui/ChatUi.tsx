"use client";

import { type FC, useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import Markdown from "react-markdown";
import Image from "next/image";

import { type Character, type Model, type Chat } from "@/generated/prisma";

import {
  MessageList,
  MessageBubble,
  MessageForm,
  ChatLayout,
  EmptyMessageList,
  ChatHeader,
  ChatSummaryForm,
} from ".";

export type ChatUiProps = {
  chat: Chat;
  model: Model;
  character: Character | null;
  initialMessages: UIMessage[];
};

export const ChatUi: FC<ChatUiProps> = ({
  chat,
  model,
  character,
  initialMessages,
}) => {
  const [isSummaryFormOpen, setIsSummaryFormOpen] = useState<boolean>(false);

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    id: chat.id.toString(),
    initialMessages,
    experimental_prepareRequestBody: (body) => ({
      id: chat.id.toString(),
      message: body.messages.at(-1),
    }),
  });

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  const aiDisplayName = character?.name ?? model.name;

  return (
    <ChatLayout
      header={
        <ChatHeader
          chat={chat}
          model={model}
          character={character}
          onSummarizeMenuClick={() => {
            setIsSummaryFormOpen(true);
          }}
        />
      }
      body={
        <>
          {messages.length === 0 ? (
            <EmptyMessageList />
          ) : (
            <MessageList ref={listRef}>
              {messages.map((message) => {
                return (
                  <MessageBubble
                    key={message.id}
                    author={
                      message.role === "assistant" ? aiDisplayName : "You"
                    }
                    authorType={message.role === "assistant" ? "ai" : "user"}
                    createdAt={message.createdAt}
                    text={message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return <Markdown key={i}>{part.text}</Markdown>;
                        case "source":
                          return <div key={i}>{part.source.url}</div>;
                        case "reasoning":
                          return <div key={i}>{part.reasoning}</div>;
                        case "tool-invocation":
                          return (
                            <div key={i}>{part.toolInvocation.toolName}</div>
                          );
                        case "file":
                          return (
                            <Image
                              key={i}
                              src={`data:${part.mimeType};base64,${part.data}`}
                              alt=""
                            />
                          );
                      }
                    })}
                  />
                );
              })}
            </MessageList>
          )}

          <MessageForm
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />

          <ChatSummaryForm
            chat={chat}
            isOpen={isSummaryFormOpen}
            onOpenChange={(isOpen) => {
              setIsSummaryFormOpen(isOpen);
            }}
          />
        </>
      }
    />
  );
};
