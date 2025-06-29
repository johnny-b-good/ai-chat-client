"use client";

import { type ReactNode } from "react";
import { EllipsisIcon } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

export interface MenuButtonProps<T> {
  context: T;
  actions: Array<{
    id: string;
    label: ReactNode;
    callback: (context: T) => void;
  }>;
}

export const MenuButton = <T,>({ actions, context }: MenuButtonProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisIcon className="text-primary size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {actions.map((action) => {
            return (
              <DropdownMenuItem
                key={action.id}
                onClick={() => {
                  action.callback(context);
                }}
              >
                {action.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
