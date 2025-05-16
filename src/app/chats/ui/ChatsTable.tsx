import { type FC } from "react";
import NextLink from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Chat, Model } from "@/generated/prisma";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui";

dayjs.extend(relativeTime);

export type ChatsTableProps = {
  chats: Array<Chat & { model: Model }>;
};

export const ChatsTable: FC<ChatsTableProps> = ({ chats }) => {
  return (
    <div className="rounded bg-white px-4 py-2 shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Model</TableHead>
            <TableHead className="text-right">Updated at</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {chats.map((chat) => {
            return (
              <TableRow key={chat.id}>
                <TableCell>
                  <NextLink href={`/chats/${chat.id}`}>{chat.name}</NextLink>
                </TableCell>
                <TableCell>{chat.model.name}</TableCell>
                <TableCell className="text-right">
                  {dayjs(chat.updatedAt).fromNow()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
