import { createEntry, createRichText } from "./lib/createInContentful.js";

// Get the Contentful field mapping for a specific content type.
export const getFieldMapping = async (type) => {
  switch (type) {
    // ARTICLE
    case "article":
      return {
        fields: {
          title: {
            "en-US": "PLACEHOLDER [ARTICLE]",
          },
          body: {
            "en-US": await createRichText(""),
          },
          seoMetadata: {
            // This allows us to recursively create entries down the tree.
            // We're currently in the middle of a createEntry call when
            // it is called again to create the nested entry.
            "en-US": await createEntry("seoMetadata"),
          },
        },
      };

    // SEO METADATA
    case "seoMetadata":
      return {
        fields: {
          internalTitle: {
            "en-US": "PLACEHOLDER [SEO METADATA]",
          },
          keywords: {
            "en-US": [],
          },
          description: {
            "en-US": "",
          },
        },
      };
  }
};
