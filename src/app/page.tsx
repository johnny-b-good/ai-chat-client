import { PageWithHeader, Body, Header } from "@/app/ui";
import Link from "next/link";
import { MessageCircleIcon, CircleUserRoundIcon, BotIcon } from "lucide-react";

import { Button } from "@/components/ui";

export default async function HomePage() {
  return (
    <PageWithHeader>
      <Header
        left={
          <Button variant="ghost" size="icon">
            <BotIcon className="size-6 text-slate-500" />
          </Button>
        }
      >
        Ollama Client
      </Header>

      <Body className="flex flex-col gap-4">
        <Link
          href="/chats"
          className="flex items-center gap-4 rounded bg-white p-4 text-xl shadow"
        >
          <MessageCircleIcon className="size-6 text-slate-500" />
          Chats
        </Link>
        <Link
          href="/characters"
          className="flex items-center gap-4 rounded bg-white p-4 text-xl shadow"
        >
          <CircleUserRoundIcon className="size-6 text-slate-500" />
          Characters
        </Link>
      </Body>
    </PageWithHeader>
  );
}
