import { type Character, type Chat, type Model } from "@/generated/prisma";

export type ChatWithRelated = Chat & {
  model: Model;
  character: Character | null;
};

export interface ChatGroup<T extends Chat = Chat> {
  type: "today" | "last7" | "last30" | "monthly";
  chats: T[];
  year?: string;
  month?: string;
}
