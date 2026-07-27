import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      admin: {
        description: "Article body. Use blank lines between paragraphs.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "travel",
      options: [
        { label: "Travel", value: "travel" },
        { label: "Stays", value: "stays" },
        { label: "Food", value: "food" },
        { label: "Wellness", value: "wellness" },
        { label: "Surf", value: "surf" },
        { label: "Guides", value: "guides" },
      ],
      index: true,
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "coverImage",
      type: "text",
      admin: {
        description: "Public image path, e.g. /images/locations/boracay-white-beach.png",
      },
    },
    {
      name: "seoTitle",
      type: "text",
    },
    {
      name: "seoDescription",
      type: "textarea",
    },
  ],
};
