"use client";

import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function Button({ onClick, children }: Props) {
  return (
    <button onClick={onClick} className="bg-gray-300 p-2 m-2">
      {children}
    </button>
  );
}
