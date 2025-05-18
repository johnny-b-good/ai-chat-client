import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

import { CharacterEditorForm } from "@/app/characters/ui";
import { updateCharacter } from "@/app/characters/lib/actions";

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
    <div>
      <CharacterEditorForm
        character={character}
        action={updateCharacterWithId}
      />
    </div>
  );
}
