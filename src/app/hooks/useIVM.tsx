import { useState } from "react";

export function useIVM() {
  const [result, setResult] = useState<string | null>(null); // TODO:
  const [error, setError] = useState<string | null>(null); // TODO:

  async function runCode(code: string) {
    try {
      const response = await fetch("/api/runCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
        setError(null);
      } else {
        setResult(null);
        setError(data.error);
      }
    } catch (err: unknown) {
      setResult(null);
      setError("Something went wrong...");
    }
  }

  function resetCode() {
    setResult(null);
    setError(null);
  }

  return {
    result,
    error,
    runCode,
    resetCode,
  };
}
