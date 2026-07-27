import type { CollectionConfig } from "payload";

export const Jobs: CollectionConfig = {
  slug: "jobs",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "venue", "open", "_status"],
    group: "Careers",
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
      name: "location",
      type: "select",
      required: true,
      options: [
        { label: "Boracay", value: "boracay" },
        { label: "El Nido", value: "el-nido" },
        { label: "Siargao", value: "siargao" },
      ],
      index: true,
    },
    {
      name: "venue",
      type: "text",
      required: true,
    },
    {
      name: "employmentType",
      type: "select",
      defaultValue: "full-time",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Seasonal", value: "seasonal" },
        { label: "Contract", value: "contract" },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      admin: {
        description: "Short blurb on the careers list",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "open",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Uncheck to hide from the public careers board",
      },
    },
  ],
};
