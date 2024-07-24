import { useState } from "react";

export function useIsolatedVm() {
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data.result);
      setError(null);
    } catch (err: unknown) {
      // TODO:
      setResult(null);
      setError("Something went wrong");
    }
  }

  return {
    result,
    error,
    runCode,
  };
}
