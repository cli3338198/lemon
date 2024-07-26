import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function Button({ onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 text-green-500 p-2 border border-green-500 font-mono transition-colors hover:bg-green-500 hover:text-gray-800 w-full"
    >
      {children}
    </button>
  );
}
