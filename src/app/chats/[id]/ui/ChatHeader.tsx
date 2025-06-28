import { type FC } from "react";
import { PenIcon } from "lucide-react";

import { Header, BackButton, CharacterAvatar, MenuButton } from "@/app/ui";
import { type Character, type Model } from "@/generated/prisma";

export type ChatHeaderProps = {
  model: Model;
  character: Character | null;
  onSummarizeMenuClick: () => void;
};

export const ChatHeader: FC<ChatHeaderProps> = ({
  model,
  character,
  onSummarizeMenuClick,
}) => {
  return (
    <Header
      left={<BackButton href="/chats" />}
      right={
        <MenuButton
          context={undefined}
          actions={[
            {
              id: "summarize",
              label: (
                <span className="inline-flex items-center gap-2">
                  <PenIcon className="size-4" /> Chat name and summary
                </span>
              ),
              callback: onSummarizeMenuClick,
            },
          ]}
        />
      }
    >
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
