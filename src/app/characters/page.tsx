import { Plus } from "lucide-react";
import Link from "next/link";

import prisma from "@/app/lib/prisma";
import { PageWithHeader, Body, Header, BackButton } from "@/app/ui";
import { Button } from "@/components/ui";

import { CharactersList } from "./ui";

export default async function CharacterListPage() {
  const characters = await prisma.character.findMany();

  return (
    <PageWithHeader>
      <Header
        left={<BackButton href="/" />}
        right={
          <Button variant="ghost" asChild>
            <Link href="/characters/create">
              <Plus className="size-6 text-slate-500" /> Create
            </Link>
          </Button>
        }
      >
        Characters
      </Header>
      <Body className="grid grid-cols-1 grid-rows-[1fr] gap-4">
        <CharactersList characters={characters} />
      </Body>
    </PageWithHeader>
  );
}
