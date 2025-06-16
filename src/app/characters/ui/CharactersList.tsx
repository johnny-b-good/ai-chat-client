"use client";

import { type FC, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TrashIcon } from "lucide-react";

import { Character } from "@/generated/prisma";
import { List, CharacterAvatar, DeletionDialog } from "@/app/ui";

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
                <TrashIcon className="size-4 text-red-500" /> Delete
              </span>
            ),
            callback: (id: number) => {
              setCharIdForDeletion(id);
            },
          },
        ]}
      />

      <DeletionDialog
        title="Delete character"
        description="Do you really want to delete this character?"
        successMessage="The character has been deleted"
        failureMessage="Character deletion error"
        isOpen={charIdForDeletion !== null}
        onOpenChange={() => {
          setCharIdForDeletion(null);
        }}
        onDelete={async () => {
          if (charIdForDeletion !== null) {
            await deleteCharacter(charIdForDeletion);
          }
        }}
      />
    </>
  );
};
