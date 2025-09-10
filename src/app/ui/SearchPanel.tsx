"use client";

import { type FC, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon, CircleXIcon } from "lucide-react";

import { Input, Button } from "@/components/ui";

export const SearchPanel: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    // TODO: Pagination
    // params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const onClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const value = searchParams.get("query")?.toString();

  return (
    <div className="z-10 mx-auto w-full px-4 pt-4 sm:w-150">
      <div className="relative">
        <Input
          placeholder="Search"
          className="bg-card pr-12"
          onChange={(ev) => {
            handleSearch(ev.target.value);
          }}
          defaultValue={value}
          ref={inputRef}
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-3 size-6 -translate-y-1/2 transform"
          onClick={() => {
            if (value) {
              onClear();
            }
          }}
        >
          {value ? (
            <CircleXIcon className="text-muted-foreground size-4" />
          ) : (
            <SearchIcon className="text-muted-foreground size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
