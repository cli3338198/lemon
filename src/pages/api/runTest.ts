import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";
import createTestTemplate from "@/utils/createTestTemplate";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  // const { test, code } = req.body;

  const code = `
    const fib = (n) => n < 2 ? n : fib(n-1) + fib(n-2);
  `;

  const test = `
    test('fib(1) => 1', () => {
      expect(fib(1)).toBe(1)
    })

    test('fib(10) => 1', () => {
      expect(fib(10)).toBe(55)
    })
  `;

  // Create the temp folder if it doesn't exist
  const tempDir = path.join(process.cwd(), "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Create the coverage folder if it doesn't exist
  const coverageDir = path.join(process.cwd(), "temp", "coverage");
  if (!fs.existsSync(coverageDir)) {
    fs.mkdirSync(coverageDir);
  }

  // Create test/code file and run test TODO: refactor this
  const testTemplate = createTestTemplate(code, test);
  const testFilePath = path.join(process.cwd(), "temp", "userTest.test.js");
  fs.writeFileSync(testFilePath, testTemplate);

  try {
    execSync(
      `jest temp --coverage --coverageReporters="json-summary" --coverageDirectory=${coverageDir} --json --outputFile=${tempDir}/result.json`
    );
    const testResults = JSON.parse(
      fs.readFileSync("temp/result.json", "utf-8")
    );

    const coverageSummaryPath = path.join(coverageDir, "coverage-summary.json");
    const coverageSummary = JSON.parse(
      fs.readFileSync(coverageSummaryPath, "utf-8")
    );

    console.log("Coverage Summary:", coverageSummary);

    // console.log({ testResults }); // TODO: remove
    res.status(200).json({ success: true, results: testResults });
  } catch (err: unknown) {
    const { message } = err as Error;
    res.status(500).json({ success: false, error: message });
  } finally {
    // Remove files TODO: refactor
    // fs.unlinkSync(testFilePath);
    // fs.unlinkSync("temp/result.json");
  }
}
