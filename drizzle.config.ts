import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    driver: "pg",
    dbCredentials: {
        connectionString: `${process.env.POSTGRES_URL_NON_POOLING as string}?ssl=true`,
    },
    schema: "./db/schema.ts",
    out: "./db/migrations",
} satisfies Config;
