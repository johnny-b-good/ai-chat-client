"use client";

import { type FC, useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";

import { type Character, type Model, type Chat } from "@/generated/prisma";
import { Page, Body, Footer } from "@/app/ui";
import { type UIMessageWithMeta } from "../../lib/types";

import {
  MessageList,
  MessageBubble,
  MessageForm,
  EmptyMessageList,
  ChatHeader,
  ChatSummaryForm,
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

  const { messages, sendMessage, status, error } = useChat({
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

  /** Message list container */
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat messages
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  // Show errors from useChat
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const isMessageFormDisabled =
    status === "streaming" || status === "submitted";

  const handleSubmit = () => {
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
                  message={message}
                  character={character}
                  model={model}
                />
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
          disabled={isMessageFormDisabled}
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
