"use client";

import { type FC, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { TrashIcon } from "lucide-react";

import { List, CharacterAvatar, DeletionDialog } from "@/app/ui";

import { type ChatWithRelated, type ChatGroup } from "../lib/types";
import { deleteChat } from "../lib/actions";
import { ChatTitleWithSummary } from "./ChatTitleWithSummary";
import { ChatGroupHeader } from "./ChatGroupHeader";

dayjs.extend(localizedFormat);

export type ChatsListProps = {
  chatGroups: Array<ChatGroup<ChatWithRelated>>;
};

export const ChatsList: FC<ChatsListProps> = ({ chatGroups }) => {
  const [chatIdForDeletion, setChatIdForDeletion] = useState<number | null>(
    null,
  );

  return (
    <>
      <div className="flex flex-col gap-8">
        {chatGroups.map((group) => {
          const { chats, type, month, year } = group;

          if (chats.length === 0) {
            return null;
          }

          return (
            <div key={type === "monthly" ? `monthly-${year}-${month}` : type}>
              <ChatGroupHeader group={group} />

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
                      <span>
                        Updated at {dayjs(chat.updatedAt).format("LLL")}
                      </span>
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
            </div>
          );
        })}
      </div>

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
