import { ChatUi } from "./ui";
import prisma from "@/app/lib/prisma";
import { normalizeMessages } from "../lib/utils";
import { type UIMessageWithMeta } from "../lib/types";

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

  const character = chat.characterId
    ? await prisma.character.findUnique({
        where: { id: chat.characterId },
      })
    : null;

  const messages = await prisma.message.findMany({
    where: {
      chatId: id,
    },
  });

  const initialMessages: Array<UIMessageWithMeta> =
    await normalizeMessages(messages);

  return (
    <ChatUi
      chat={chat}
      model={model}
      character={character}
      initialMessages={initialMessages}
    />
  );
}
