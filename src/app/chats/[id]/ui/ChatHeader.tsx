import { type FC } from "react";
import { PenIcon } from "lucide-react";

import { Header, BackButton, CharacterAvatar, MenuButton } from "@/app/ui";
import { type Character, type Model, type Chat } from "@/generated/prisma";

import { ChatTitleWithSummary } from "../../ui";

export type ChatHeaderProps = {
  chat: Chat;
  model: Model;
  character: Character | null;
  onSummarizeMenuClick: () => void;
};

export const ChatHeader: FC<ChatHeaderProps> = ({
  chat,
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
                  <PenIcon className="size-4" /> Edit chat name and summary
                </span>
              ),
              callback: onSummarizeMenuClick,
            },
          ]}
        />
      }
    >
      <div className="grid grid-cols-[min-content_1fr] items-center gap-4">
        <CharacterAvatar character={character} />

        <div className="flex min-w-0 flex-col justify-center text-sm">
          {character ? (
            <div>
              <span className="text-base">{character.name}</span>
              <span className="text-slate-500"> by {model.name}</span>
            </div>
          ) : (
            <div>
              <span>{model.name}</span>
            </div>
          )}
          <ChatTitleWithSummary chat={chat} />
        </div>
      </div>
    </Header>
  );
};
