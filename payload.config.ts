import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { ContactEnquiries } from "./src/collections/ContactEnquiries";
import { Destinations } from "./src/collections/Destinations";
import { Events } from "./src/collections/Events";
import { JobApplications } from "./src/collections/JobApplications";
import { Jobs } from "./src/collections/Jobs";
import { LeadEnquiries } from "./src/collections/LeadEnquiries";
import { Media } from "./src/collections/Media";
import { Posts } from "./src/collections/Posts";
import { SurfEnquiries } from "./src/collections/SurfEnquiries";
import { TourEnquiries } from "./src/collections/TourEnquiries";
import { Tours } from "./src/collections/Tours";
import { Users } from "./src/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "src"),
    },
  },
  collections: [
    Users,
    Media,
    Destinations,
    Tours,
    TourEnquiries,
    Events,
    Jobs,
    JobApplications,
    ContactEnquiries,
    SurfEnquiries,
    LeadEnquiries,
    Posts,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-only-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || `file:${path.resolve(dirname, "happiness.db")}`,
    },
  }),
  sharp,
});
