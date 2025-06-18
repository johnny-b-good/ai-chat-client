"use server";

import prisma from "@/app/lib/prisma";
import z from "zod";
import ollama from "ollama";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateObject } from "ai";

import { openai } from "@/app/lib/openai";
import { messagePartsSchema } from "@/app/lib/schemas";

export type NewChatFormState = {
  errors?: {
    model?: string[];
  };
  message?: string | null;
};

const NewChatFormSchema = z.object({
  model: z.string().min(1, "Required field"),
  character: z.coerce.number().optional(),
});

export const createNewChat = async (
  prevState: NewChatFormState,
  formData: FormData,
): Promise<NewChatFormState> => {
  const validatedFields = NewChatFormSchema.safeParse({
    model: formData.get("model"),
    character: formData.get("character"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid value",
    };
  }

  const { model: modelName, character: characterId } = validatedFields.data;

  const { models: ollamaModels } = await ollama.list();

  const ollamaModel = ollamaModels.find(
    (ollamaModel) => ollamaModel.name === modelName,
  );
  if (!ollamaModel) {
    return {
      message: "Invalid model name",
    };
  }

  let newChatId: number;

  try {
    const model = await prisma.model.upsert({
      where: { name: modelName },
      create: {
        name: modelName,
      },
      update: {},
    });

    const character = characterId
      ? await prisma.character.findUnique({
          where: { id: characterId },
        })
      : null;

    const chat = await prisma.chat.create({
      data: {
        modelId: model.id,
        characterId: character?.id,
        name: "New chat",
      },
    });

    newChatId = chat.id;
  } catch (err) {
    console.error(err);
    return { message: "Chat creation error" };
  }

  revalidatePath("/chats");
  redirect(`/chats/${newChatId}`);
};

export const deleteChat = async (id: number) => {
  await prisma.chat.delete({
    where: {
      id,
    },
  });

  revalidatePath("/chats");
};

export const summarize = async (id: number) => {
  const chat = await prisma.chat.findFirstOrThrow({
    where: { id },
    include: { character: true, model: true },
  });
  const messages = await prisma.message.findMany({ where: { chatId: id } });

  const chatLog = messages
    .map((message) => {
      const messageText = messagePartsSchema
        .parse(message.parts)
        .map((part) => part.text)
        .join("\n");

      if (message.role === "user" || message.role === "assistant") {
        const author =
          message.role === "user"
            ? "User"
            : chat.character
              ? chat.character.name
              : `Model "${chat.model.name}"`;

        return `${author} said at ${message.createdAt.toISOString()}:\n${messageText}`;
      } else {
        return null;
      }
    })
    .filter((text) => text !== null)
    .join("\n");

  if (!process.env.SUMMARIZE_MODEL) {
    throw new Error("Env variable SUMMARIZE_MODEL is not set");
  }

  const {
    object: { name, summary },
  } = await generateObject({
    model: openai(process.env.SUMMARIZE_MODEL),
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
          "A short summary describing topics, events, reactions that occured this chat. Summary should be a short paragraph, containing maximum of five sentences.",
        ),
    }),
    prompt: `Generate a JSON object strictly following supplied schema for the following dialog:\n${chatLog}`,
  });

  await prisma.chat.update({
    where: { id },
    data: {
      name,
      summary,
    },
  });

  revalidatePath("/chats");
};
