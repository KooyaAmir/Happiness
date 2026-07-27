import type { CollectionConfig } from "payload";

export const SurfEnquiries: CollectionConfig = {
  slug: "surf-enquiries",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "startDate", "country", "createdAt", "status"],
    group: "Leads",
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "fullName", type: "text", required: true },
    { name: "email", type: "email" },
    { name: "phone", type: "text", required: true },
    { name: "country", type: "text", required: true },
    { name: "startDate", type: "date", required: true },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In progress", value: "in-progress" },
        { label: "Closed", value: "closed" },
      ],
    },
  ],
};
