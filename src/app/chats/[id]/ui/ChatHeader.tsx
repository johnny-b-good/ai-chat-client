import { type FC } from "react";

import { Avatar, AvatarFallback } from "@/components/ui";
import { Header, BackButton } from "@/app/ui";

export type ChatHeaderProps = {
  modelName: string;
};

export const ChatHeader: FC<ChatHeaderProps> = ({ modelName }) => {
  return (
    <Header left={<BackButton href="/chats" />}>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="text-lg">{modelName}</div>
      </div>
    </Header>
  );
};
