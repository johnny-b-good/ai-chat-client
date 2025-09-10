import OpenAI from "openai";

import prisma from "@/app/lib/prisma";
import {
  Page,
  Body,
  Header,
  BackButton,
  SearchPanel,
  EmptyList,
} from "@/app/ui";
import { OpenAIClient } from "@/app/lib/OpenAIClient";

import { ChatCreationForm, ChatsList } from "./ui";
import { groupChatsByDate } from "./lib/utils";

export default async function ChatListPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const openaiModels: Array<OpenAI.Model> = [];
  for await (const openaiModel of OpenAIClient.models.list()) {
    openaiModels.push(openaiModel);
  }

  const chats = await prisma.chat.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: { model: true, character: true },
    where: {
      OR: [
        { name: { contains: query } },
        {
          character: {
            name: { contains: query },
          },
        },
        {
          model: {
            name: { contains: query },
          },
        },
      ],
    },
  });

  const characters = await prisma.character.findMany();

  const chatGroups = groupChatsByDate(chats);

  const areThereAnyChats =
    chatGroups.reduce((acc, group) => acc + group.chats.length, 0) > 0;

  return (
    <Page className="grid-rows-[min-content_min-content_1fr_min-content]">
      <Header
        left={<BackButton href="/" />}
        right={
          <ChatCreationForm models={openaiModels} characters={characters} />
        }
      >
        Chats
      </Header>

      <SearchPanel />

      {areThereAnyChats ? (
        <Body className="flex flex-col">
          <ChatsList chatGroups={chatGroups} />
        </Body>
      ) : (
        <EmptyList message="No chats found" />
      )}
    </Page>
  );
}
