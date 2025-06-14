import { type FC, type ReactNode } from "react";
import Link from "next/link";

import { ScrollArea } from "@/components/ui";

import { MenuButton, type MenuButtonProps } from "./MenuButton";

export type ListItem = {
  id: number;
  name: ReactNode;
  url: string;
  icon?: ReactNode;
  description?: ReactNode;
};

export type ListProps = {
  items: ListItem[];
  itemActions?: MenuButtonProps<number>["actions"];
};

export const List: FC<ListProps> = ({ items, itemActions }) => {
  return (
    <ScrollArea className="max-h-full min-h-0 w-full rounded bg-white shadow">
      <div className="grid">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_min-content] gap-4 px-4 py-2 transition-colors not-last:border-b not-last:border-b-slate-300 hover:bg-slate-100"
            >
              <Link
                href={item.url}
                className="grid grid-cols-[min-content_1fr] gap-4"
              >
                <div className="self-center">{item.icon}</div>
                <div className="grid grid-rows-[min-content_min-content]">
                  <div>{item.name}</div>
                  <div className="text-xs text-slate-500">
                    {item.description}
                  </div>
                </div>
              </Link>

              {itemActions && (
                <div className="self-center">
                  <MenuButton context={item.id} actions={itemActions} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
