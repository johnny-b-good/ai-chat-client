import { type FC } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { type Character } from "@/generated/prisma";

export type CharacterAvatarProps = {
  character: Character | null;
};

export const CharacterAvatar: FC<CharacterAvatarProps> = ({ character }) => {
  return (
    <Avatar>
      {character && character.avatarBase64 && (
        <AvatarImage
          src={`data:image/png;base64,${character.avatarBase64}`}
          alt={character.name}
        />
      )}
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
};
