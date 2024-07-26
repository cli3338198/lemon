"use client";

// Standard library imports
import { useState, useRef, lazy, Suspense } from "react";

// Third-party library imports (if any)
// import axios from "axios";  // Example of a third-party library

// Absolute imports (if using)
// import Button from "components/Button"; // Example of an absolute import

// Relative imports: components
import Button from "./components/Button";
import Console from "./components/Console";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Tabs from "./components/Tabs";

// Relative imports: hooks
import { useIVM } from "./hooks/useIVM";
import { CodeEditorHandle } from "./components/CodeEditor";

// Relative imports: types and constants
import { TabOptions, tabOptions } from "./types/tabs";

const CodeEditor = lazy(() => import("./components/CodeEditor"));
const UploadTest = lazy(() => import("./components/UploadTest"));
const UploadCode = lazy(() => import("./components/UploadCode"));
const HowToUse = lazy(() => import("./components/HowToUse"));

// Component map
const viewComponents = {
  [tabOptions[0]]: CodeEditor,
  [tabOptions[1]]: UploadTest,
  [tabOptions[2]]: UploadCode,
  [tabOptions[3]]: HowToUse,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabOptions>(tabOptions[0]);
  const { result, error, runCode, resetCode } = useIVM();
  const editorRef = useRef<CodeEditorHandle | null>(null);
  const CurrentView = viewComponents[activeTab] || null;

  function handleTabChange(tab: TabOptions) {
    setActiveTab(tab);
  }

  function handleRunCode() {
    resetCode();
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      runCode(code);
    }
  }

  function handleClearConsole() {
    console.log("clear console");
    resetCode();
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      <main>
        <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <Suspense fallback={<div>Loading...</div>}>
              {/* Adding a unique key prop to the ErrorBoundary forces it to remount when "activeTab" changes. */}
              {CurrentView && (
                <ErrorBoundary key={activeTab}>
                  {activeTab === tabOptions[0] ? (
                    <CurrentView ref={editorRef} />
                  ) : (
                    <CurrentView />
                  )}
                </ErrorBoundary>
              )}
            </Suspense>
            <div className="flex">
              <Button onClick={handleRunCode}>Run</Button>
              <Button onClick={handleClearConsole}>Clear</Button>
            </div>
            <ErrorBoundary>
              <Console result={result} error={error} />
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  );
}
