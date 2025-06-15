"use client";

import { type FC, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Character, Chat, Model } from "@/generated/prisma";
import { List, CharacterAvatar } from "@/app/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui";

import { deleteChat } from "../lib/actions";

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
            callback: (id: number) => {
              setChatIdForDeletion(id);
            },
          },
        ]}
      />

      <Dialog
        open={chatIdForDeletion !== null}
        onOpenChange={() => {
          setChatIdForDeletion(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete chat</DialogTitle>
            <DialogDescription>
              Do you really want to delete this chat?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              variant="destructive"
              onClick={async () => {
                if (chatIdForDeletion !== null) {
                  try {
                    await deleteChat(chatIdForDeletion);
                    toast.info("The chat has been deleted");
                  } catch {
                    toast.error("Chat deletion error");
                  } finally {
                    setChatIdForDeletion(null);
                  }
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
