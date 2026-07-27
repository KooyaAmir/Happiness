import { createClient } from "@libsql/client";

async function main() {
  const db = createClient({ url: "file:happiness.db" });
  await db.execute(
    "DROP INDEX IF EXISTS payload_locked_documents_rels_order_idx",
  );
  console.log("Dropped conflicting SQLite index.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
