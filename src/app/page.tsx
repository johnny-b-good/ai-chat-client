import { Page, Body, Header } from "@/app/ui";
import Link from "next/link";
import { MessageCircleIcon, CircleUserRoundIcon } from "lucide-react";

export default async function HomePage() {
  return (
    <Page>
      <Header>AI Chat Client</Header>

      <Body>
        <div className="flex flex-col gap-4">
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
        </div>
      </Body>
    </Page>
  );
}
