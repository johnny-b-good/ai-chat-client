import type { FC } from "react";

export const EmptyMessageList: FC = () => {
  return (
    <div className="self-center justify-self-center text-xl font-semibold text-slate-500">
      No messages
    </div>
  );
};
