import type { ChangeEvent, FC } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { Button, Textarea } from "@/components/ui";

export type MessageFormProps = {
  disabled?: boolean;
  isLoading?: boolean;
  value: string;
  onChange: (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit: () => void;
};

export const MessageForm: FC<MessageFormProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <form className="relative p-4" onSubmit={onSubmit}>
      <Textarea
        placeholder="Message"
        className="pr-12"
        value={value}
        onChange={onChange}
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
