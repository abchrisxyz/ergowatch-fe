// https://stackoverflow.com/questions/72440961/how-to-connect-my-postgresql-database-to-sveltekit-and-run-queries
import { Pool } from "pg";

import { EW_PG_HOST, EW_PG_NAME, EW_PG_PASS, EW_PG_PORT, EW_PG_USER } from "$env/static/private";

const pool = new Pool({
    database: EW_PG_NAME,
    user: EW_PG_USER,
    host: EW_PG_HOST,
    port: Number(EW_PG_PORT),
    password: EW_PG_PASS
});

/**
 * Connect to the PostgreSQL database.
 * @returns {Promise<import("pg").Client>} A new client from the connection pool.
 */
export const connectToDB = async () => await pool.connect();
