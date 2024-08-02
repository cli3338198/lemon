const config = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"], // Adjust this to match your source code directory
  coverageDirectory: "temp/coverage",
  coverageReporters: ["json", "text", "lcov"], // Generates multiple report formats
  testMatch: ["**/temp/*.test.js"], // Ensure this matches the location of your test files
};

module.exports = config;
