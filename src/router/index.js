import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import createRouteGuard from "@/router/guard";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("@/views/users/login/index.vue"),
			meta: {
				title: "登录",
				noAffix: true, // 是否在标签页中显示 true 不显示
				ignoreCache: false // 是否缓存
			}
		}
	],
	// strict: true, // 不允许路由末尾为/ 斜杠
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export function setupRouter(app) {
	NProgress.configure({ showSpinner: false }); // NProgress 配置
	app.use(router);
	// 创建路由导航守卫
	// createRouterGuards(router, app);
	createRouteGuard(router, app);
}

export default router;
