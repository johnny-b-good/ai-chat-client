import { appendClientMessage, appendResponseMessages, streamText } from "ai";
import { z } from "zod";

import { openai } from "@/app/lib/openai";
import prisma from "@/app/lib/prisma";

const textPartSchema = z.object({
  text: z.string().min(1).max(2000),
  type: z.enum(["text"]),
});

export const postRequestBodySchema = z.object({
  id: z.string(),
  message: z.object({
    id: z.string(),
    createdAt: z.coerce.date(),
    role: z.enum(["user"]),
    content: z.string().min(1).max(2000),
    parts: z.array(textPartSchema),
  }),
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
      parts: JSON.parse(message.text),
      content: "",
      createdAt: message.createdAt,
      role: message.author === "USER" ? "user" : "assistant",
    })),
    message,
  });

  await prisma.message.create({
    data: {
      chatId: chat.id,
      author: "USER",
      text: JSON.stringify(message.parts),
      status: "COMPLETE",
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
          author: "MODEL",
          text: JSON.stringify(assistantMessage.parts),
          status: "COMPLETE",
        },
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return result.toDataStreamResponse();
}
