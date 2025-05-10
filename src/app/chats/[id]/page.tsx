import { type Message as SdkMessage } from "@ai-sdk/react";

import { ChatUi } from "./ui";
import prisma from "@/app/lib/prisma";

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = parseInt(params.id);

  const chat = await prisma.chat.findFirstOrThrow({
    where: { id },
  });

  const model = await prisma.model.findFirstOrThrow({
    where: { id: chat.modelId },
  });

  const messages = await prisma.message.findMany({
    where: {
      chatId: id,
    },
  });

  const initialMessages: SdkMessage[] = messages.map((message) => ({
    id: message.id.toString(),
    content: message.text,
    createdAt: message.createdAt,
    role: message.author === "USER" ? "user" : "assistant",
  }));

  return (
    <ChatUi
      chatId={chat.id.toString()}
      modelName={model.name}
      initialMessages={initialMessages}
    />
  );
}
