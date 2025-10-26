import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    order: { type: "number", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    }
  }
}));

export default makeSource({
  contentDirPath: "content/docs",
  documentTypes: [Doc]
});
