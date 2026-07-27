import type { CollectionConfig } from "payload";

export const Tours: CollectionConfig = {
  slug: "tours",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "destination", "kind", "priceFrom", "_status"],
    group: "Tours",
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
      name: "destination",
      type: "relationship",
      relationTo: "destinations",
      required: true,
    },
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "tour",
      options: [
        { label: "Tour / activity", value: "tour" },
        { label: "Vacation package", value: "vacation-package" },
      ],
    },
    {
      name: "tourTypes",
      type: "select",
      hasMany: true,
      options: [
        { label: "Countryside", value: "countryside" },
        { label: "Helicopter Tour", value: "helicopter-tour" },
        { label: "Hot/Cold Springs", value: "hot-cold-springs" },
        { label: "Island tour", value: "island-tour" },
        { label: "Land tours", value: "land-tours" },
        { label: "Mountaineering", value: "mountaineering" },
        { label: "Off Road Activity", value: "off-road-activity" },
        { label: "Sailing", value: "sailing" },
        { label: "Snorkelling", value: "snorkelling" },
        { label: "Sunset sail", value: "sunset-sail" },
        { label: "Waterfall", value: "waterfall" },
        { label: "Watersports", value: "watersports" },
        { label: "Zipline", value: "zipline" },
      ],
    },
    {
      name: "popular",
      type: "checkbox",
      defaultValue: false,
    },
    {
      type: "row",
      fields: [
        { name: "startsAt", type: "text", admin: { width: "33%" } },
        { name: "endsAt", type: "text", admin: { width: "33%" } },
        { name: "duration", type: "text", admin: { width: "33%" } },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "priceFrom",
          type: "number",
          admin: { width: "50%", description: "Price in PHP" },
        },
        {
          name: "priceOnEnquiry",
          type: "checkbox",
          defaultValue: false,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "itinerary",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "inclusions",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "whatToBring",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "notes",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "Temporary external image URL used during migration",
      },
    },
    {
      name: "sourceUrl",
      type: "text",
      admin: {
        description: "Original WordPress /trip URL",
      },
    },
  ],
};
