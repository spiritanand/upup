import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const PGUSER = decodeURIComponent(process.env.PGUSER || "");

const queryClient = postgres({
  host: process.env.PGHOST || "",
  user: PGUSER,
  password: process.env.PGPASSWORD || "",
  database: process.env.PGDATABASE || "",
  port: 5432,
  ssl: true,
});
const db = drizzle(queryClient);

export default db;
