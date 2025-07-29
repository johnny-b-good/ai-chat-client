import { type FC } from "react";
import dayjs from "dayjs";

import { type ChatGroup } from "../lib/types";

type ChatGroupHeaderProps = {
  group: ChatGroup;
};

export const ChatGroupHeader: FC<ChatGroupHeaderProps> = ({ group }) => {
  const { type, year, month } = group;

  return (
    <div className="text-muted-foreground mb-2 text-xl font-semibold">
      {type === "today"
        ? "Today"
        : type === "last7"
          ? "Last 7 days"
          : type === "last30"
            ? "Last 30 days"
            : dayjs(`${year}-${month}-01`).format("MMMM YYYY")}
    </div>
  );
};
