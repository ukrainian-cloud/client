import type { RouteRecordRaw } from 'vue-router';
import { Home } from './pages';

export const enum Route {
	home = '/',
}

export const routes: RouteRecordRaw[] = [{ path: Route.home, component: Home }];

export function getComponentByRoute(path: Route) {
	for (const route of routes) {
		if (route.path === path && route.component) {
			return route.component;
		}
	}
	throw new Error(`Couldn't find a component for route ${path}`);
}
