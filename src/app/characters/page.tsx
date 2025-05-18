import prisma from "@/app/lib/prisma";

import { CharactersHeader, CharactersTable } from "./ui";

export default async function CharacterListPage() {
  const characters = await prisma.character.findMany();

  return (
    <div className="grid h-dvh grid-cols-1 grid-rows-[min-content_1fr]">
      <CharactersHeader />
      <CharactersTable characters={characters} />
    </div>
  );
}
