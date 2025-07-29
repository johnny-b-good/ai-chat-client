import dayjs from "dayjs";

import { type Chat } from "@/generated/prisma";
import { type ChatGroup } from "./types";

/**
 * Split a list of chats into separate groups by update date.
 *
 * The groups are: updated today, in last 7 days, in last 30 days,
 * then multiple groups by year and month.
 */
export const groupChatsByDate = <T extends Chat>(
  chats: T[],
): ChatGroup<T>[] => {
  const today = dayjs().startOf("day");
  const dayAt7DaysAgo = dayjs().subtract(7, "day").startOf("day");
  const dayAt30DaysAgo = dayjs().subtract(30, "day").startOf("day");

  const groups: {
    today: T[];
    last7: T[];
    last30: T[];
    monthly: Record<string, T[]>;
  } = {
    today: [],
    last7: [],
    last30: [],
    monthly: {},
  };

  chats.sort((a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)));

  for (const chat of chats) {
    const updated = dayjs(chat.updatedAt);
    if (updated.isSame(today, "day")) {
      groups.today.push(chat);
    } else if (updated.isAfter(dayAt7DaysAgo, "day")) {
      groups.last7.push(chat);
    } else if (updated.isAfter(dayAt30DaysAgo, "day")) {
      groups.last30.push(chat);
    } else {
      const monthKey = updated.format("YYYY-MM");
      if (!groups.monthly[monthKey]) {
        groups.monthly[monthKey] = [];
      }
      groups.monthly[monthKey].push(chat);
    }
  }

  const monthlyKeys = Object.keys(groups.monthly).sort((a, b) => {
    const [yearA, monthA] = a.split("-").map(Number);
    const [yearB, monthB] = b.split("-").map(Number);
    if (yearA !== yearB) return yearB - yearA;
    return monthB - monthA;
  });

  const monthlyGroups: ChatGroup<T>[] = monthlyKeys.map((key) => {
    const [year, month] = key.split("-");
    return { type: "monthly", year, month, chats: groups.monthly[key] };
  });

  return [
    { chats: groups.today, type: "today" },
    { chats: groups.last7, type: "last7" },
    { chats: groups.last30, type: "last30" },
    ...monthlyGroups,
  ];
};
