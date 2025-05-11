import { z } from "zod";

const MAX_TEXT_LENGTH = 10000;

const textPartSchema = z.object({
  text: z.string().min(1).max(MAX_TEXT_LENGTH),
  type: z.enum(["text"]),
});

export const messagePartsSchema = z.array(textPartSchema);

export const messageSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(MAX_TEXT_LENGTH),
  parts: messagePartsSchema,
});
