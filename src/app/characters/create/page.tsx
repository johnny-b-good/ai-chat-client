import { CharacterEditorForm } from "@/app/characters/ui";
import { createCharacter } from "@/app/characters/lib/actions";
import { Page, Body, Header, LinkButton } from "@/app/ui";

export default async function CharacterCreatePage() {
  return (
    <Page>
      <Header left={<LinkButton href="/characters" />}>
        Create a new character
      </Header>
      <Body>
        <CharacterEditorForm action={createCharacter} />
      </Body>
    </Page>
  );
}
