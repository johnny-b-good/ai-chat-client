import prisma from "@/app/lib/prisma";
import OpenAI from "openai";

import { ChatCreationForm, ChatsList, EmptyChatList } from "./ui";
import { Page, Body, Header, BackButton } from "@/app/ui";
import { groupChatsByDate } from "./lib/utils";
import { OpenAIClient } from "@/app/lib/OpenAIClient";

export default async function ChatListPage() {
  const openaiModels: Array<OpenAI.Model> = [];
  for await (const openaiModel of OpenAIClient.models.list()) {
    openaiModels.push(openaiModel);
  }

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
        right={
          <ChatCreationForm models={openaiModels} characters={characters} />
        }
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
