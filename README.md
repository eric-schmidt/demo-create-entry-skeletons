# Generate Skeleton Entries

This repo contains some demo scripting for programmatically creating empty "skeleton" entries (including nested/referenced entries) to speed up the content authoring process. This script could easily be extended to populate the entry fields with default values; however, this demo assumes that all fields will be blank -- to be later filled in by authors.

## Key Files

- `./src/createEntries.js`: Entry point for the script. This script first creates an array out of the specified number of entries so that the array can be passed to a PromisePool to prevent excessive rate limit errors when entries are created.
- `./src/lib/createInContentful.js`: Contains all the programmatic logic for creating entries via the CMA (using a CMA client instatiated in `./src/lib/cmaEnvironment.js`).
- `./src/migrationMapping.js`: Contains field-mappings for all content types for which we are generating entries. This is where default values can be supplied for fields, and is also how we are achieving the recursive creation of nested entries. E.g. the `Article` field mapping calls `createEntry`, which returns a fully created nested `SEO Metadata` entry.
  - This file also uses a custom `createRichText` function, which leverages https://www.npmjs.com/package/@contentful/rich-text-from-markdown and https://github.com/mixmark-io/turndown to create properly formatted Rich Text from simple strings.

## Instructions

1. Create a new blank space.
2. Import the demo content model via `contentful space import --space-id <YOUR SPACE ID> --environment-id <YOUR ENVIRONMENT ID> src/content-model.json`
3. Copy `.env.example` and rename it to `.env`.
4. Fill in the environment variables using values for your Contentful space.
5. Run `npm install` to install all dependencies.
6. From your terminal run `node src/createEntries.js --number=[NUMBER]`, where `[NUMBER]` is an integer for the number of parent entries you would like to create.
