type Props = {
  result?: string | null;
  error?: string | null;
};

export default function Console({ result, error }: Props) {
  const content = result || error;

  console.log({ content });
  console.log(typeof content);

  return (
    <div className="w-full h-32 p-2 bg-black text-green-500 border border-green-500">
      {/* {content?.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))} */}
    </div>
  );
}
