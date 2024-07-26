type Props = {
  result?: string | null;
  error?: string | null;
};

export default function Console({ result, error }: Props) {
  return (
    <div className="w-full h-32 p-2 bg-black text-green-500 border border-green-500">
      {result || error}
    </div>
  );
}
