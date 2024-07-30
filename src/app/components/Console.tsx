type Props = {
  result?: string | null;
  error?: string | null;
};

export default function Console({ result, error }: Props) {
  const content: string = result || error || "";

  // TODO: What is going on here?
  // If performing a number operation the result is a number
  // Needs to be converted to a string before doing the split operation
  // Why isn't already a string
  // TS should catch if it isn't?
  console.log({ content }, typeof content);

  return (
    <div className="w-full h-32 p-2 bg-black text-green-500 border border-green-500">
      {content
        ? String(content)
            .split("\n")
            .map((line, index) => <div key={index}>{line}</div>)
        : ""}
    </div>
  );
}
