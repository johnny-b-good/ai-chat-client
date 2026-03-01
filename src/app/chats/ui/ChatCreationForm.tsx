"use client";

import { useActionState, type FC } from "react";
import OpenAI from "openai";
import { Plus } from "lucide-react";

import {
  Button,
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from "@/components/ui";
import { createNewChat } from "../lib/actions";
import { Character } from "@/generated/prisma/client";

type ChatCreationFormProps = {
  models: OpenAI.Model[];
  characters: Character[];
};

export const ChatCreationForm: FC<ChatCreationFormProps> = ({
  models,
  characters,
}) => {
  const [state, formAction] = useActionState(createNewChat, {
    message: null,
    errors: {},
  });

  const modelNames = models.map((model) => model.id);
  modelNames.sort();

  const charactesToSelect = characters.map((char) => ({
    value: char.id,
    label: char.name,
  }));

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon">
            <Plus className="text-primary size-6" />
          </Button>
        }
      />

      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create a new chat</DialogTitle>
            <DialogDescription>
              Pick a model and a character (optional) to create a new chat.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Select name="model" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {modelNames.map((name) => {
                    return (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="character">Character</Label>
              <Select name="character" items={charactesToSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a character" />
                </SelectTrigger>
                <SelectContent>
                  {charactesToSelect.map((char) => {
                    return (
                      <SelectItem key={char.value} value={char.value}>
                        {char.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {state.message && <div>{state.message}</div>}
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
