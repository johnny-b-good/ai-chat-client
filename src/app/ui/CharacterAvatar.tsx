import { type FC } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { type Character } from "@/generated/prisma";
import { cn } from "@/lib/utils";

export type CharacterAvatarProps = {
  character: Character | null;
  className?: string;
};

export const CharacterAvatar: FC<CharacterAvatarProps> = ({
  character,
  className,
}) => {
  return (
    <Avatar className={cn("size-10 shadow", className)}>
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
