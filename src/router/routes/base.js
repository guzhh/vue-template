export const DEFAULT_LAYOUT = () => import("@/layout/default-layout.vue");

// 重定向包装器
export const REDIRECT_MAIN = {
	path: "/redirect",
	name: "redirectWrapper",
	component: DEFAULT_LAYOUT,
	meta: {
		noAffix: true,
		ignoreCache: false
	},
	children: [
		{
			path: "/redirect/:path",
			name: "Redirect",
			component: () => import("@/views/exception/redirect.vue"),
			meta: {
				requiresAuth: true,
				hideInMenu: true
			}
		}
	]
};

export const NOT_FOUND_ROUTE = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	component: () => import("@/views/exception/404.vue")
};
