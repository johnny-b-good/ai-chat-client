"use client";

import { type ReactNode, type FC } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export type LinkButtonProps = {
  href: string;
  icon?: ReactNode;
};

export const LinkButton: FC<LinkButtonProps> = ({
  href,
  icon = <ChevronLeft className="text-primary size-6" />,
}) => {
  return (
    <Link
      href={href}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      {icon}
    </Link>
  );
};
