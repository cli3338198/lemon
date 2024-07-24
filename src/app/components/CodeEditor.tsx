"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor() {
  const [value, setValue] = useState("// your code here!");

  function handleChange() {}

  return (
    <div className="w-full h-64 p-2 border">
      <Editor
        defaultLanguage="javascript"
        defaultValue="// your code here!"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
