import { type FC, type ReactNode } from "react";
import Link from "next/link";

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
    <div className="bg-card relative grid max-h-full min-h-0 w-full rounded shadow">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="border-b-border hover:bg-accent grid grid-cols-[1fr_min-content] gap-4 px-4 py-2 transition-colors not-last:border-b"
          >
            <Link
              href={item.url}
              className="grid grid-cols-[min-content_1fr] gap-4"
            >
              <div className="self-center">{item.icon}</div>
              <div className="grid grid-rows-[min-content_min-content]">
                {item.name}
                <div className="text-muted-foreground text-xs">
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
  );
};
