"use server";

import prisma from "@/app/lib/prisma";
import { z } from "zod/v3";
import { revalidatePath } from "next/cache";
import { generateObject } from "ai";

import { openai } from "@/app/lib/openai";
import { normalizeMessages } from "../../lib/utils";

const ChatEditorFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(1000),
  summary: z.string(),
});

export type ChatEditorFormState = {
  errors?: {
    name?: string[];
    summary?: string[];
  };
  message?: string | null;
};

export type SummaryResult =
  | { status: "ok"; name: string; summary: string }
  | { status: "error"; message: string };

export const summarizeChat = async (id: number): Promise<SummaryResult> => {
  const chat = await prisma.chat.findFirstOrThrow({
    where: { id },
    include: { character: true, model: true },
  });

  const dbMessages = await prisma.message.findMany({ where: { chatId: id } });

  const messages = await normalizeMessages(dbMessages);

  const chatLog = messages
    .map((message) => {
      const messageText = message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("\n");

      if (
        messageText &&
        (message.role === "user" || message.role === "assistant")
      ) {
        const author =
          message.role === "user"
            ? "User"
            : chat.character
              ? chat.character.name
              : `Model "${chat.model.name}"`;

        return `${author} said at ${message.metadata?.createdAt.toISOString()}:\n${messageText}`;
      } else {
        return null;
      }
    })
    .filter((text) => text !== null)
    .join("\n");

  if (!process.env.SUMMARIZE_MODEL) {
    throw new Error("Env variable SUMMARIZE_MODEL is not set");
  }

  try {
    const {
      object: { name, summary },
    } = await generateObject({
      model: openai.chat(process.env.SUMMARIZE_MODEL),
      output: "object",
      mode: "json",
      schema: z.object({
        name: z
          .string()
          .describe(
            "A title suitable for this chat. Should be a single short sentence describing the topic of the chat containing maxiumum of ten words.",
          ),
        summary: z
          .string()
          .describe(
            "A short summary describing most important topics, events, reactions that occured in this chat. Summary should be a short paragraph, containing maximum of 5-7 sentences.",
          ),
      }),
      prompt: `Generate a JSON object strictly following supplied schema for the following dialog:\n${chatLog}`,
    });

    return { status: "ok", name, summary };
  } catch (err) {
    console.log(err);
    return { status: "error", message: "Chat summary generation error" };
  }
};

export const updateChat = async (id: number, formData: FormData) => {
  const validatedFields = ChatEditorFormSchema.safeParse({
    name: formData.get("name"),
    summary: formData.get("summary"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Form validation error",
    } as ChatEditorFormState;
  }

  const { name, summary } = validatedFields.data;

  try {
    await prisma.chat.update({
      where: { id },
      data: {
        name,
        summary,
      },
    });
  } catch {
    return {
      status: "error",
      message: "Chat update error",
    } as ChatEditorFormState;
  }

  revalidatePath("/chats");
  revalidatePath(`/chats/${id}`);
};
