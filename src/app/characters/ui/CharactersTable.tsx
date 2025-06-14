import { type FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Character } from "@/generated/prisma";
import { List, CharacterAvatar } from "@/app/ui";

dayjs.extend(relativeTime);

export type CharactersTableProps = {
  characters: Character[];
};

export const CharactersTable: FC<CharactersTableProps> = ({ characters }) => {
  return (
    <List
      items={characters.map((character) => ({
        id: character.id,
        name: character.name,
        url: `/characters/${character.id}`,
        description: <div>{dayjs(character.updatedAt).fromNow()}</div>,
        icon: <CharacterAvatar character={character} />,
      }))}
    />
  );
};
