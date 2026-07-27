import type { CollectionConfig } from "payload";

export const ContactEnquiries: CollectionConfig = {
  slug: "contact-enquiries",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "email", "location", "createdAt", "status"],
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
    {
      name: "location",
      type: "select",
      required: true,
      options: [
        { label: "Boracay", value: "boracay" },
        { label: "El Nido", value: "el-nido" },
        { label: "Siargao", value: "siargao" },
        { label: "General", value: "general" },
      ],
    },
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
