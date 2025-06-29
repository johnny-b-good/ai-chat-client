import { type FC, type ReactNode } from "react";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib/utils";

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
  isLoading?: boolean;
};

export const List: FC<ListProps> = ({
  items,
  itemActions,
  isLoading = false,
}) => {
  return (
    <ScrollArea className="relative max-h-full min-h-0 w-full rounded bg-white shadow">
      <div className="grid">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_min-content] gap-4 border-b border-b-slate-300 px-4 py-2 transition-colors hover:bg-slate-100"
            >
              <Link
                href={item.url}
                className="grid grid-cols-[min-content_1fr] gap-4"
              >
                <div className="self-center">{item.icon}</div>
                <div className="grid grid-rows-[min-content_min-content]">
                  {item.name}
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

      <div
        className={cn(
          "invisible absolute inset-0 flex items-center justify-center gap-4 rounded bg-white/50 text-2xl text-slate-700 opacity-0 backdrop-blur-[2px] transition-opacity",
          isLoading && "visible opacity-100",
        )}
      >
        <Loader2Icon className="size-8 animate-spin" /> Loading
      </div>
    </ScrollArea>
  );
};
