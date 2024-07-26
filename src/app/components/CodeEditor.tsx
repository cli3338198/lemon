"use client";

import { forwardRef, useState, useRef, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";
import { editor as MonacoEditor } from "monaco-editor";

export type CodeEditorHandle = {
  getValue: () => string;
  setValue: (value: string) => void;
};

type Props = {};

const CodeEditor = forwardRef<CodeEditorHandle | null, Props>(
  function CodeEditor(props, ref) {
    const [value, setValue] = useState("// your code here!");
    const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (editorRef.current) {
          return editorRef.current.getValue();
        } else {
          return "";
        }
      },
      setValue: (newValue: string) => {
        if (editorRef.current) {
          editorRef.current.setValue(newValue);
        }
      },
    }));

    function onMount(editor: MonacoEditor.IStandaloneCodeEditor) {
      editorRef.current = editor;
      editorRef.current.focus();
    }

    return (
      <div className="w-full h-64 p-2 border">
        <Editor
          defaultLanguage="javascript"
          defaultValue="// your code here!"
          value={value}
          theme="vs-dark"
          onMount={onMount}
        />
      </div>
    );
  }
);

export default CodeEditor;
