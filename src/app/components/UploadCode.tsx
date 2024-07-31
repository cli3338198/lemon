import Button from "./Button";

export default function UploadCode() {
  return (
    <div className="w-full h-64 p-4 bg-white border rounded-md shadow-md text-gray-800 flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Upload Your Code</h3>
      <p className="text-gray-600">
        Upload your code file here. Supported formats include .js.
      </p>
      <input
        type="file"
        className="border border-gray-300 p-2 rounded-md bg-gray-100"
      />
      <div className="flex gap-2">
        <Button onClick={() => alert("Upload Code clicked!")}>Upload</Button>
        <Button onClick={() => alert("Clear clicked!")}>Clear</Button>
      </div>
    </div>
  );
}
