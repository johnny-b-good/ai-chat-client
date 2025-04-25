import ollama from "ollama";
import prisma from "@/app/lib/prisma";
import NextLink from "next/link";

import { ChatCreationForm } from "./ui";

export default async function ChatListPage() {
  const { models } = await ollama.list();
  const chats = await prisma.chat.findMany();

  return (
    <div>
      <h1 className="text-xl">Models</h1>
      <ChatCreationForm models={models} />

      <h1 className="text-xl">Chats</h1>
      <div>
        {chats.map((chat) => {
          return (
            <div key={chat.id}>
              <NextLink href={`/chats/${chat.id}`}>{chat.name}</NextLink>
            </div>
          );
        })}

        {chats.length === 0 && <div>No chats</div>}
      </div>
    </div>
  );
}
