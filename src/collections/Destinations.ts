import type { CollectionConfig } from "payload";

export const Destinations: CollectionConfig = {
  slug: "destinations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
    group: "Tours",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
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
      name: "summary",
      type: "textarea",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
