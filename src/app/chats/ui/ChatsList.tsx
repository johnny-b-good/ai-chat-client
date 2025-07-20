"use client";

import { type FC, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TrashIcon } from "lucide-react";

import { Character, Chat, Model } from "@/generated/prisma";
import { List, CharacterAvatar, DeletionDialog } from "@/app/ui";

import { deleteChat } from "../lib/actions";
import { ChatTitleWithSummary } from "./ChatTitleWithSummary";

dayjs.extend(relativeTime);

export type ChatsListProps = {
  chats: Array<Chat & { model: Model; character: Character | null }>;
};

export const ChatsList: FC<ChatsListProps> = ({ chats }) => {
  const [chatIdForDeletion, setChatIdForDeletion] = useState<number | null>(
    null,
  );

  return (
    <>
      <List
        items={chats.map((chat) => ({
          id: chat.id,
          name: <ChatTitleWithSummary chat={chat} />,
          url: `/chats/${chat.id}`,
          description: (
            <div className="flex flex-col">
              <span className="truncate">
                {chat.character && <>{chat.character?.name} by </>}
                {chat.model.name}
              </span>
              <span>Updated {dayjs(chat.updatedAt).fromNow()}</span>
            </div>
          ),
          icon: <CharacterAvatar character={chat.character} />,
        }))}
        itemActions={[
          {
            id: "delete",
            label: (
              <span className="inline-flex items-center gap-2">
                <TrashIcon className="size-4 text-red-500" /> Delete
              </span>
            ),
            callback: (id) => {
              setChatIdForDeletion(id);
            },
          },
        ]}
      />

      <DeletionDialog
        title="Delete chat"
        description="Do you really want to delete this chat?"
        successMessage="The chat has been deleted"
        failureMessage="Chat deletion error"
        isOpen={chatIdForDeletion !== null}
        onOpenChange={() => {
          setChatIdForDeletion(null);
        }}
        onDelete={async () => {
          if (chatIdForDeletion !== null) {
            await deleteChat(chatIdForDeletion);
          }
        }}
      />
    </>
  );
};
