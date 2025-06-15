import ollama from "ollama";
import prisma from "@/app/lib/prisma";

import { ChatCreationForm, ChatsList } from "./ui";
import { PageWithHeader, Body, Header, BackButton } from "@/app/ui";

export default async function ChatListPage() {
  const { models } = await ollama.list();
  const chats = await prisma.chat.findMany({
    include: { model: true, character: true },
  });
  const characters = await prisma.character.findMany();

  return (
    <PageWithHeader>
      <Header
        left={<BackButton href="/" />}
        right={<ChatCreationForm models={models} characters={characters} />}
      >
        Chats
      </Header>

      <Body className="grid grid-cols-1 grid-rows-[1fr] gap-4">
        <ChatsList chats={chats} />
      </Body>
    </PageWithHeader>
  );
}
