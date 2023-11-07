import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    driver: "pg",
    dbCredentials: {
        //connectionString: process.env.POSTGRES_URL_NON_POOLING as string,
        connectionString: "postgres://default:z8lxoktUDO3u@ep-icy-haze-43562761-pooler.eu-central-1.postgres.vercel-storage.com/verceldb?ssl=true"
    },
    schema: "./db/schema.ts",
    out: "./db/migrations",
} satisfies Config;
