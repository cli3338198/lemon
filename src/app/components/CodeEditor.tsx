"use client";

import { forwardRef, useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = forwardRef(function CodeEditor(props, ref) {
  const [value, setValue] = useState("// your code here!");

  return (
    <div className="w-full h-64 p-2 border">
      <Editor
        defaultLanguage="javascript"
        defaultValue="// your code here!"
        value={value}
      />
    </div>
  );
});

export default CodeEditor;
