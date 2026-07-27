import type { CollectionConfig } from "payload";

export const JobApplications: CollectionConfig = {
  slug: "job-applications",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "jobTitle", "email", "createdAt", "status"],
    group: "Careers",
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
      name: "job",
      type: "relationship",
      relationTo: "jobs",
    },
    { name: "jobTitle", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "cv",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional CV upload (PDF or Word)",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Reviewing", value: "reviewing" },
        { label: "Interview", value: "interview" },
        { label: "Closed", value: "closed" },
      ],
    },
  ],
};
