import type { FC, FormEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { Button, Textarea } from "@/components/ui";

export type MessageFormProps = {
  disabled?: boolean;
  isLoading?: boolean;
  value: string;
  setValue: (newValue: string) => void;
  onSubmit: (ev: FormEvent<HTMLFormElement>) => void;
};

export const MessageForm: FC<MessageFormProps> = ({
  value,
  setValue,
  onSubmit,
}) => {
  return (
    <form className="bg-card relative rounded-md" onSubmit={onSubmit}>
      <Textarea
        placeholder="Message"
        className="pr-12"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
      />

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 transform"
      >
        <PaperAirplaneIcon className="text-primary size-6" />
      </Button>
    </form>
  );
};
