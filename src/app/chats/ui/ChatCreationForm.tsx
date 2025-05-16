"use client";

import { useActionState, type FC } from "react";
import { type ModelResponse } from "ollama";

import {
  Button,
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { createNewChat } from "../lib/actions";

type ChatCreationFormProps = {
  models: ModelResponse[];
};

export const ChatCreationForm: FC<ChatCreationFormProps> = ({ models }) => {
  const [state, formAction] = useActionState(createNewChat, {
    message: null,
    errors: {},
  });

  const modelNames = models.map((model) => model.name);
  modelNames.sort();

  return (
    <form action={formAction} className="flex gap-4">
      <Select name="model">
        <SelectTrigger className="flex-1 bg-white">
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

      <Button type="submit">New chat</Button>

      {state.message && <div>{state.message}</div>}
    </form>
  );
};
