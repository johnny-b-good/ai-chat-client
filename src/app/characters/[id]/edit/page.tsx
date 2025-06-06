import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

import { CharacterEditorForm } from "@/app/characters/ui";
import { updateCharacter } from "@/app/characters/lib/actions";
import { PageWithHeader, Body, Header, BackButton } from "@/app/ui";

export default async function CharacterEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = parseInt(params.id);

  const character = await prisma.character.findUnique({
    where: { id: id },
  });

  if (!character) {
    notFound();
  }

  const updateCharacterWithId = updateCharacter.bind(null, id);

  return (
    <PageWithHeader>
      <Header left={<BackButton href="/characters" />}>
        Edit {character.name}
      </Header>
      <Body>
        <CharacterEditorForm
          character={character}
          action={updateCharacterWithId}
        />
      </Body>
    </PageWithHeader>
  );
}
