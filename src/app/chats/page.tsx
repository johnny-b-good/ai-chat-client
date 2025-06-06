import ollama from "ollama";
import prisma from "@/app/lib/prisma";

import { ChatCreationForm, ChatsTable } from "./ui";
import { PageWithHeader, Body, Header, BackButton } from "@/app/ui";

export default async function ChatListPage() {
  const { models } = await ollama.list();
  const chats = await prisma.chat.findMany({ include: { model: true } });

  return (
    <PageWithHeader>
      <Header left={<BackButton href="/" />}>Chats</Header>

      <Body className="grid grid-cols-1 grid-rows-[min-content_1fr] gap-4">
        <ChatCreationForm models={models} />

        <ChatsTable chats={chats} />
      </Body>
    </PageWithHeader>
  );
}
