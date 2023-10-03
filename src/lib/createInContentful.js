import chalk from "chalk";
import TurndownService from "turndown";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { environment } from "./cmaEnvironment.js";
import { getFieldMapping } from "../migrationMapping.js";

// Turn this to false when testing for quicker/easier deletion of test content.
const PUBLISH_CONTENT = false;

export const createEntry = async (type) => {
  return await environment
    .createEntry(type, await getFieldMapping(type))
    .then((entry) => {
      if (PUBLISH_CONTENT) {
        entry.publish();
      }
      console.log(
        chalk.green(
          `Entry (${type}) created: https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries/${entry.sys.id}`
        )
      );
      return {
        sys: {
          type: "Link",
          linkType: "Entry",
          id: entry.sys.id,
        },
      };
    })
    .catch(console.error);
};

// Init turndown for converting HTML into Markdown.
const turndownService = new TurndownService();

// Create Contentful Rich Text data from HTML.
export const createRichText = async (data) => {
  if (!data) {
    return null;
  }

  // First, convert HTML to Markdown.
  const markdown = await turndownService.turndown(data);

  // Next, convert Markdown to Rich Text.
  return await richTextFromMarkdown(markdown, async (node) => {
    // TODO: Processing for unsupported node types goes here.
    // E.g. creating imageWrappers for WYSIWYG images.
  });
};
