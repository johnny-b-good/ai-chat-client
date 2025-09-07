import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";

import { openai } from "@/app/lib/openai";
import prisma from "@/app/lib/prisma";
import { normalizeMessages } from "@/app/chats/lib/utils";

export const postRequestBodySchema = z.object({
  id: z.string(),
  message: z.any(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (err) {
    console.error(err);
    return new Response("Invalid request body", { status: 400 });
  }

  const { id, message } = requestBody;

  const chat = await prisma.chat.findUniqueOrThrow({
    where: { id: parseInt(id) },
  });

  const model = await prisma.model.findUniqueOrThrow({
    where: { id: chat.modelId },
  });

  const character = chat.characterId
    ? await prisma.character.findUnique({
        where: { id: chat.characterId },
      })
    : null;

  const dbMessages = await prisma.message.findMany({
    where: { chatId: chat.id },
  });

  let messages: Array<UIMessage>;
  try {
    messages = await normalizeMessages(dbMessages, message);
  } catch (err) {
    console.error(err);
    return new Response("Failed to validate messages", { status: 400 });
  }

  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "user",
      parts: message.parts,
    },
  });

  const result = streamText({
    model: openai.chat(model.name),
    system: character?.systemPrompt,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    onFinish: async ({ responseMessage }) => {
      await prisma.message.create({
        data: {
          chatId: chat.id,
          role: "assistant",
          parts:
            responseMessage.parts?.filter((part) => part.type === "text") ?? [],
        },
      });
    },
  });
}
