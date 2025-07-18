import { Page, Body, Header } from "@/app/ui";
import Link from "next/link";
import { MessageCircleIcon, CircleUserRoundIcon, BotIcon } from "lucide-react";

import { Button } from "@/components/ui";

export default async function HomePage() {
  return (
    <Page>
      <Header
        left={
          <Button variant="ghost" size="icon">
            <BotIcon className="text-primary size-6" />
          </Button>
        }
      >
        Ollama Client
      </Header>

      <Body className="flex flex-col gap-4">
        <Link
          href="/chats"
          className="bg-card flex items-center gap-4 rounded p-4 text-xl shadow"
        >
          <MessageCircleIcon className="text-primary size-6" />
          Chats
        </Link>
        <Link
          href="/characters"
          className="bg-card flex items-center gap-4 rounded p-4 text-xl shadow"
        >
          <CircleUserRoundIcon className="text-primary size-6" />
          Characters
        </Link>
      </Body>
    </Page>
  );
}
