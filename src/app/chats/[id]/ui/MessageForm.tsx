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
    <form className="relative pr-3" onSubmit={onSubmit}>
      <Textarea
        placeholder="Message"
        // className="field-sizing-content flex-auto resize-none px-4 py-2 text-sm text-slate-900 placeholder:text-slate-300 focus-visible:outline-none"
        className="bg-white pr-12"
        value={value}
        onChange={onChange}
      />

      <Button
        // className="flex-none cursor-pointer p-2 text-slate-500 transition-colors hover:text-slate-400 focus-visible:outline-none">
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 transform"
      >
        <PaperAirplaneIcon className="size-6" />
      </Button>
    </form>
  );
};
