import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "venue", "scheduleLabel", "_status"],
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
      name: "scheduleLabel",
      type: "text",
      required: true,
      admin: {
        description: "Public schedule line, e.g. Daily · 12:00 pm – 8:00 pm",
      },
    },
    {
      name: "startsAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
        description: "Optional — used for sorting / future calendar views",
      },
    },
    {
      name: "endsAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
