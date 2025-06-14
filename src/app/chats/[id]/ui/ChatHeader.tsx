import { type FC } from "react";

import { Header, BackButton, CharacterAvatar } from "@/app/ui";
import { type Character, type Model } from "@/generated/prisma";

export type ChatHeaderProps = {
  model: Model;
  character: Character | null;
};

export const ChatHeader: FC<ChatHeaderProps> = ({ model, character }) => {
  return (
    <Header left={<BackButton href="/chats" />}>
      <div className="flex items-center gap-2">
        <CharacterAvatar character={character} />

        <div className="flex items-baseline gap-2">
          {character ? (
            <>
              <div className="text-lg">{character.name}</div>
              <div className="text-xs text-slate-500">by {model.name}</div>
            </>
          ) : (
            <div className="text-lg">{model.name}</div>
          )}
        </div>
      </div>
    </Header>
  );
};
