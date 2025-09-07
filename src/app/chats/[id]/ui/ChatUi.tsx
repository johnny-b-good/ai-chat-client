"use client";

import { type FC, useRef, useEffect, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { type Character, type Model, type Chat } from "@/generated/prisma";
import { Page, Body, Footer } from "@/app/ui";
import { UIMessageWithMeta } from "../../lib/types";

import {
  MessageList,
  MessageBubble,
  MessageForm,
  EmptyMessageList,
  ChatHeader,
  ChatSummaryForm,
  MarkdownRender,
} from ".";

export type ChatUiProps = {
  chat: Chat;
  model: Model;
  character: Character | null;
  initialMessages: UIMessageWithMeta[];
};

export const ChatUi: FC<ChatUiProps> = ({
  chat,
  model,
  character,
  initialMessages,
}) => {
  const [isSummaryFormOpen, setIsSummaryFormOpen] = useState<boolean>(false);

  const [messageInputValue, setMessageInputValue] = useState<string>("");

  const { messages, sendMessage } = useChat({
    id: chat.id.toString(),
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({ messages, id }) {
        return {
          body: {
            message: messages[messages.length - 1],
            id,
          },
        };
      },
    }),
  });

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  const aiDisplayName = character?.name ?? model.name;

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    sendMessage({ text: messageInputValue });
    setMessageInputValue("");
  };

  return (
    <Page>
      <ChatHeader
        chat={chat}
        model={model}
        character={character}
        onSummarizeMenuClick={() => {
          setIsSummaryFormOpen(true);
        }}
      />

      {messages.length === 0 ? (
        <EmptyMessageList />
      ) : (
        <Body ref={listRef}>
          <MessageList>
            {messages.map((message) => {
              return (
                <MessageBubble
                  key={message.id}
                  author={message.role === "assistant" ? aiDisplayName : "You"}
                  authorType={message.role === "assistant" ? "ai" : "user"}
                  createdAt={message.metadata?.createdAt}
                >
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return <MarkdownRender key={i} content={part.text} />;
                      default:
                        console.warn("Unsupported message part type", part);
                        return null;
                    }
                  })}
                </MessageBubble>
              );
            })}
          </MessageList>
        </Body>
      )}

      <Footer className="px-4 pb-4">
        <MessageForm
          value={messageInputValue}
          setValue={setMessageInputValue}
          onSubmit={handleSubmit}
        />
      </Footer>

      <ChatSummaryForm
        chat={chat}
        isOpen={isSummaryFormOpen}
        onOpenChange={(isOpen) => {
          setIsSummaryFormOpen(isOpen);
        }}
      />
    </Page>
  );
};
