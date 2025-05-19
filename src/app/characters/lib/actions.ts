"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/app/lib/prisma";
import { Character } from "@/generated/prisma";

const CharacterEditorFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  systemPrompt: z.string().min(1, "System Prompt is required"),
  avatarFile: z.optional(z.instanceof(File)),
});

export type CharacterEditorFormState = {
  errors?: {
    name?: string[];
    systemPrompt?: string[];
    avatarFile?: string[];
  };
  message?: string | null;
};

export const createCharacter = async (
  prevState: CharacterEditorFormState,
  formData: FormData,
) => {
  const validatedFields = CharacterEditorFormSchema.safeParse({
    name: formData.get("name"),
    systemPrompt: formData.get("systemPrompt"),
    avatarFile: formData.get("avatarFile"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Form validation error",
    };
  }

  const { name, systemPrompt, avatarFile } = validatedFields.data;

  const avatarBase64 = avatarFile
    ? Buffer.from(await avatarFile.arrayBuffer()).toString("base64")
    : null;

  try {
    await prisma.character.create({
      data: {
        name,
        systemPrompt,
        avatarBase64,
      },
    });
  } catch {
    return { message: "Character creation error" };
  }

  revalidatePath("/characters");
  redirect("/characters");
};

export const updateCharacter = async (
  id: number,
  prevState: CharacterEditorFormState,
  formData: FormData,
) => {
  const validatedFields = CharacterEditorFormSchema.safeParse({
    name: formData.get("name"),
    systemPrompt: formData.get("systemPrompt"),
    avatarFile: formData.get("avatarFile"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Form validation error",
    };
  }

  const { name, systemPrompt, avatarFile } = validatedFields.data;

  const avatarBase64 = avatarFile
    ? Buffer.from(await avatarFile.arrayBuffer()).toString("base64")
    : null;

  const data: Partial<Character> = {
    name,
    systemPrompt,
  };

  if (avatarFile && avatarFile.size > 0) {
    data.avatarBase64 = avatarBase64;
  }

  try {
    await prisma.character.update({
      where: { id },
      data,
    });
  } catch {
    return { message: "Character update error" };
  }

  revalidatePath("/characters");
  redirect("/characters");
};
