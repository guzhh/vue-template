import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [],
	strict: true, // 不允许路由末尾为/ 斜杠
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export function setupRouter(app) {
	app.use(router);
	// 创建路由导航守卫
	// createRouterGuards(router, app);
}

export default router;
