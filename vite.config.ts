import { defineConfig } from 'vite';
import prefresh from '@prefresh/vite';

const prefix = 'dev-only:';
const resolvedPrefix = '\0' + prefix;

function devOnlyNamespacePlugin() {
	let isDev = false;

	return {
		name: 'Dev-only namespace',
		config(userConfig, { mode }) {
			isDev = mode === 'development';
		},
		resolveId(id: string) {
			if (id.startsWith(prefix)) {
				return '\0' + id;
			}
		},
		load(id: string) {
			if (id.startsWith(resolvedPrefix)) {
				const realId = id.slice(resolvedPrefix.length);
				return isDev
					? `import '${realId}';\nconsole.log('Loaded ${realId} for development-only env. You should not see this in production');`
					: 'export {}';
			}
		},
	};
}

export default defineConfig({
	plugins: [prefresh(), devOnlyNamespacePlugin()],
});
