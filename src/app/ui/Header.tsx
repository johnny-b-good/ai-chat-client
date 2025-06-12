import { type FC, type ReactNode } from "react";

export type HeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
};

export const Header: FC<HeaderProps> = ({ left, right, children }) => {
  return (
    <div className="h-12 bg-white shadow">
      <div className="relative mx-auto flex h-12 w-full items-center justify-center gap-4 px-4 text-lg sm:w-150">
        <div className="absolute left-4 flex h-full items-center">{left}</div>
        {children}
        <div className="absolute right-4 flex h-full items-center">{right}</div>
      </div>
    </div>
  );
};
