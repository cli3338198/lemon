type Props = {
  result?: string | null;
  error?: string | null;
};

export default function Console({ result, error }: Props) {
  return <div className="w-full h-32 p-2 border">{result || error}</div>;
}
