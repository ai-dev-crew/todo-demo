import { readFileSync } from "node:fs";

function fail(reason) {
  console.error(`require-tests: ${reason}`);
  process.exit(1);
}

const reportPath = process.argv[2];
if (!reportPath) {
  fail("report path is required");
}

let report;
try {
  report = JSON.parse(readFileSync(reportPath, "utf8"));
} catch {
  fail("report is missing or unreadable");
}

if (report === null || typeof report !== "object") {
  fail("report is missing or unreadable");
}

const { numTotalTests, numPassedTests, numFailedTests } = report;
if (
  !Number.isInteger(numTotalTests) ||
  !Number.isInteger(numPassedTests) ||
  !Number.isInteger(numFailedTests) ||
  numTotalTests < 0 ||
  numPassedTests < 0 ||
  numFailedTests < 0
) {
  fail("report has invalid test counts");
}

if (numTotalTests === 0) {
  fail("no tests were found");
}
if (numPassedTests === 0) {
  fail("no tests passed");
}
if (numFailedTests > 0) {
  fail(`${numFailedTests} test(s) failed`);
}

console.log(`require-tests: ${numPassedTests} passed`);
