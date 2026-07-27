import type { Job } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

export const JOB_LOCATIONS = [
  { value: "boracay", label: "Boracay" },
  { value: "el-nido", label: "El Nido" },
  { value: "siargao", label: "Siargao" },
] as const;

export function jobLocationLabel(value: Job["location"] | string) {
  return JOB_LOCATIONS.find((row) => row.value === value)?.label || value;
}

export async function getOpenJobs() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "jobs",
    depth: 0,
    limit: 100,
    sort: "title",
    where: {
      and: [{ _status: { equals: "published" } }, { open: { equals: true } }],
    },
  });
  return result.docs;
}

export async function getJobBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "jobs",
    depth: 0,
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: "published" } },
        { open: { equals: true } },
      ],
    },
  });
  return result.docs[0] || null;
}
