import prisma from "@/app/lib/prisma";

import { CharactersList } from "./ui";
import { PageWithHeader, Body, Header, BackButton } from "@/app/ui";

export default async function CharacterListPage() {
  const characters = await prisma.character.findMany();

  return (
    <PageWithHeader>
      <Header left={<BackButton href="/" />}>Characters</Header>
      <Body>
        <CharactersList characters={characters} />
      </Body>
    </PageWithHeader>
  );
}
