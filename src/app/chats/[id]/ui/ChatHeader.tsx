import { type FC } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button, Avatar, AvatarFallback } from "@/components/ui";
import { ChatsHeader } from "../../ui";

export type ChatHeaderProps = {
  modelName: string;
};

export const ChatHeader: FC<ChatHeaderProps> = ({ modelName }) => {
  return (
    <ChatsHeader>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>

        <div className="text-lg">{modelName}</div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 transform"
        asChild
      >
        <Link href="/chats">
          <ChevronLeft className="size-6" />
        </Link>
      </Button>
    </ChatsHeader>
  );
};
