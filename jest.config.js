module.exports = {
  collectCoverage: true,
  coverageDirectory: "temp/coverage",
  coverageReporters: ["json", "text", "lcov"],
  testMatch: ["**/temp/*.test.js"], // Adjust this pattern if needed
};
