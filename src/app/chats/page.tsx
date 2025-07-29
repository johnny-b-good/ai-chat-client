import ollama from "ollama";
import prisma from "@/app/lib/prisma";

import { ChatCreationForm, ChatsList, EmptyChatList } from "./ui";
import { Page, Body, Header, BackButton } from "@/app/ui";
import { groupChatsByDate } from "./lib/utils";

export default async function ChatListPage() {
  const { models } = await ollama.list();

  const chats = await prisma.chat.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: { model: true, character: true },
  });

  const characters = await prisma.character.findMany();

  const chatGroups = groupChatsByDate(chats);

  const areThereAnyChats =
    chatGroups.reduce((acc, group) => acc + group.chats.length, 0) > 0;

  return (
    <Page>
      <Header
        left={<BackButton href="/" />}
        right={<ChatCreationForm models={models} characters={characters} />}
      >
        Chats
      </Header>
      {areThereAnyChats ? (
        <Body className="flex flex-col">
          <ChatsList chatGroups={chatGroups} />
        </Body>
      ) : (
        <EmptyChatList />
      )}
    </Page>
  );
}
