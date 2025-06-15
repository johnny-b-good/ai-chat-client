"use client";

import { type FC, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Character } from "@/generated/prisma";
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

import { deleteCharacter } from "../lib/actions";

dayjs.extend(relativeTime);

export type CharactersListProps = {
  characters: Character[];
};

export const CharactersList: FC<CharactersListProps> = ({ characters }) => {
  const [charIdForDeletion, setCharIdForDeletion] = useState<number | null>(
    null,
  );

  return (
    <>
      <List
        items={characters.map((character) => ({
          id: character.id,
          name: character.name,
          url: `/characters/${character.id}/edit`,
          description: <div>{dayjs(character.updatedAt).fromNow()}</div>,
          icon: <CharacterAvatar character={character} />,
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
              setCharIdForDeletion(id);
            },
          },
        ]}
      />

      <Dialog
        open={charIdForDeletion !== null}
        onOpenChange={() => {
          setCharIdForDeletion(null);
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
                if (charIdForDeletion !== null) {
                  try {
                    await deleteCharacter(charIdForDeletion);
                    toast.info("The character has been deleted");
                  } catch {
                    toast.error("Character deletion error");
                  } finally {
                    setCharIdForDeletion(null);
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
