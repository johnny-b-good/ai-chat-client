"use client";

import { type FC, type KeyboardEvent, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { Button, Textarea } from "@/components/ui";

export type MessageFormProps = {
  disabled?: boolean;
  value: string;
  setValue: (newValue: string) => void;
  onSubmit: () => void;
};

export const MessageForm: FC<MessageFormProps> = ({
  value,
  setValue,
  onSubmit,
  disabled,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className="bg-card relative rounded-md"
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit();
      }}
      ref={formRef}
    >
      <Textarea
        placeholder="Message"
        className="pr-12"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
        onKeyDown={(ev: KeyboardEvent<HTMLTextAreaElement>) => {
          if (!ev.shiftKey && ev.key === "Enter" && formRef.current) {
            ev.preventDefault();
            onSubmit();
          }
        }}
        disabled={disabled}
      />

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 transform"
        disabled={disabled}
      >
        <PaperAirplaneIcon className="text-primary size-6" />
      </Button>
    </form>
  );
};
