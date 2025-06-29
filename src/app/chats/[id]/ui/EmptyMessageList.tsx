import type { FC } from "react";

export const EmptyMessageList: FC = () => {
  return (
    <div className="text-secondary-foreground self-center justify-self-center text-xl font-semibold">
      No messages
    </div>
  );
};
