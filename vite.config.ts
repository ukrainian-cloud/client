import prefresh from '@prefresh/vite';
import { load as parseYAML } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import htmlPlugin from 'vite-plugin-html-config';

const {
	'html-config': htmlConfig,
} = parseYAML(readFileSync(resolve(__dirname, './config.yml'), 'utf8'));

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
	plugins: [prefresh(), devOnlyNamespacePlugin(), htmlPlugin(htmlConfig)],
	resolve: {
		alias: {
			'@' : resolve(__dirname, './src'),
			'@components' : resolve(__dirname, './components/web'),
			'@utils' : resolve(__dirname, './utils'),
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat', // Must be below test-utils
			'react/jsx-runtime': 'preact/jsx-runtime',
		},
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
});
