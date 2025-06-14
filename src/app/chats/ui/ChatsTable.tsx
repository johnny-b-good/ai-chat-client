// "use client";

import { type FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TrashIcon } from "lucide-react";

import { Character, Chat, Model } from "@/generated/prisma";
import { List, CharacterAvatar } from "@/app/ui";

dayjs.extend(relativeTime);

export type ChatsTableProps = {
  chats: Array<Chat & { model: Model; character: Character | null }>;
};

export const ChatsTable: FC<ChatsTableProps> = ({ chats }) => {
  return (
    <List
      items={chats.map((chat) => ({
        id: chat.id,
        name: chat.name,
        url: `/chats/${chat.id}`,
        description: (
          <div className="flex gap-2">
            {chat.character && (
              <>
                <div>{chat.character?.name ?? "none"}</div> |
              </>
            )}
            <div>{chat.model.name}</div> |
            <div>{dayjs(chat.updatedAt).fromNow()}</div>
          </div>
        ),
        icon: <CharacterAvatar character={chat.character} />,
      }))}
      itemActions={[
        {
          id: "delete",
          label: (
            <span className="inline-flex items-center gap-2">
              <TrashIcon className="size-4 text-red-500" /> Удалить
            </span>
          ),
          callback: async (id: number) => {
            "use server";
            console.log("Tried to delete", id);
          },
        },
      ]}
    />
  );
};
