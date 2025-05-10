import { streamText } from "ai";

import { openai } from "@/app/lib/openai";
import prisma from "@/app/lib/prisma";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { id, messages } = await req.json();

  const chat = await prisma.chat.findUniqueOrThrow({
    where: { id: parseInt(id) },
  });

  const model = await prisma.model.findUniqueOrThrow({
    where: { id: chat.modelId },
  });

  const result = streamText({
    model: openai(model.name),
    messages,
    onError: (err) => {
      console.log(err);
    },
  });

  return result.toDataStreamResponse();
}
