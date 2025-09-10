import type { FC } from "react";
import { MessageCircleQuestionMarkIcon } from "lucide-react";

export type EmptyListProps = {
  message: string;
};

export const EmptyList: FC<EmptyListProps> = ({ message }) => {
  return (
    <div className="text-muted-foreground flex flex-col items-center gap-4 self-center justify-self-center">
      <MessageCircleQuestionMarkIcon className="size-12" />
      <div className="text-xl font-semibold">{message}</div>
    </div>
  );
};
