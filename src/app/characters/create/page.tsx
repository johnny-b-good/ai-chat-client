import { CharacterEditorForm } from "@/app/characters/ui";
import { createCharacter } from "@/app/characters/lib/actions";

export default async function CharacterCreatePage() {
  return (
    <div>
      <CharacterEditorForm action={createCharacter} />
    </div>
  );
}
