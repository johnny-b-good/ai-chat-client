import { Plus } from "lucide-react";
import Link from "next/link";

import prisma from "@/app/lib/prisma";
import {
  Page,
  Body,
  Header,
  BackButton,
  SearchPanel,
  EmptyList,
} from "@/app/ui";
import { Button } from "@/components/ui";

import { CharactersList } from "./ui";

export default async function CharacterListPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const characters = await prisma.character.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      name: {
        contains: query,
      },
    },
  });

  return (
    <Page className="grid-rows-[min-content_min-content_1fr_min-content]">
      <Header
        left={<BackButton href="/" />}
        right={
          <Button variant="ghost" asChild>
            <Link href="/characters/create">
              <Plus className="text-primary size-6" />
            </Link>
          </Button>
        }
      >
        Characters
      </Header>

      <SearchPanel />

      {characters.length > 0 ? (
        <Body className="flex flex-col">
          <CharactersList characters={characters} />
        </Body>
      ) : (
        <EmptyList message="No characters found" />
      )}
    </Page>
  );
}
