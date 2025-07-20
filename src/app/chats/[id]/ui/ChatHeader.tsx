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
      <div className="grid max-w-4/5 grid-cols-[min-content_1fr] items-center gap-4">
        <CharacterAvatar character={character} />

        <div className="flex min-w-0 flex-col justify-center text-sm">
          {character ? (
            <div className="flex items-baseline gap-2">
              <div className="text-base whitespace-nowrap">
                {character.name}
              </div>
              <div className="text-muted-foreground flex-auto truncate">
                by {model.name}
              </div>
            </div>
          ) : (
            <div>
              <div>{model.name}</div>
            </div>
          )}
          <ChatTitleWithSummary chat={chat} />
        </div>
      </div>
    </Header>
  );
};
