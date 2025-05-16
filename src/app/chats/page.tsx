import ollama from "ollama";
import prisma from "@/app/lib/prisma";

import { ChatCreationForm, ChatsTable, ChatsHeader } from "./ui";

export default async function ChatListPage() {
  const { models } = await ollama.list();
  const chats = await prisma.chat.findMany({ include: { model: true } });

  return (
    <div className="grid h-dvh grid-cols-1 grid-rows-[min-content_1fr]">
      <ChatsHeader>Recent chats</ChatsHeader>
      <div className="mx-auto grid w-full grid-cols-1 grid-rows-[min-content_1fr] gap-4 p-4 sm:w-150">
        <ChatCreationForm models={models} />

        <ChatsTable chats={chats} />
      </div>
    </div>
  );
}
