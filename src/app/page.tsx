"use client";

import { useState, useRef, lazy, Suspense } from "react";
import Button from "./components/Button";
import Console from "./components/Console";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { useIVM } from "./hooks/useIVM";
import { CodeEditorHandle } from "./components/CodeEditor";
import { TabOptions, tabOptions } from "./types/tabs";
import LoadingFallback from "./components/LoadingFallback";

const CodeEditor = lazy(() => import("./components/CodeEditor"));
const UploadTest = lazy(() => import("./components/UploadTest"));
const UploadCode = lazy(() => import("./components/UploadCode"));
const HowToUse = lazy(() => import("./components/HowToUse"));

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
    resetCode();
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <Header />
      <main className="mt-8">
        <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <Suspense fallback={<LoadingFallback />}>
              {/* Adding a unique key prop to the ErrorBoundary forces it to remount when "activeTab" changes. */}
              <ErrorBoundary key={activeTab}>
                {CurrentView &&
                  (activeTab === tabOptions[0] ? (
                    <CurrentView ref={editorRef} />
                  ) : (
                    <CurrentView />
                  ))}
              </ErrorBoundary>
            </Suspense>
            <div className="flex gap-2 p-2">
              <button
                className="text-lg font-medium rounded-md px-4 py-2 transition-colors bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                onClick={handleRunCode}
              >
                Run
              </button>
              <button
                className="text-lg font-medium rounded-md px-4 py-2 transition-colors bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                onClick={handleClearConsole}
              >
                Clear
              </button>
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
