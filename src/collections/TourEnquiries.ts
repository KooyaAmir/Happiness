import type { CollectionConfig } from "payload";

export const TourEnquiries: CollectionConfig = {
  slug: "tour-enquiries",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "tourTitle", "preferredDate", "createdAt"],
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
    { name: "phone", type: "text", required: true },
    { name: "travellers", type: "number", required: true, min: 1 },
    { name: "preferredDate", type: "date" },
    {
      name: "tour",
      type: "relationship",
      relationTo: "tours",
    },
    { name: "tourTitle", type: "text" },
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
