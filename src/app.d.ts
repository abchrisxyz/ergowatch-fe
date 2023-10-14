import type { PoolClient } from "pg";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals { dbconn: PoolClient }
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
