import type { Config } from "drizzle-kit";

const PGUSER = decodeURIComponent(process.env.PGUSER || "");

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.PGHOST || "",
    user: PGUSER,
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "",
    port: 5432,
    ssl: true,
  },
} satisfies Config;
