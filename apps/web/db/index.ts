import { drizzle } from "drizzle-orm/node-postgres";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
  ssl: true,
});
const db = drizzle(pool, { schema });

// local dev only
// await migrate(db, { migrationsFolder: "drizzle" });

export default db;
