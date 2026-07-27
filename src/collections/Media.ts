import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "System",
  },
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
