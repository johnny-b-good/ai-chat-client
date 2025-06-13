import { PageWithHeader, Body, Header } from "@/app/ui";
import Link from "next/link";
import { MessageCircle, CircleUserRound } from "lucide-react";

export default async function HomePage() {
  return (
    <PageWithHeader>
      <Header>Ollama Client</Header>
      <Body className="flex flex-col gap-4">
        <Link
          href="/chats"
          className="flex items-center gap-4 rounded bg-white p-4 text-xl shadow"
        >
          <MessageCircle className="size-8 text-slate-500" />
          Chats
        </Link>
        <Link
          href="/characters"
          className="flex items-center gap-4 rounded bg-white p-4 text-xl shadow"
        >
          <CircleUserRound className="size-8 text-slate-500" />
          Characters
        </Link>
      </Body>
    </PageWithHeader>
  );
}
