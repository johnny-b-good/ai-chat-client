import { Plus } from "lucide-react";
import Link from "next/link";

import prisma from "@/app/lib/prisma";
import {
  Page,
  Body,
  Header,
  LinkButton,
  SearchPanel,
  EmptyList,
} from "@/app/ui";
import { buttonVariants } from "@/components/ui";

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
        left={<LinkButton href="/" />}
        right={
          <LinkButton
            href="/characters/create"
            icon={<Plus className="text-primary size-6" />}
          />
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
