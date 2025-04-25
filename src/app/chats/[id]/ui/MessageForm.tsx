import type { FC } from "react";
import { Button, Input } from "@headlessui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export type MessageFormProps = {
  disabled?: boolean;
  isLoading?: boolean;
};

export const MessageForm: FC<MessageFormProps> = () => {
  return (
    <div className="flex items-center gap-4 bg-slate-50 shadow-sm">
      <Input
        placeholder="Message"
        className="flex-auto resize-none px-4 py-2 text-sm text-slate-900 placeholder:text-slate-300 focus-visible:outline-none"
        autoFocus
      />
      <Button className="flex-none cursor-pointer p-2 text-slate-500 transition-colors hover:text-slate-400 focus-visible:outline-none">
        <PaperAirplaneIcon className="size-6" />
      </Button>
    </div>
  );
};
