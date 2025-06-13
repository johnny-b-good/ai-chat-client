import { CharacterEditorForm } from "@/app/characters/ui";
import { createCharacter } from "@/app/characters/lib/actions";
import { PageWithHeader, Body, Header, BackButton } from "@/app/ui";

export default async function CharacterCreatePage() {
  return (
    <PageWithHeader>
      <Header left={<BackButton href="/characters" />}>
        Create a new character
      </Header>
      <Body>
        <CharacterEditorForm action={createCharacter} />
      </Body>
    </PageWithHeader>
  );
}
