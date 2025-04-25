"use server";

import prisma from "@/app/lib/prisma";
import z from "zod";
import ollama from "ollama";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type NewChatFormState = {
  errors?: {
    model?: string[];
  };
  message?: string | null;
};

const NewChatFormSchema = z.object({
  model: z.string().min(1, "Required field"),
});

export const createNewChat = async (
  prevState: NewChatFormState,
  formData: FormData,
): Promise<NewChatFormState> => {
  const validatedFields = NewChatFormSchema.safeParse({
    model: formData.get("model"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid value",
    };
  }

  const { model: modelName } = validatedFields.data;

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

    const chat = await prisma.chat.create({
      data: {
        modelId: model.id,
        name: "New chat",
      },
    });

    newChatId = chat.id;
  } catch (err) {
    console.error(err);
    return { message: "Chat creation error" };
  }

  revalidatePath("/");
  redirect(`/chats/${newChatId}`);
};
