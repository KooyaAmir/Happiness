import type { CollectionConfig } from "payload";

export const LeadEnquiries: CollectionConfig = {
  slug: "lead-enquiries",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "source", "email", "createdAt", "status"],
    description: "Generic leads (packages, wellness, misc).",
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
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    {
      name: "source",
      type: "select",
      required: true,
      options: [
        { label: "Vacation package", value: "vacation-package" },
        { label: "Wellness", value: "wellness" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "subject", type: "text" },
    { name: "message", type: "textarea", required: true },
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
