import { createApp } from 'vue';
// css
import 'normalize.css';
import './style.css';
// router
import { createRouter, createWebHistory } from 'vue-router';
import { routes, Route, getComponentByRoute } from './routes';

const router = createRouter({
	history: createWebHistory(),
	routes,
});

createApp(getComponentByRoute(Route.home)).use(router).mount('#app');
