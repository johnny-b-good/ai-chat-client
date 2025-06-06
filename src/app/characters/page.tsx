import prisma from "@/app/lib/prisma";

import { CharactersTable } from "./ui";
import { PageWithHeader, Body, Header, BackButton } from "@/app/ui";

export default async function CharacterListPage() {
  const characters = await prisma.character.findMany();

  return (
    <PageWithHeader>
      <Header left={<BackButton href="/" />}>Characters</Header>
      <Body>
        <CharactersTable characters={characters} />
      </Body>
    </PageWithHeader>
  );
}
