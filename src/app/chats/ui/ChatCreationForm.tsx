"use client";

import { useActionState, type FC } from "react";
import { type ModelResponse } from "ollama";

import { createNewChat } from "../lib/actions";

type ChatCreationFormProps = {
  models: ModelResponse[];
};

export const ChatCreationForm: FC<ChatCreationFormProps> = ({ models }) => {
  const [state, formAction] = useActionState(createNewChat, {
    message: null,
    errors: {},
  });

  return (
    <form action={formAction}>
      <select name="model">
        {models.map((model) => {
          return (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          );
        })}
      </select>
      <button type="submit">New chat</button>

      {state.message && <div>{state.message}</div>}
    </form>
  );
};
