"use client";

import { type FC, useActionState } from "react";
import { AlertCircle } from "lucide-react";

import Form from "next/form";

import {
  Button,
  Input,
  Textarea,
  Label,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui";
import { Character } from "@/generated/prisma";
import { type CharacterEditorFormState } from "@/app/characters/lib/actions";

export type CharacterEditorFormProps = {
  action: (
    prevState: CharacterEditorFormState,
    formData: FormData,
  ) => Promise<CharacterEditorFormState>;
  character?: Character;
};

export const CharacterEditorForm: FC<CharacterEditorFormProps> = ({
  action,
  character,
}) => {
  const initialState: CharacterEditorFormState = {
    errors: {},
    message: null,
  };

  const [state, formAction] = useActionState(action, initialState);

  return (
    <Form
      action={formAction}
      className="flex flex-col gap-4 rounded bg-white px-4 py-4 shadow"
    >
      {state.message && (
        <Alert variant="destructive">
          <AlertCircle className="size-6" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required defaultValue={character?.name} />
        {state.errors?.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="systemPrompt">System prompt</Label>
        <Textarea
          id="systemPrompt"
          name="systemPrompt"
          required
          defaultValue={character?.systemPrompt}
        />
        {state.errors?.systemPrompt && (
          <p className="text-red-500">{state.errors.systemPrompt}</p>
        )}
      </div>

      {character?.avatarBase64 && (
        <div className="grid gap-2">
          <Label>Current avatar</Label>
          <Avatar>
            <AvatarImage
              src={`data:image/png;base64,${character.avatarBase64}`}
              alt={character.name}
            />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="avatarFile">New avatar</Label>
        <Input type="file" id="avatarFile" name="avatarFile" />
        {state.errors?.systemPrompt && (
          <p className="text-red-500">{state.errors.systemPrompt}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">Save</Button>
        <Button>Cancel</Button>
      </div>
    </Form>
  );
};
