import { appendClientMessage, appendResponseMessages, streamText } from "ai";
import { z } from "zod";

import { openai } from "@/app/lib/openai";
import prisma from "@/app/lib/prisma";
import { messageSchema, messagePartsSchema } from "@/app/lib/schemas";

export const postRequestBodySchema = z.object({
  id: z.string(),
  message: messageSchema,
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch {
    return new Response("Invalid request body", { status: 400 });
  }

  const { id, message } = requestBody;

  const chat = await prisma.chat.findUniqueOrThrow({
    where: { id: parseInt(id) },
  });

  const model = await prisma.model.findUniqueOrThrow({
    where: { id: chat.modelId },
  });

  const previousMessages = await prisma.message.findMany({
    where: { chatId: chat.id },
  });

  const messages = appendClientMessage({
    messages: previousMessages.map((message) => ({
      id: message.id.toString(),
      parts: messagePartsSchema.parse(message.parts),
      content: "",
      createdAt: message.createdAt,
      role: message.role,
    })),
    message,
  });

  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "user",
      parts: message.parts,
    },
  });

  const result = streamText({
    model: openai(model.name),
    messages,
    onFinish: async ({ response }) => {
      const [, assistantMessage] = appendResponseMessages({
        messages: [message],
        responseMessages: response.messages,
      });

      await prisma.message.create({
        data: {
          chatId: chat.id,
          role: "assistant",
          parts: messagePartsSchema.parse(
            assistantMessage.parts?.filter((part) => part.type === "text") ??
              [],
          ),
        },
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return result.toDataStreamResponse();
}
