import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function Button({ onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white p-2 rounded-md border border-blue-600 font-medium transition-colors hover:bg-blue-700 hover:border-blue-700"
    >
      {children}
    </button>
  );
}
