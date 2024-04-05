import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import * as child_process from 'node:child_process';

// Get revision from local git repo.
// Docker image has no git and expects the revision in a prepared 'revision.gen.js'.
let revision;
try {
	revision = child_process.execSync('git rev-parse HEAD').toString().trim()
} catch (error) {
	revision = await import("./revision.gen.js").then(mod => mod.revision)
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		version: {
			name: revision
		}

		// // https://kit.svelte.dev/docs/configuration#csp
		// csp: {
		// 	directives: {
		// 		'script-src': ['self']
		// 	},
		// 	reportOnly: {
		// 		'script-src': ['self']
		// 	}
		// }

	}
};

export default config;
