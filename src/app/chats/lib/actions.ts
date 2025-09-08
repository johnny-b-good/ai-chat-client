"use server";

import prisma from "@/app/lib/prisma";
import { z } from "zod";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { OpenAIClient } from "@/app/lib/OpenAIClient";

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

  const openaiModels: Array<OpenAI.Model> = [];
  for await (const openaiModel of OpenAIClient.models.list()) {
    openaiModels.push(openaiModel);
  }

  const openaiModel = openaiModels.find(
    (openaiModel) => openaiModel.id === modelName,
  );
  if (!openaiModel) {
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
