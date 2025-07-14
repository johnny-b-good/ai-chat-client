import { type FC, type ReactNode } from "react";

export type HeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
};

export const Header: FC<HeaderProps> = ({ left, right, children }) => {
  return (
    <div className="bg-card z-10 h-14 shadow">
      <div className="relative mx-auto flex h-14 w-full items-center justify-center gap-4 px-16 sm:w-150">
        <div className="absolute left-4 flex h-full items-center">{left}</div>
        {children}
        <div className="absolute right-4 flex h-full items-center">{right}</div>
      </div>
    </div>
  );
};
