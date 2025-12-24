import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// IMPORTANT: Supabase + serverless require these options
const client = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
  prepare: false,
  max: 1, // prevents connection explosion on Vercel
});

export const db = drizzle(client, { schema });
