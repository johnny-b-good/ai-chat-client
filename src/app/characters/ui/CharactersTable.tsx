import { type FC } from "react";
import NextLink from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Character } from "@/generated/prisma";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui";

dayjs.extend(relativeTime);

export type CharactersTableProps = {
  characters: Character[];
};

export const CharactersTable: FC<CharactersTableProps> = ({ characters }) => {
  return (
    <div className="rounded bg-white px-4 py-2 shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Updated at</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {characters.map((character) => {
            return (
              <TableRow key={character.id}>
                <TableCell>
                  <NextLink href={`/characters/${character.id}/edit`}>
                    {character.name}
                  </NextLink>
                </TableCell>

                <TableCell className="text-right">
                  {dayjs(character.updatedAt).fromNow()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
