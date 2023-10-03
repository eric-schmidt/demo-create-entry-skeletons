import chalk from "chalk";
import { PromisePool } from "@supercharge/promise-pool";
import { createArray, getArguments } from "./lib/utils.js";
import { createEntry } from "./lib/createInContentful.js";

// The number of concurrent Promises to run using the Promise Pool.
// If you are seeing a lot of rate limit errors, try decreasing.
const CONCURRENCY = 1;

// Generate the specified number of entries + their children.
const generateEntries = async (number) => {
  // Create an array from the number of entries specified to create.
  // We do this so that we can pass this to PromisePool to avoid
  // excessive rate limit errors.
  const entriesToCreate = createArray(number);

  await PromisePool.withConcurrency(CONCURRENCY)
    .for(entriesToCreate)
    .process(async (entry) => {
      createEntry("article");
    });
};

// Anonymous function that allows us to run directly via `node createEntries.js`.
(async function () {
  const { number } = getArguments();

  if (number) {
    generateEntries(number);
  } else {
    console.log(
      chalk.red(
        'Please specify how many parent entries to create. E.g. "--number=5".'
      )
    );
  }
})();
