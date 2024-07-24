"use client";

import { useState, lazy, Suspense } from "react";
import Button from "./components/Button";
import Console from "./components/Console";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import { TabOptions, tabOptions } from "./types/types";

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

  const CurrentView = viewComponents[activeTab] || null;

  function handleTabChange(tab: TabOptions) {
    setActiveTab(tab);
  }

  function runCode() {
    console.log("run code");
  }

  function clearConsole() {
    console.log("clear console");
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      <main>
        <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                {CurrentView && <CurrentView />}
              </Suspense>
            </ErrorBoundary>
            <div className="flex">
              <Button onClick={runCode}>Run Code</Button>
              <Button onClick={clearConsole}>Clear Console</Button>
            </div>
            <ErrorBoundary>
              <Console />
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  );
}
